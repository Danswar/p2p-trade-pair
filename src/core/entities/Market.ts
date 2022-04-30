import Advertise from "./Advertise";
import Pair from "./Pair";
import TypeOperation from "./TypeOperation";

interface Market {
    pair: Pair;
    typeOperation: TypeOperation
    getAdvertises: Promise<Advertise[]>;
}

export default Market