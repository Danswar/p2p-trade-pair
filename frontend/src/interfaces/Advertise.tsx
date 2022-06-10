export interface Advertiser {
  name: string;
  tradeCount: string;
  score: number;
}

export interface Pair {
  baseCode: string;
  variableCode: string;
  symbol: string;
}

export interface Advertise {
  id: number;
  advertiser: Advertiser;
  price: string;
  pair: Pair;
  typeOperation: string;
  minAmount: string;
  maxAmount: string;
  paymentChannels: string[];
  publicView: string;
}
