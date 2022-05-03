import Advertise from "./Advertise";
interface Market {
    getAdvertises(): Promise<Advertise[]>;
}

export default Market