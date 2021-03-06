import { Request, Response } from 'express'
import TypeOperation from '../../core/entities/TypeOperation'
import getBestAds from '../../core/useCases/getBestAds'

export default async (req: Request, res: Response) => {
  const { from, to, amount, typeOperation, paymentChannels } = req.body

  if (!from || !from.length || !to || !to.length) {
    return res.status(400).json({
      msg: "bad request: 'from' and 'to' asset codes must by supplied",
    })
  }

  if (!amount || Number.isNaN(amount)) {
    return res.status(400).json({
      msg: 'bad request: amount not valid',
    })
  }

  if (
    !typeOperation ||
    !Object.values(TypeOperation)?.includes(
      typeOperation.toUpperCase() as TypeOperation,
    )
  ) {
    return res.status(400).json({
      msg: 'bad request: type operation not supported',
    })
  }

  const bestAds = await getBestAds({
    from,
    to,
    amount: Number(amount),
    typeOperation: typeOperation.toUpperCase() as TypeOperation,
    paymentChannels,
  })

  return res.json(bestAds)
}
