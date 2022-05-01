import Advertise from "../entities/Advertise";
import Market from "../entities/Market";
import UseCase from "../entities/UseCase";

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

    execute(params: GetBestAdsInputPort): GetBestAdsOutputPort {
        return {
            buyers: [] as Advertise[],
            sellers: [] as Advertise[]
        }
    }
}

export default GetBestAds
