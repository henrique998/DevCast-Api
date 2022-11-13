import { Router } from "express";

import { accountRoutes } from "./accounts.routes";
import { authenticationRoutes } from "./authentication.routes";

const router = Router();

router.use("/accounts", accountRoutes);
router.use("/authentication", authenticationRoutes);

router.get("/discord/redirect", (req, res) => {
    return res.send("github redirect!")
})

export { router as routes };
