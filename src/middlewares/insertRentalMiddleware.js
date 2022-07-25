import connection from "../database/database.js";
import { rentalSchema } from "../schemas/rentalSchema.js";

export default async function validateRental(req, res, next) {
    const rental = req.body;
    const validation = rentalSchema.validate(rental);

    if(validation.error) {
        console.log(validation.error.details);
        return res.sendStatus(400);
    }

    try {
        const gameExists = await connection.query(`SELECT EXISTS (SELECT 1 FROM games WHERE id = $1)`,[rental.gameId]);
        const customerExists = await connection.query(`SELECT EXISTS (SELECT 1 FROM customers WHERE id = $1)`,[rental.customerId]);
        if(!gameExists.rows[0].exists || !customerExists.rows[0].exists) {
            console.log("Cliente e/ou jogo não existem!");
            return res.sendStatus(400);
        }

        res.locals.rental = rental;
        next();
    }
    catch(error) {
        return res.send(error);
    }
}