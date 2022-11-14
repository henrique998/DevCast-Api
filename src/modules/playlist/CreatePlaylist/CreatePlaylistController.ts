import { Request, Response } from "express"
import { container } from "tsyringe"

import { CreatePlaylistUseCase } from "./CreatePlaylistUseCase"

class CreatePlaylistController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account
        const { name, description } = req.body
        const coverImage = req.file.filename

        const createPlaylistUseCase = container.resolve(CreatePlaylistUseCase)

        const result = await createPlaylistUseCase.execute({
            accountId,
            name, 
            coverImage, 
            description
        })

        return res.json(result)
    }
}

export { CreatePlaylistController }
