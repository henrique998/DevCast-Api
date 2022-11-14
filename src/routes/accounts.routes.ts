import { Router } from "express"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { Upload } from "../config/multer"

import { CreateAccountController } from "../modules/account/CreateAccount/CreateAccountController"
import { GetLastFourAccountsController } from "../modules/account/GetLastFourAccounts/GetLastFourAccountsController"
import { GetProfileInfoController } from "../modules/account/GetProfileInfo/GetProfileInfoController"
import { UpdateAccountController } from "../modules/account/UpdateAccount/UpdateAccountController"
import { UpdateAvatarController } from "../modules/account/UpdateAvatar/UpdateAvatarController"
import multer from "multer"

const accountRoute = Router()

const uploadAvatar = multer(Upload.run("./uploads/avatar"))

const createAccountController = new CreateAccountController()
const getLastFourAccountsController = new GetLastFourAccountsController()
const getProfileInfoController = new GetProfileInfoController()
const updateAccountController = new UpdateAccountController()
const updateAvatarController = new UpdateAvatarController()

accountRoute.get("/last-four", getLastFourAccountsController.handle)
accountRoute.get("/me", ensureAuthenticated, getProfileInfoController.handle)
accountRoute.post("/", createAccountController.handle)
accountRoute.put("/update", ensureAuthenticated, updateAccountController.handle)
accountRoute.patch(
    "/update/avatar", 
    ensureAuthenticated, 
    uploadAvatar.single("avatar"), 
    updateAvatarController.handle
)

export { accountRoute as accountRoutes }
