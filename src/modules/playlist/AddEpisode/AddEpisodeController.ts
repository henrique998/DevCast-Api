import { Request, Response } from "express"
import { container } from "tsyringe"

import { AddEpisodeUseCase } from "./AddEpisodeUseCase"

class AddEpisodeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account
        const { episodeId } = req.params
        const { playlistId } = req.body

        const addEpisodeUseCase = container.resolve(AddEpisodeUseCase)

        const response = await addEpisodeUseCase.execute({
            accountId,
            episodeId,
            playlistId
        })

        return res.json(response)
    }
}

export { AddEpisodeController }
