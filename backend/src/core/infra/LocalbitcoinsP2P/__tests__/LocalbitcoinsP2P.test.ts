import localbitcoinsP2P from '..'
import fetchAsJson from '../utils/fetchAsJson'
import TypeOperation from '../../../entities/TypeOperation'
import mockedResponse from './mockedResponse.json'
import expectedParsed from './expectedParsed.json'

jest.mock('../utils/fetchAsJson', () => jest.fn())

describe('LocalbitcoinsP2P Market', () => {
  it('Parse response successfully', async () => {
    ;(fetchAsJson as jest.Mock).mockResolvedValue(mockedResponse)

    const ads = await localbitcoinsP2P.getAdvertises(
      'VED',
      'BTC',
      1000,
      TypeOperation.SELL,
    )

    expect(expectedParsed).toEqual(ads)
  })
})
