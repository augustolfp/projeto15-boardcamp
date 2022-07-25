import connection from "../database/database.js";
import dayjs from "dayjs";

export async function listRentals(req, res) {
    try {
        const query = await connection.query('SELECT * FROM rentals');
        return res.send(query.rows).status(200);
    }
    catch(error) {
        return res.send(error).status(400);
    }
}

export async function insertRental(req, res) {
    const {customerId, gameId, daysRented} = req.body;
    const rentDate = dayjs().format('YYYY-MM-DD');
    const returnDate = null;
    const delayFee = null;
    try {
        const rentedGame = await connection.query(`SELECT * FROM games WHERE id = $1`,[gameId]);
        const originalPrice = daysRented*rentedGame.rows[0].pricePerDay;
        const query = await connection.query(`INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES ($1,$2,$3,$4,$5,$6,$7)`,[customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee]);
        return res.sendStatus(201);
    }
    catch(error) {
        return res.send(error);
    }
}

export async function returnRental(req, res) {
    const id = parseInt(req.params.id);
    const returnDate = dayjs().format('YYYY-MM-DD');

    try {
        const returningRental = await connection.query(`SELECT * FROM rentals WHERE id = $1`,[id]);
        const rentDate = dayjs(returningRental.rows[0].rentDate).format('YYYY-MM-DD');
        const lateDays = dayjs().diff(rentDate, 'day');
        const query = await connection.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`,[returnDate,0,id]);
        return res.sendStatus(200);
    }
    catch(error) {
        return res.send(error);
    }
}