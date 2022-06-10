import { Advertise } from "../interfaces/Advertise";

type FetchAdsInput = {
  typeOperation: string;
  from: string;
  to: string;
  amount: string;
};

const BEST_ADS_URL = `http://localhost:3000`;

const fetchAds = async ({
  typeOperation,
  from,
  to,
  amount
}: FetchAdsInput): Promise<Advertise[]> => {
  const res = await fetch(
    `${BEST_ADS_URL}/${typeOperation}/${from}/${to}/${amount}`
  );
  const { data }: { data: Advertise[] } = await res.json();
  return data;
};

export default fetchAds;
