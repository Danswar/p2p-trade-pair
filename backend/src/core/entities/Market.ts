import Advertise from './Advertise'
import TypeOperation from './TypeOperation'
interface Market {
  getAdvertises(
    from: string,
    to: string,
    amount: number,
    typeOperation: TypeOperation,
    paymentChannels: string[],
  ): Promise<Advertise[]>
  getAvailablePaymentChannels(): Promise<string[]>
}

export default Market
