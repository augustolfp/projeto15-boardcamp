import connection from "../database/database.js";
import {customerSchema} from '../schemas/customerSchema.js';

export default async function validateCustomer(req, res, next) {
    const customer = req.body;
    const validation = customerSchema.validate(customer);

    if(validation.error) {
        console.log(validation.error.details);
        return res.sendStatus(400);
    }

    try {
        const cpfAlreadyExists = await connection.query(`SELECT EXISTS (SELECT 1 FROM customers WHERE cpf = $1)`,[customer.cpf]);
        if(cpfAlreadyExists.rows[0].exists) {
            console.log("CPF já existe!");
            return res.sendStatus(409);
        }

        res.locals.customer = customer;
        next();
    }
    catch(error) {
        return res.send(error);
    }
}