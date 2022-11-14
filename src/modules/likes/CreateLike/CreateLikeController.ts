import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreateLikeUseCase } from "./CreateLikeUseCase"

class CreateLikeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account
        const { episodeId } = req.body

        const createLikeUseCase = container.resolve(CreateLikeUseCase)

        const result = await createLikeUseCase.execute({
            accountId,
            episodeId
        })

        return res
            .status(200)
            .json(result)
    }
}

export { CreateLikeController }
