import Advertise from "./Advertise";
import TypeOperation from "./TypeOperation";
interface Market {
    getAdvertises(assetCode: string, typeOperation: TypeOperation): Promise<Advertise[]>;
}

export default Market