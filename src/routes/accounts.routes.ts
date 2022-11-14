import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

import { CreateAccountController } from "../modules/account/CreateAccount/CreateAccountController"
import { GetLastFourAccountsController } from "../modules/account/GetLastFourAccounts/GetLastFourAccountsController"
import { GetProfileInfoController } from "../modules/account/GetProfileInfo/GetProfileInfoController"
import { UpdateAccountController } from "../modules/account/UpdateAccount/UpdateAccountController"

const accountRoute = Router()

const createAccountController = new CreateAccountController()
const getLastFourAccountsController = new GetLastFourAccountsController()
const getProfileInfoController = new GetProfileInfoController()
const updateAccountController = new UpdateAccountController()

accountRoute.get("/last-four", getLastFourAccountsController.handle)
accountRoute.get("/me", ensureAuthenticated, getProfileInfoController.handle)
accountRoute.post("/", createAccountController.handle)
accountRoute.put("/update", ensureAuthenticated, updateAccountController.handle)

export { accountRoute as accountRoutes }
