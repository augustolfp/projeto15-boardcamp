import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const { Pool } = pg;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
  });


app.get('/games', async (req, res) => {
    try {
        const query = await connection.query('SELECT * FROM games');
        return res.send(query.rows).status(200);
    }
    catch(error) {
        return res.send(error).status(400);
    }
});

app.post('/games', async (req, res) => {
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;
    try {
        const query = await connection.query('INSERT INTO games ("name","image","stockTotal","categoryId","pricePerDay") VALUES ($1, $2, $3, $4, $5)',[name, image, stockTotal, categoryId, pricePerDay]);
        return res.sendStatus(201);
    }
    catch(error) {
        return res.send(error).status(401);
    }
});



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });