import { useState } from 'react'
import { Advertise } from '../interfaces/Advertise'

type FetchAdsInput = {
  typeOperation: string
  from: string
  to: string
  amount: string
}

const BEST_ADS_URL = `http://localhost:3000`

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

  const handleChangeAdvertise = (currentIndex: number) => {
    const currentAd = ads[currentIndex]
    setCurrentAdvertise(currentAd)
  }

  const searchAds = async (params: FetchAdsInput) => {
    setAds(await fetchAds(params))
  }

  return {
    ads,
    currentAdvertise,
    handleChangeAdvertise,
    searchAds,
  }
}

export default useBestAds