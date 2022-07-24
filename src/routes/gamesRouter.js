import { Router } from "express";
import { listGames, insertGame } from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.get('/games', listGames);
gamesRouter.post('/games', insertGame);

export default gamesRouter;