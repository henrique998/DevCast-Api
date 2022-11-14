import { Request, Response } from "express"
import { container } from "tsyringe"

import { RegisterEmailUseCase } from "./RegisterEmailUseCase"

class RegisterEmailController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { email } = req.body

        const registerEmailUseCase = container.resolve(RegisterEmailUseCase)

        await registerEmailUseCase.execute(email)

        return res
            .status(201)
            .json({ message: "Email Registered Successfuly!" })
    }
}

export { RegisterEmailController }
