import { Router } from "express"
import { AuthenticateWithCredentialsController } from "../modules/authentication/AuthenticateWithCredentials/AuthenticateWithCredentialsController"
import { AuthenticateWithDiscordController } from "../modules/authentication/AuthenticateWithDiscord/AuthenticateWithDiscordController"
import { RefreshTokenController } from "../modules/authentication/RefreshToken/RefreshTokenController"


const authenticationRoute = Router()

const authenticateWithCredentialsController = new AuthenticateWithCredentialsController()
const authenticateWithDiscordController = new AuthenticateWithDiscordController()
const refreshTokenController = new RefreshTokenController()

authenticationRoute.post("/credentials", authenticateWithCredentialsController.handle)
authenticationRoute.post("/discord", authenticateWithDiscordController.handle)
authenticationRoute.post("/refresh-token", refreshTokenController.handle)

export { authenticationRoute as authenticationRoutes }
