import { Request, Response } from "express"
import { container } from "tsyringe"

import { DeleteAvatarUseCase } from "./DeleteAvatarUseCase"

class DeleteAvatarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account

        const deleteAvatarUseCase = container.resolve(DeleteAvatarUseCase)

        await deleteAvatarUseCase.execute(accountId)

        return res
            .status(204)
            .send()
    }
}

export { DeleteAvatarController }
