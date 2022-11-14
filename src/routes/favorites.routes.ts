import { Router } from "express"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

import { CreateFavoriteEpisodeController } from "../modules/favoriteEpisode/CreateFavoriteEpisode/CreateFavoriteEpisodeController"
import { FindAllFavoritesEpisodesController } from "../modules/favoriteEpisode/FindAllFavoritesEpisodes/FindAllFavoritesEpisodesController"
import { RemoveFavoriteEpisodeController } from "../modules/favoriteEpisode/RemoveFavoriteEpisode/RemoveFavoriteEpisodeController"

const favoriteEpisodeRoute = Router()

const findAllfavoritesEpisodesController = new FindAllFavoritesEpisodesController()
const createfavoriteEpisodeController = new CreateFavoriteEpisodeController()
const removefavoriteEpisodeController = new RemoveFavoriteEpisodeController()

favoriteEpisodeRoute.get("/", ensureAuthenticated, findAllfavoritesEpisodesController.handle)
favoriteEpisodeRoute.post("/", ensureAuthenticated, createfavoriteEpisodeController.handle)
favoriteEpisodeRoute.delete("/remove", ensureAuthenticated, removefavoriteEpisodeController.handle)

export { favoriteEpisodeRoute as favoritesEpisodesRoutes }
