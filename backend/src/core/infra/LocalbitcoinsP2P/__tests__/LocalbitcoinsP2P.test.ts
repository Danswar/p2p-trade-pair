import localbitcoinsP2P from '..'
import fetchAsJson from '../utils/fetchAsJson'
import TypeOperation from '../../../entities/TypeOperation'
import rawAds from './mocks/rawAds.json'
import parsedAds from './mocks/parsedAds.json'
// import fs from 'fs'

jest.mock('../utils/fetchAsJson', () => jest.fn())

describe('LocalbitcoinsP2P Market', () => {
  it('Parse response successfully', async () => {
    ;(fetchAsJson as jest.Mock).mockResolvedValue(rawAds)

    const ads = await localbitcoinsP2P.getAdvertises(
      'VED',
      'BTC',
      1000,
      TypeOperation.SELL,
      [],
    )

    // fs.writeFile('here.json', JSON.stringify(ads), {}, () => {})
    expect(parsedAds).toEqual(ads)
  })

  it('Should sort SELL ads from highest to lowest price', async () => {
    ;(fetchAsJson as jest.Mock).mockResolvedValue(rawAds)

    const ads = await localbitcoinsP2P.getAdvertises(
      'VED',
      'BTC',
      1000,
      TypeOperation.SELL,
      [],
    )

    const prices = ads.map((ad) => ad.price)
    const sortedPrices = [...prices].sort((a, b) => b - a)
    expect(prices).toEqual(sortedPrices)
  })

  it('Should sort BUY ads from lowest to highest price', async () => {
    ;(fetchAsJson as jest.Mock).mockResolvedValue(rawAds)

    const ads = await localbitcoinsP2P.getAdvertises(
      'VED',
      'BTC',
      1000,
      TypeOperation.BUY,
      [],
    )

    const prices = ads.map((ad) => ad.price)
    const sortedPrices = [...prices].sort()
    expect(prices).toEqual(sortedPrices)
  })
})
