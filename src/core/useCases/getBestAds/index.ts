import GetBestAds, { GetBestAdsInputPort } from "./GetBestAds";
import mockedMarketProvider from "../../infra/MockedMarketProvider";

const getBestAds = new GetBestAds(mockedMarketProvider)

export default (params: GetBestAdsInputPort) => getBestAds.execute(params)