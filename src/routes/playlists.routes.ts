import { Router } from "express"
import multer from "multer"
import { Upload } from "../config/multer"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { AddEpisodeController } from "../modules/playlist/AddEpisode/AddEpisodeController"

import { CreatePlaylistController } from "../modules/playlist/CreatePlaylist/CreatePlaylistController"
import { FindAllPlaylistsController } from "../modules/playlist/FindAllPlaylists/FindAllPlaylistsController"
import { GetPlaylistController } from "../modules/playlist/GetPlaylist/GetPlaylistController"

const playlistsRoute = Router()
const uploadImage = multer(Upload.run("./uploads/coverImage"))

const createPlaylistController = new CreatePlaylistController()
const findAllPlaylistsController = new FindAllPlaylistsController()
const getPlaylistController = new GetPlaylistController()
const addEpisodeController = new AddEpisodeController()

playlistsRoute.post(
    "/", 
    ensureAuthenticated, 
    uploadImage.single("coverImage"), 
    createPlaylistController.handle
)
playlistsRoute.get("/", ensureAuthenticated, findAllPlaylistsController.handle)
playlistsRoute.get("/:slug", ensureAuthenticated, getPlaylistController.handle)
playlistsRoute.put("/add-episode/:episodeId", ensureAuthenticated, addEpisodeController.handle)

export { playlistsRoute as playlistsRoutes }
