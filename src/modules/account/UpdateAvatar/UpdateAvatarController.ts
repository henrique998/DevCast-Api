import { Request, Response } from "express"
import { container } from "tsyringe"

import { UpdateAvatarUseCase } from "./UpdateAvatarUseCase"

class UpdateAvatarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account
        const avatarUrl = req.file.filename

        const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase)

        const result = await updateAvatarUseCase.execute({
            accountId,
            avatarUrl
        })

        return res.json({ newAvatarUrl: result })
    }
}

export { UpdateAvatarController }
