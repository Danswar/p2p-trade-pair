import { Request, Response } from 'express'
import TypeOperation from '../core/entities/TypeOperation'
import getBestAds from '../core/useCases/getBestAds'

interface GetBestAdsRequest
  extends Request<{
    from: string
    to: string
    amount: string
    typeOperation: string
  }> {}

export default async (req: GetBestAdsRequest, res: Response) => {
  const { from, to, amount, typeOperation } = req.params

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
  })

  return res.json(bestAds)
}
