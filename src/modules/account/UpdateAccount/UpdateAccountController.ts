import { Request, Response } from "express"
import { container } from "tsyringe"

import { UpdateAccountUseCase } from "./UpdateAccountUseCase"

class UpdateAccountController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id: accountId } = req.account
        const { name, email } = req.body

        const updateAccountUseCase = container.resolve(UpdateAccountUseCase)

        const result = await updateAccountUseCase.execute({
            accountId,
            name,
            email
        })

        return res.json(result)
    }
}

export { UpdateAccountController }
