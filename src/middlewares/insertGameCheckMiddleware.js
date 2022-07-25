import connection from "../database/database.js";
import {gameSchema} from '../schemas/gamesSchema.js';

export default async function validateGame(req, res, next) {
    const game = req.body;
    const validation = gameSchema.validate(game);

    if(validation.error) {
        console.log(validation.error.details);
        return res.sendStatus(400);
    }

    try {
        const gameAlreadyExists = await connection.query(`SELECT EXISTS (SELECT 1 FROM games WHERE name = $1)`,[game.name]);
        if(gameAlreadyExists.rows[0].exists) {
            console.log("Jogo já existe!");
            return res.sendStatus(409);
        }

        res.locals.game = game;
        next();
    }
    catch(error) {
        return res.send(error);
    }
}