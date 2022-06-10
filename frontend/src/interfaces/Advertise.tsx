export interface Advertiser {
  name: string;
  tradeCount: number;
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
  price: number;
  pair: Pair;
  typeOperation: string;
  minAmount: number;
  maxAmount: number;
  paymentChannels: string[];
  publicView: string;
}
