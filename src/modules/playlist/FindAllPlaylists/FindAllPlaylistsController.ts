import { Request, Response } from "express"
import { container } from "tsyringe"

import { FindAllPlaylistsUseCase } from "./FindAllPlaylistsUseCase"

class FindAllPlaylistsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account

        const findAllPlaylistsUseCase = container.resolve(FindAllPlaylistsUseCase)

        const result = await findAllPlaylistsUseCase.execute(accountId)

        return res.json(result)
    }
}

export { FindAllPlaylistsController }
