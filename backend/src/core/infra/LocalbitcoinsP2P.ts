import fetch from "node-fetch"

import Advertise from "../entities/Advertise"
import Market from "../entities/Market"
import Pair from "../entities/Pair"
import TypeOperation from "../entities/TypeOperation"

const BASE_URL = "https://localbitcoins.com/"
const MAX_LIMIT_OF_PAGES = 10

const typeOperationToURL = {
    [TypeOperation.SELL]: "buy-bitcoins-online",
    [TypeOperation.BUY]: "sell-bitcoins-online"
}

const fetchAsJson = async (url: string) => {
    const response: any = await fetch(url)
    const json = await response.json()
    return json
}

const fetchAllAdvertises = async (assetCode: string, typeOperation: TypeOperation) => {
    let counter = 0
    let adList: any[] = []
    let nextPageUrl = `${BASE_URL}/${typeOperationToURL[typeOperation]}/${assetCode.toUpperCase()}/.json`

    while (nextPageUrl && counter < MAX_LIMIT_OF_PAGES) {
        const page = await fetchAsJson(nextPageUrl)
        adList = [...adList, ...page.data.ad_list]
        nextPageUrl = page.pagination.next
        counter++
    }

    return adList
}

const mapRawAdToAdvertise = (rawAd: any, assetCode: string, typeOperation: TypeOperation): Advertise => {
    const { data, actions } = rawAd

    return new Advertise(
        data.ad_id,
        data.profile,
        data.temp_price,
        new Pair(assetCode, "BTC"),
        typeOperation,
        data.min_amount,
        data.max_amount,
        [data.bank_name],
        new URL(actions.public_view)
    )
}

const localbitcoinsP2P: Market = {
    async getAdvertises(assetCode: string, typeOperation: TypeOperation) {
        const adList = await fetchAllAdvertises(assetCode, typeOperation)
        const ads: Advertise[] = adList.map((rawAd: any) => mapRawAdToAdvertise(rawAd, assetCode, typeOperation))
        return ads;
    }
}

export default localbitcoinsP2P