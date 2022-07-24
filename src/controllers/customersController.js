import connection from "../database/database.js";

export async function listCustomers(req, res) {
    try {
        const query = await connection.query('SELECT * FROM customers');
        return res.send(query.rows).status(200);
    }
    catch(error) {
        return res.send(error).status(400);
    }
}

export async function insertCustomer(req, res) {
    const {name, phone, cpf, birthday} = req.body;
    try {
        const query = await connection.query('INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1, $2, $3, $4)',[name,phone,cpf,birthday]);
        return res.sendStatus(201);
    }
    catch(error) {
        return res.send(error).status(401);
    }
}