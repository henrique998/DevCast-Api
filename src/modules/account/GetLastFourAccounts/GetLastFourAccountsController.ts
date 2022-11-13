import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetLastFourAccountsUseCase } from "./GetLastFourAccountsUseCase"

class GetLastFourAccountsController {
    async handle(req: Request, res: Response): Promise<Response> {

        const getLastFourAccountsUseCase = container.resolve(GetLastFourAccountsUseCase)

        const response = await getLastFourAccountsUseCase.execute()

        return res
            .status(200)
            .json(response)
    }
}

export { GetLastFourAccountsController }
