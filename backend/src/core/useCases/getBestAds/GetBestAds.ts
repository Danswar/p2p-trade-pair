import Advertise from '../../entities/Advertise'
import Market from '../../entities/Market'
import TypeOperation from '../../entities/TypeOperation'
import UseCase from '../../entities/UseCase'

export interface GetBestAdsInputPort {
  from: string
  to: string
  amount: number
  typeOperation: TypeOperation
  paymentChannels: string[]
}

export interface GetBestAdsOutputPort {
  data: Advertise[]
  meta: {
    availablePaymentChannels: string[]
  }
}

class GetBestAds extends UseCase<GetBestAdsInputPort, GetBestAdsOutputPort> {
  constructor(private marketManager: Market) {
    super()
  }

  async execute(params: GetBestAdsInputPort): Promise<GetBestAdsOutputPort> {
    const { from, to, amount, typeOperation, paymentChannels } = params

    const ads = await this.marketManager.getAdvertises(
      from,
      to,
      amount,
      typeOperation,
      paymentChannels,
    )

    const availablePaymentChannels = await this.marketManager.getAvailablePaymentChannels()

    return { data: ads, meta: { availablePaymentChannels } }
  }
}

export default GetBestAds
