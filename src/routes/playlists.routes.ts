import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

import { CreatePlaylistController } from "../modules/playlist/CreatePlaylist/CreatePlaylistController"

const playlistsRoute = Router()

const createPlaylistController = new CreatePlaylistController()

playlistsRoute.post("/", ensureAuthenticated, createPlaylistController.handle)

export { playlistsRoute as playlistsRoutes }
