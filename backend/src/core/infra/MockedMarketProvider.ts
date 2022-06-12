import Market from '../entities/Market'
import Advertise from '../entities/Advertise'
import Pair from '../entities/Pair'
import TraderProfile from '../entities/TraderProfile'

// Mocked by now
const market: Market = {
  getAdvertises: async (from, to, amount, typeOperation) => {
    const ads: Advertise[] = [
      {
        id: 'id',
        advertiser: new TraderProfile('name', 50, 10),
        price: 100,
        typeOperation: typeOperation,
        pair: new Pair('BTC', 'ARS'),
        minAmount: 10,
        maxAmount: 100,
        paymentChannels: ['Brubank'],
        publicView: 'https://www.someprovider.com/seller',
        isValid: () => true,
        toJson: () => ({}),
      },
    ]
    return ads
  },
}

export default market
