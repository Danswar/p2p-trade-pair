import fetch from "node-fetch"

import Advertise from "../entities/Advertise"
import Market from "../entities/Market"
import Pair from "../entities/Pair"
import TypeOperation from "../entities/TypeOperation"

const BASE_URL = "https://localbitcoins.com/"

const localbitcoinsP2P: Market = {
    async getAdvertises(assetCode: string, typeOperation: TypeOperation) {
        const response: any = await fetch(`${BASE_URL}/buy-bitcoins-online/ARS/.json`)
        const jsonResponse = await response.json()
        const { data: { ad_list } }: any = jsonResponse;
        const ads: Advertise[] = ad_list.map((rawAd: any) => {
            const { data } = rawAd
            return new Advertise(
                data.ad_id,
                data.profile,
                data.temp_price,
                new Pair(assetCode, "BTC"),
                typeOperation,
                data.min_amount,
                data.max_amount,
                [data.bank_name],
                new URL("http://localhost:3000")
            )
        })

        return ads;
    }
}

export default localbitcoinsP2P