import memoize from 'memoizee'

import Advertise from '../../entities/Advertise'
import Market from '../../entities/Market'
import TypeOperation from '../../entities/TypeOperation'
import { GetAdsResponse, RawAdvertise } from './entities/interfaces'
import paymentChannels from './entities/paymentChannels'
import fetchAsJson from './utils/fetchAsJson'
import mapRawAdToAdvertise from './utils/mapRawAdToAdvertise'

const BASE_URL = 'https://localbitcoins.com/'
const MAX_LIMIT_OF_PAGES = 10
const MAX_AGE_CACHE = 1 * 60 * 1000

const typeOperationToURL = {
  [TypeOperation.BUY]: 'buy-bitcoins-online',
  [TypeOperation.SELL]: 'sell-bitcoins-online',
}

const fetchAllAdvertises = async (
  assetCode: string,
  typeOperation: TypeOperation,
) => {
  let counter = 0
  let adList: RawAdvertise[] = []
  let nextPageUrl:
    | string
    | undefined = `${BASE_URL}/${typeOperationToURL[typeOperation]}/${assetCode}/.json`

  while (nextPageUrl && counter < MAX_LIMIT_OF_PAGES) {
    const page: GetAdsResponse = await fetchAsJson<GetAdsResponse>(nextPageUrl)
    adList = [...adList, ...page.data.ad_list]
    nextPageUrl = page.pagination?.next
    counter++
  }

  return adList
}

const memoFetchAllAdvertises = memoize(fetchAllAdvertises, {
  maxAge: MAX_AGE_CACHE,
  promise: true,
})

const localbitcoinsP2P: Market = {
  async getAdvertises(from, to, amount, typeOperation, paymentChannels) {
    const adList: RawAdvertise[] = await memoFetchAllAdvertises(
      from,
      typeOperation,
    )
    const ads: Advertise[] = adList
      .map((rawAd: RawAdvertise) =>
        mapRawAdToAdvertise(rawAd, from, typeOperation),
      )
      .filter(
        (rawAd) => rawAd.minAmount <= rawAd.maxAmount && rawAd.maxAmount !== 0,
      )
      .filter((rawAd) => rawAd.advertiser.score > 98)
      .filter((rawAd) => rawAd.advertiser.tradeCount >= 100)

    const filteredAds = paymentChannels.length
      ? ads.filter((rawAd) =>
          rawAd.paymentChannels.some((channel) =>
            paymentChannels.includes(channel),
          ),
        )
      : ads

    const sortCriteria: (a: Advertise, b: Advertise) => number =
      typeOperation === TypeOperation.SELL
        ? (a, b) => b.price - a.price
        : (a, b) => a.price - b.price

    return filteredAds.sort(sortCriteria)
  },
  async getAvailablePaymentChannels() {
    return Object.keys(paymentChannels)
  },
}

export default localbitcoinsP2P
