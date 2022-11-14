import { Request, Response } from "express"
import { container } from "tsyringe"

import { AuthenticateWithGithubUseCase } from "./AuthenticateWithGithubUseCase"

class AuthenticateWithGithubController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { github_code } = req.body

        const authenticateWithGithubUseCase = container.resolve(AuthenticateWithGithubUseCase)

        const result = await authenticateWithGithubUseCase.execute(github_code)

        return res
            .status(201)
            .json(result)
    }
}

export { AuthenticateWithGithubController }
