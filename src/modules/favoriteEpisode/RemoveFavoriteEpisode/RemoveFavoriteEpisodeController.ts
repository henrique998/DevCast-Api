import { Request, Response } from "express"
import { container } from "tsyringe"

import { RemoveFavoriteEpisodeUseCase } from "./RemoveFavoriteEpisodeUseCase"

class RemoveFavoriteEpisodeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account
        const { episodeId } = req.params

        const removeFavoriteEpisodeUseCase = container.resolve(RemoveFavoriteEpisodeUseCase)

        await removeFavoriteEpisodeUseCase.execute({
            accountId,
            favoriteEpisodeId: episodeId
        })

        return res.json({ message: "Episode removed from favorites successfuly!" })
    }
}

export { RemoveFavoriteEpisodeController }
