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
}: FetchAdsInput): Promise<Advertise[]> => {
  const res = await fetch(
    `${BEST_ADS_URL}/${typeOperation}/${from}/${to}/${amount}`,
  )
  const { data }: { data: Advertise[] } = await res.json()
  return data
}

const useBestAds = () => {
  const [ads, setAds] = useState<Advertise[]>([])
  const [currentAdvertise, setCurrentAdvertise] = useState<Advertise | null>(
    null,
  )
  const [typeOperation, setTypeOperation] = useState('buy')
  const [currency, setCurrency] = useState('USDT')

  const searchAds = async () => {
    setCurrentAdvertise(null)
    const newAds = await fetchAds({
      from: currency,
      to: 'BTC',
      amount: '1000',
      typeOperation,
    })
    setAds(newAds)
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
  }
}

export default useBestAds
