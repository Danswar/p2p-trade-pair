import GetBestAds, { GetBestAdsInputPort } from "./GetBestAds";
import localbitcoinsP2P from "../../infra/LocalbitcoinsP2P";

const getBestAds = new GetBestAds(localbitcoinsP2P)

export default (params: GetBestAdsInputPort) => getBestAds.execute(params)