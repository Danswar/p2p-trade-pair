export interface Profile {
  username: string
  trade_count: string
  feedback_score: number
  name: string
  last_online: Date
}

export interface AdvertiseData {
  profile: Profile
  visible: boolean
  hidden_by_opening_hours: boolean
  location_string: string
  countrycode: string
  city: string
  trade_type: string
  online_provider: string
  first_time_limit_btc: string
  volume_coefficient_btc: string
  sms_verification_required: boolean
  currency: string
  lat: number
  lon: number
  min_amount: string
  max_amount: string
  max_amount_available: string
  min_amount_available: string
  ad_id: string
  temp_price_usd: string
  temp_price: string
  created_at: Date
  require_feedback_score: number
  require_trade_volume: number
  msg: string
  bank_name: string
  atm_model?: any
  require_trusted_by_advertiser: boolean
  require_identification: boolean
  is_local_office: boolean
  payment_window_minutes: number
  limit_to_fiat_amounts?: any
}

export interface Actions {
  public_view: string
}

export interface RawAdvertise {
  data: AdvertiseData
  actions: Actions
}

export interface Pagination {
  next?: string
  prev?: string
}

export interface GetAdsResponse {
  data: {
    ad_list: RawAdvertise[]
    ad_count: number
  }
  pagination?: Pagination
}
