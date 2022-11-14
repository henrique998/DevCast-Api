import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetPlaylistUseCase } from "./GetPlaylistUseCase"

class GetPlaylistController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account
        const { slug } = req.params

        const getPlaylistUseCase = container.resolve(GetPlaylistUseCase)

        const response = await getPlaylistUseCase.execute({
            accountId,
            slug
        })

        return res.json(response)
    }
}

export { GetPlaylistController }
