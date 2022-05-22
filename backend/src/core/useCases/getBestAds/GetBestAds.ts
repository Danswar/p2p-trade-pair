import Advertise from '../../entities/Advertise'
import Market from '../../entities/Market'
import TypeOperation from '../../entities/TypeOperation'
import UseCase from '../../entities/UseCase'

export interface GetBestAdsInputPort {
  from: string
  to: string
  amount: number
  typeOperation: TypeOperation
}

export interface GetBestAdsOutputPort {
  data: Advertise[]
}

class GetBestAds extends UseCase<GetBestAdsInputPort, GetBestAdsOutputPort> {
  constructor(private marketManager: Market) {
    super()
  }

  async execute(params: GetBestAdsInputPort): Promise<GetBestAdsOutputPort> {
    const { from, to, amount, typeOperation } = params

    const ads = await this.marketManager.getAdvertises(
      from,
      to,
      amount,
      typeOperation,
    )

    return { data: ads }
  }
}

export default GetBestAds
