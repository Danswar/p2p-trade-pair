import GetBestAds, { GetBestAdsInputPort } from "./GetBestAds";
import Market from "../../entities/Market";
import Advertise from "../../entities/Advertise";
import TypeOperation from "../../entities/TypeOperation";
import Pair from "../../entities/Pair";

// Mocked by now
const market: Market = {
    getAdvertises: async () => {
        const ads: Advertise[] = [
            {
                id: "id",
                advertiser: {
                    name: "seller name",
                    tradeCount: 500,
                    score: 100
                },
                price: 100,
                typeOperation: TypeOperation.SELL,
                pair: new Pair("BTC", "ARS"),
                minAmount: 10,
                maxAmount: 100,
                paymentChannels: ["Brubank"],
                publicView: new URL("https://www.someprovider.com/seller"),
                isValid: () => true
            }
        ]
        return ads
    }
}

const getBestAds = new GetBestAds(market)

export default (params: GetBestAdsInputPort) => getBestAds.execute(params)