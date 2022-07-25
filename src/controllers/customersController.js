import connection from "../database/database.js";

export async function listCustomers(req, res) {
    const cpf = req.query.cpf;
    try {
        if(cpf) {
            const query = await connection.query(`SELECT * FROM customers WHERE cpf LIKE $1`,[cpf+"%"]);
            return res.send(query.rows).status(200);
        }
        else {
            const query = await connection.query('SELECT * FROM customers');
            return res.send(query.rows).status(200);
        }
    }
    catch(error) {
        return res.send(error).status(400);
    }
}

export async function findCustomer(req, res) {
    const id = req.params.id;
    try {
        const query = await connection.query(`SELECT * FROM customers WHERE id = $1 `,[id]);
        
        if(query.rows.length === 0) {
            return res.sendStatus(404);
        }

        return res.send(query.rows).status(200);
    }
    catch(error) {
        res.send(error).status(400);
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