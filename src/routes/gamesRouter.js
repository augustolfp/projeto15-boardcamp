import { Router } from "express";
import { listGames, insertGame } from "../controllers/gamesController.js";
import validateGame from "../middlewares/insertGameCheckMiddleware.js";

const gamesRouter = Router();

gamesRouter.get('/games', listGames);
gamesRouter.post('/games', validateGame, insertGame);

export default gamesRouter;