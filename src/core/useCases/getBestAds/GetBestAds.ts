import Advertise from "../../entities/Advertise";
import Market from "../../entities/Market";
import UseCase from "../../entities/UseCase";

export interface GetBestAdsInputPort {
    from: string
    to: string
}

export interface GetBestAdsOutputPort {
    buyers: Advertise[]
    sellers: Advertise[]
}


class GetBestAds extends UseCase<GetBestAdsInputPort, GetBestAdsOutputPort> {
    constructor(private marketManager: Market) {
        super()
    }

    async execute(params: GetBestAdsInputPort): Promise<GetBestAdsOutputPort> {
        const sellers = await this.marketManager.getAdvertises();
        const buyers = await this.marketManager.getAdvertises();

        return { sellers, buyers }
    }
}

export default GetBestAds
