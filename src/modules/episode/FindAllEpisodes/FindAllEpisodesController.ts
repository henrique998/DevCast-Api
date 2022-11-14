import { Request, Response } from "express"
import { container } from "tsyringe"

import { FindAllEpisodesUseCase } from "./FindAllEpisodesUseCase"

class FindAllEpisodesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const findAllEpisodesUseCase = container.resolve(FindAllEpisodesUseCase)

        const result = await findAllEpisodesUseCase.execute()

        return res.json(result)
    }
}

export { FindAllEpisodesController }
