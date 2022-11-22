import { Router } from "express"
import { AuthenticateWithCredentialsController } from "../modules/authentication/AuthenticateWithCredentials/AuthenticateWithCredentialsController"
import { AuthenticateWithGithubController } from "../modules/authentication/AuthenticateWithGithub/AuthenticateWithGithubController"
import { RefreshTokenController } from "../modules/authentication/RefreshToken/RefreshTokenController"


const authenticationRoute = Router()

const authenticateWithCredentialsController = new AuthenticateWithCredentialsController()
const authenticateWithGithubController = new AuthenticateWithGithubController()
const refreshTokenController = new RefreshTokenController()

authenticationRoute.post("/credentials", authenticateWithCredentialsController.handle)
authenticationRoute.post("/github", authenticateWithGithubController.handle)
authenticationRoute.post("/refresh-token", refreshTokenController.handle)

export { authenticationRoute as authenticationRoutes }
