import connection from "../database/database.js";

export async function listCategories(req, res) {
    try {
        const query = await connection.query('SELECT * FROM categories');
        return res.send(query.rows).status(200);
    }
    catch(error) {
        return res.send(error).status(400);
    }
}

export async function insertCategory(req, res) {
    const name = res.locals.name;
    try {
        const query = await connection.query('INSERT INTO categories ("name") VALUES ($1)',[name]);
        return res.sendStatus(201);
    }
    catch(error) {
        return res.send(error).status(401);
    }
}