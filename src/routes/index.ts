import { Router } from "express";

import { accountRoutes } from "./accounts.routes";
import { authenticationRoutes } from "./authentication.routes";
import { episodesRoutes } from "./episodes.routes";
import { favoritesEpisodesRoutes } from "./favorites.routes";
import { likesRoutes } from "./likes.routes";
import { newsletterRoutes } from "./newsletter.routes";
import { playlistsRoutes } from "./playlists.routes";

const router = Router();

router.use("/accounts", accountRoutes);
router.use("/authentication", authenticationRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/episodes", episodesRoutes);
router.use("/likes", likesRoutes);
router.use("/favorites-episodes", favoritesEpisodesRoutes);
router.use("/playlists", playlistsRoutes);

router.get("/github/redirect", (req, res) => {
    return res.send("github redirect!")
})

export { router as routes };
