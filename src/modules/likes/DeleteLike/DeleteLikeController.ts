import { Request, Response } from "express"
import { container } from "tsyringe"

import { DeleteLikeUseCase } from "./DeleteLikeUseCase"

class DeleteLikeController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account
        const { episodeId } = req.params

        const deleteLikeUseCase = container.resolve(DeleteLikeUseCase)

        await deleteLikeUseCase.execute({ accountId, episodeId })

        return res.json({ message: "aplause deleted successfully!" })
    }
}

export { DeleteLikeController }
