import { Request, Response } from "express"
import { container } from "tsyringe"

import { DeleteLikeUseCase } from "./DeleteLikeUseCase"

class DeleteLikeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account
        const { likeId } = req.body

        try {
            const deleteLikeUseCase = container.resolve(DeleteLikeUseCase)

            const result = await deleteLikeUseCase.execute({ accountId, likeId })

            return res.json(result)
        } catch (error) {
            return res.json({ error: error.message })
        }
    }
}

export { DeleteLikeController }
