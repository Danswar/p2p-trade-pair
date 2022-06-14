import memoize from 'memoizee'

import Advertise from '../../entities/Advertise'
import Market from '../../entities/Market'
import Pair from '../../entities/Pair'
import TypeOperation from '../../entities/TypeOperation'
import TraderProfile from '../../entities/TraderProfile'
import { GetAdsResponse, RawAdvertise } from './interfaces'
import fetchAsJson from './utils/fetchAsJson'

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

const mapRawAdToAdvertise = (
  rawAd: RawAdvertise,
  assetCode: string,
  typeOperation: TypeOperation,
): Advertise => {
  const { data, actions } = rawAd

  const profileName = data.profile.name.split(' ')[0]
  const tradeCount = Number(
    data.profile.trade_count.replace(' ', '').replace('+', ''),
  )
  const price = Number(data.temp_price)
  const minAmount = Number(data.min_amount)
  const maxAmount = Number(data.max_amount)

  const advertiser = new TraderProfile(
    profileName,
    tradeCount,
    data.profile.feedback_score,
  )

  const pair = new Pair(assetCode, 'BTC')

  return new Advertise(
    data.ad_id,
    advertiser,
    price,
    pair,
    typeOperation,
    minAmount,
    maxAmount,
    [data.bank_name, data.msg],
    actions.public_view,
  )
}

const localbitcoinsP2P: Market = {
  async getAdvertises(from, to, amount, typeOperation) {
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

    const sortCriteria: (a: Advertise, b: Advertise) => number =
      typeOperation === TypeOperation.SELL
        ? (a, b) => b.price - a.price
        : (a, b) => a.price - b.price
    return ads.sort(sortCriteria)
  },
}

export default localbitcoinsP2P
