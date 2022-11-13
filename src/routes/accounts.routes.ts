import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

import { CreateAccountController } from "../modules/account/CreateAccount/CreateAccountController"
import { GetLastFourAccountsController } from "../modules/account/GetLastFourAccounts/GetLastFourAccountsController"
import { GetProfileInfoController } from "../modules/account/GetProfileInfo/GetProfileInfoController"

const accountRoute = Router()

const createAccountController = new CreateAccountController()
const getLastFourAccountsController = new GetLastFourAccountsController()
const getProfileInfoController = new GetProfileInfoController()

accountRoute.post("/", createAccountController.handle)
accountRoute.get("/last-four", getLastFourAccountsController.handle)
accountRoute.get("/me", ensureAuthenticated, getProfileInfoController.handle)

export { accountRoute as accountRoutes }
