import { Request, Response } from "express"
import { container } from "tsyringe"

import { FindAllFavoritesEpisodesShortDataUseCase } from "./FindAllFavoritesEpisodesShortDataUseCase"

class FindAllFavoritesEpisodesShortDataController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account

        const findAllFavoritesEpisodesShortData = container.resolve(FindAllFavoritesEpisodesShortDataUseCase)

        const response = await findAllFavoritesEpisodesShortData.execute(accountId)

        return res.json(response)
    }
}

export { FindAllFavoritesEpisodesShortDataController }
