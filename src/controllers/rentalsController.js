import connection from "../database/database.js";

export async function listRentals(req, res) {
    try {
        const query = await connection.query('SELECT * FROM rentals');
        return res.send(query.rows).status(200);
    }
    catch(error) {
        return res.send(error).status(400);
    }
}
