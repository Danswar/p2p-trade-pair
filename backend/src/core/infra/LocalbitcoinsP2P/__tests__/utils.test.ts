import { calculatePaymentChannelFromMessage } from '../utils/mapRawAdToAdvertise'
import parsedAds from '../__tests__/mocks/parsedAds.json'

describe('Calculate payment channels from msg', () => {
  it('Banesco y pago movil', () => {
    const mockMessage = [
      '⭐️✅⭐️BANESCO⭐️✅⭐️BANESCO⭐️✅⭐️PAGO MOVIL⭐️✅⭐️\n\nOfertar, solicitar datos, transferir y enviar capture del comprobante de pago para una pronta y segura liberación.\n\nAcepto cuenta de terceros. Se piden documentos si tienes menos de 100 intercambios y menos de 1 año de experiencia.',
    ]
    const result = calculatePaymentChannelFromMessage(mockMessage)

    expect(result).toEqual(['banesco', 'pago-movil'])
  })

  it('Mercantil', () => {
    const mockMessage = ['Banco MERCANTIL']
    const result = calculatePaymentChannelFromMessage(mockMessage)
    expect(result).toEqual(['mercantil'])
  })

  it('Provincial', () => {
    const mockMessage = ['BBVA Provincial']
    const result = calculatePaymentChannelFromMessage(mockMessage)
    expect(result).toEqual(['provincial'])
  })

  it('Banco de Venezuela', () => {
    const mockMessage = ['BdV']
    const result = calculatePaymentChannelFromMessage(mockMessage)
    expect(result).toEqual(['banco-venezuela'])
  })
})
