import { Router } from "express";
import gamesRouter from "./gamesRouter.js";
import categoriesRouter from "./categoriesRouter.js";

const router = Router();

router.use(gamesRouter);
router.use(categoriesRouter);

export default router;