import { Request, Response } from "express"
import { container } from "tsyringe"

import { FindAllFavoritesEpisodesUseCase } from "./FindAllFavoritesEpisodesUseCase"

class FindAllFavoritesEpisodesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account

        const findAllFavoritesEpisodesUseCase = container.resolve(FindAllFavoritesEpisodesUseCase)

        const response = await findAllFavoritesEpisodesUseCase.execute(accountId)

        return res.json(response)
    }
}

export { FindAllFavoritesEpisodesController }
