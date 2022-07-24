import connection from "../database/database.js";

export async function listGames(req, res) {
    try {
        const query = await connection.query('SELECT * FROM games');
        return res.send(query.rows).status(200);
    }
    catch(error) {
        return res.send(error).status(400);
    }
}

export async function insertGame(req, res) {
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;
    try {
        const query = await connection.query('INSERT INTO games ("name","image","stockTotal","categoryId","pricePerDay") VALUES ($1, $2, $3, $4, $5)',[name, image, stockTotal, categoryId, pricePerDay]);
        return res.sendStatus(201);
    }
    catch(error) {
        return res.send(error).status(401);
    }
}