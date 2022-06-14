import { useEffect, useState } from 'react'
import { Advertise } from '../interfaces/Advertise'

type FetchAdsInput = {
  typeOperation: string
  from: string
  to: string
  amount: string
}

const BEST_ADS_URL =
  process.env.REACT_APP_BACKEND_URI || `http://localhost:3000`

const fetchAds = async ({
  typeOperation,
  from,
  to,
  amount,
}: FetchAdsInput): Promise<{ data: Advertise[]; meta: any }> => {
  const res = await fetch(
    `${BEST_ADS_URL}/${typeOperation}/${from}/${to}/${amount}`,
  )
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
  const [filters, setFilters] = useState({ availablePaymentChannels: [] })

  const searchAds = async () => {
    setCurrentAdvertise(null)
    const { data: newAds, meta } = await fetchAds({
      from: currency,
      to: 'BTC',
      amount: '1000',
      typeOperation,
    })
    setAds(newAds)
    setFilters({ availablePaymentChannels: meta.availablePaymentChannels })
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
  }

  useEffect(() => {
    searchAds()
    // eslint-disable-next-line
  }, [currency, typeOperation])

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
  }
}

export default useBestAds
