import connection from "../database/database.js";

export async function listGames(req, res) {
    const name = req.query.name;
    try {
        if(name) {
            const query = await connection.query(`SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id WHERE LOWER(games.name) LIKE LOWER($1)`,[name+"%"]);
            return res.send(query.rows).status(200);
        }
        else {
            const query = await connection.query(`SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id`);
            return res.send(query.rows).status(200);
        }
    }
    catch(error) {
        return res.send(error).status(400);
    }
}

export async function insertGame(req, res) {
    const {name, image, stockTotal, categoryId, pricePerDay} = res.locals.game;
    try {
        const query = await connection.query('INSERT INTO games ("name","image","stockTotal","categoryId","pricePerDay") VALUES ($1, $2, $3, $4, $5)',[name, image, stockTotal, categoryId, pricePerDay]);
        return res.sendStatus(201);
    }
    catch(error) {
        return res.send(error).status(401);
    }
}