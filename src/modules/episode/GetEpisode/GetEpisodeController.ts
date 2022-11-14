import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetEpisodeUseCase } from "./GetEpisodeUseCase"

class GetEpisodeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { slug } = req.params

        const getEpisodeUseCase = container.resolve(GetEpisodeUseCase)

        const result = await getEpisodeUseCase.execute(slug)

        return res.json(result)
    }
}

export { GetEpisodeController }
