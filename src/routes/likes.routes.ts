import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

import { FindAllLikesController } from "../modules/likes/FindAllLikes/FindAllLikesController"
import { CreateLikeController } from "../modules/likes/CreateLike/CreateLikeController"
import { DeleteLikeController } from "../modules/likes/DeleteLike/DeleteLikeController"

const likeRoute = Router()

const findAllLikesController = new FindAllLikesController()
const createlikeController = new CreateLikeController()
const deletelikeController = new DeleteLikeController()

likeRoute.get("/", ensureAuthenticated, findAllLikesController.handle)
likeRoute.post("/", ensureAuthenticated, createlikeController.handle)
likeRoute.delete("/remove/:likeId", ensureAuthenticated, deletelikeController.handle)

export { likeRoute as likesRoutes }
