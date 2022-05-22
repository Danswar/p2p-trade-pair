import Market from '../entities/Market'
import Advertise from '../entities/Advertise'
import TypeOperation from '../entities/TypeOperation'
import Pair from '../entities/Pair'

// Mocked by now
const market: Market = {
  getAdvertises: async (from, to, amount, typeOperation) => {
    const ads: Advertise[] = [
      {
        id: 'id',
        advertiser: {
          name: 'seller name',
          tradeCount: 500,
          score: 100,
        },
        price: 100,
        typeOperation: typeOperation,
        pair: new Pair('BTC', 'ARS'),
        minAmount: 10,
        maxAmount: 100,
        paymentChannels: ['Brubank'],
        publicView: new URL('https://www.someprovider.com/seller'),
        isValid: () => true,
      },
    ]
    return ads
  },
}

export default market
