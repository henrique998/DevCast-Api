import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetProfileInfoUseCase } from "./GetProfileInfoUseCase"

class GetProfileInfoController {
    async handle(req: Request, res: Response): Promise<Response> {
        const accountId = req.account.id

        const getProfileInfoUseCase = container.resolve(GetProfileInfoUseCase)

        const result = await getProfileInfoUseCase.execute(accountId)

        return res.json(result)
    }
}

export { GetProfileInfoController }
