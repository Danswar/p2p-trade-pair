import { useEffect, useState } from 'react'
import { Advertise } from '../interfaces/Advertise'

type FetchAdsInput = {
  typeOperation: string
  from: string
  to: string
  amount: string
  paymentChannels: string[]
}

const BEST_ADS_URL =
  process.env.REACT_APP_BACKEND_URI || `http://localhost:3000`

const fetchAds = async ({
  typeOperation,
  from,
  to,
  amount,
  paymentChannels,
}: FetchAdsInput): Promise<{ data: Advertise[]; meta: any }> => {
  const res = await fetch(`${BEST_ADS_URL}/getBestAds`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      typeOperation,
      from,
      to,
      amount,
      paymentChannels,
    }),
  })

  const { data, meta }: { data: Advertise[]; meta: any } = await res.json()
  return { data, meta }
}

const useBestAds = () => {
  const [ads, setAds] = useState<Advertise[]>([])
  const [currentAdvertise, setCurrentAdvertise] = useState<Advertise | null>(
    null,
  )
  const [typeOperation, setTypeOperation] = useState('buy')
  const [currency, setCurrency] = useState('USDT')
  const [filters, setFilters] = useState([])
  const [selectedFilter, setSelectedFilter] = useState('')

  const searchAds = async () => {
    setCurrentAdvertise(null)
    const { data: newAds, meta } = await fetchAds({
      from: currency,
      to: 'BTC',
      amount: '1000',
      typeOperation,
      paymentChannels: [selectedFilter].filter(Boolean),
    })
    setAds(newAds)
    setFilters(meta.availablePaymentChannels)
  }

  const handleChangeAdvertise = (currentIndex: number) => {
    const currentAd = ads[currentIndex]
    setCurrentAdvertise(currentAd)
  }

  const handleChangeTypeOperation = (type: string) => {
    setTypeOperation(type)
  }

  const handleChangeCurrency = (currency: string) => {
    setCurrency(currency)
    setSelectedFilter('')
  }

  const handleChangeFilters = (selectedFilter: string) => {
    setSelectedFilter(selectedFilter)
  }

  useEffect(() => {
    searchAds()
    // eslint-disable-next-line
  }, [currency, typeOperation, selectedFilter])

  return {
    ads,
    currentAdvertise,
    handleChangeAdvertise,
    searchAds,
    currency,
    handleChangeCurrency,
    typeOperation,
    handleChangeTypeOperation,
    filters,
    selectedFilter,
    handleChangeFilters,
  }
}

export default useBestAds
