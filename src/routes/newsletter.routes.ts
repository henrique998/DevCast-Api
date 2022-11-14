import { Router } from "express"

import { RegisterEmailController } from "../modules/newsletter/RegisterEmail/RegisterEmailController"

const newsletterRoute = Router()

const registerEmailController = new RegisterEmailController()

newsletterRoute.post("/", registerEmailController.handle)

export { newsletterRoute as newsletterRoutes }
