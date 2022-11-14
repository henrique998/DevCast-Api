import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateFavoriteEpisodeUseCase } from "./CreateFavoriteEpisodeUseCase"

class CreateFavoriteEpisodeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account
        const { episodeId } = req.body

        const createFavoriteEpisodeUseCase = container.resolve(CreateFavoriteEpisodeUseCase)

        await createFavoriteEpisodeUseCase.execute({
            episodeId,
            accountId
        })

        return res.json({ message: "Episode added to favorites successfuly!" })
    }
}

export { CreateFavoriteEpisodeController }
