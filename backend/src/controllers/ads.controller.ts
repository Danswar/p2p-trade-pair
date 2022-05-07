import { Request, Response } from "express";
import getBestAds from "../core/useCases/getBestAds";

interface GetBestAdsRequest extends Request<{ from: string, to: string }> { }

export default async (req: GetBestAdsRequest, res: Response) => {
    const { from, to } = req.params

    if (!from || !from.length || !to || !to.length) {
        return res.status(400).json({ msg: "bad request: 'from' and 'to' asset codes must by supplied" })
    }

    const bestAds = await getBestAds({ from, to })
    res.json(bestAds)
}