import { Router } from "express"

import { FindAllEpisodesController } from "../modules/episode/FindAllEpisodes/FindAllEpisodesController"
import { CreateEpisodeController } from "../modules/episode/CreateEpisode/CreateEpisodeController"
import { GetEpisodeController } from "../modules/episode/GetEpisode/GetEpisodeController"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const episodeRoute = Router()

const findAllEpisodesController = new FindAllEpisodesController()
const createEpisodeController = new CreateEpisodeController()
const getEpisodeController = new GetEpisodeController()

episodeRoute.get("/", findAllEpisodesController.handle)
episodeRoute.get("/:slug", ensureAuthenticated, getEpisodeController.handle)
episodeRoute.post("/", createEpisodeController.handle)

export { episodeRoute as episodesRoutes }
