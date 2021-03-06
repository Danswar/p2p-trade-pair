import TraderProfile from './TraderProfile'
import Pair from './Pair'
import TypeOperation from './TypeOperation'

class Advertise {
  readonly id: string
  readonly advertiser: TraderProfile
  readonly price: number
  readonly pair: Pair
  readonly typeOperation: TypeOperation
  readonly minAmount: number
  readonly maxAmount: number
  readonly paymentChannels: string[]
  readonly publicView: string

  constructor(
    id: string,
    advertiser: TraderProfile,
    price: number,
    pair: Pair,
    typeOperation: TypeOperation,
    minAmount: number,
    maxAmount: number,
    paymentChannels: string[],
    publicView: string,
  ) {
    if (!id) throw new Error('Id is required and cannot be empty')

    this.id = id
    this.advertiser = advertiser
    this.price = price
    this.pair = pair
    this.typeOperation = typeOperation
    this.minAmount = minAmount
    this.maxAmount = maxAmount
    this.paymentChannels = paymentChannels
    this.publicView = publicView
  }

  isValid(): Boolean {
    return this.minAmount <= this.maxAmount
  }

  toJson(): Object {
    return {
      id: this.id,
      advertiser: this.advertiser.toJson(),
      price: this.price,
      pair: this.pair,
      typeOperation: this.typeOperation,
      minAmount: this.minAmount,
      maxAmount: this.maxAmount,
      paymentChannels: this.paymentChannels,
      publicView: this.publicView.toString,
    }
  }
}

export default Advertise
