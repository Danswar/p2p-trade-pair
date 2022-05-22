import Advertise from './Advertise'
import TypeOperation from './TypeOperation'
interface Market {
  getAdvertises(
    from: string,
    to: string,
    amount: number,
    typeOperation: TypeOperation,
  ): Promise<Advertise[]>
}

export default Market
