import connection from "../database/database.js";

export default async function validateReturnRental(req, res, next) {
    const id = parseInt(req.params.id);

    try {
        const rentalExists = await connection.query(`SELECT EXISTS (SELECT 1 FROM rentals WHERE id = $1)`,[id]);

        if(!rentalExists.rows[0].exists) {
            console.log("Esse Id de aluguel não existe!");
            return res.sendStatus(404);
        }

        const alreadyReturned = await connection.query(`SELECT * FROM rentals WHERE id = $1`,[id]);

        if(alreadyReturned.rows[0].returnDate) {
            console.log("já foi devolvido!");
            return res.sendStatus(400);
        }
        next();
    }
    catch(error) {
        return res.send(error);
    }
}