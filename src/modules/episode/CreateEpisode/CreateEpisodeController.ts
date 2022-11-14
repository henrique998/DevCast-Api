import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateEpisodeUseCase } from "./CreateEpisodeUseCase"

class CreateEpisodeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { 
            thumbnail,
            title,
            members,
            description,
            slug,
            url,
            type,
            duration,
            publishedAt
         } = req.body

        const createEpisodeUseCase = container.resolve(CreateEpisodeUseCase)

        const result = await createEpisodeUseCase.execute({
            thumbnail,
            title,
            members,
            description,
            slug,
            url,
            type,
            duration,
            publishedAt
        })

        return res
            .status(201)
            .json(result)
    }
}

export { CreateEpisodeController }
