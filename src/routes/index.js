import { Router } from "express";
import gamesRouter from "./gamesRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import customersRouter from './customersRouter.js';
import rentalsRouter from "./rentalsRouter.js";

const router = Router();

router.use(gamesRouter);
router.use(categoriesRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;