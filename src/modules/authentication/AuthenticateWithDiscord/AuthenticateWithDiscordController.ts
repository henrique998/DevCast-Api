import { Request, Response } from "express"
import { container } from "tsyringe"

import { AuthenticateWithDiscordUseCase } from "./AuthenticateWithDiscordUseCase"

class AuthenticateWithDiscordController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { discord_code } = req.body

        const authenticateWithDiscordUseCase = container.resolve(AuthenticateWithDiscordUseCase)

        const result = await authenticateWithDiscordUseCase.execute(discord_code)

        return res
            .status(200)
            .json(result)
    }
}

export { AuthenticateWithDiscordController }
