import { Request, Response } from "express"
import { container } from "tsyringe"

import { FindAllLikesUseCase } from "./FindAllLikesUseCase"

class FindAllLikesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const findAlLikesUseCase = container.resolve(FindAllLikesUseCase)

        const result = await findAlLikesUseCase.execute()

        return res.json(result)
    }
}

export { FindAllLikesController }
