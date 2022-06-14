import Advertise from '../../../entities/Advertise'
import Pair from '../../../entities/Pair'
import TraderProfile from '../../../entities/TraderProfile'
import TypeOperation from '../../../entities/TypeOperation'
import { RawAdvertise } from '../entities/interfaces'
import paymentChannels from '../entities/paymentChannels'

export const calculatePaymentChannelFromMessage = (
  msgs: string[],
): string[] => {
  const parsedMsgs = msgs.map((msg) => (msg ? msg.toLowerCase() : ''))

  const channels = Object.entries(paymentChannels).reduce(
    (acc, [channelKey, keywords]) => {
      const isKeywordInMessage = keywords.some((keyword) =>
        parsedMsgs.some((msg) =>
          msg ? msg.includes(keyword.toLowerCase()) : '',
        ),
      )
      return isKeywordInMessage ? [...acc, channelKey] : acc
    },
    [] as string[],
  )

  return Array.from(new Set(channels))
}

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

  const paymentChannels = calculatePaymentChannelFromMessage([
    data.bank_name,
    data.msg,
  ])

  return new Advertise(
    data.ad_id,
    advertiser,
    price,
    pair,
    typeOperation,
    minAmount,
    maxAmount,
    paymentChannels,
    actions.public_view,
  )
}

export default mapRawAdToAdvertise
