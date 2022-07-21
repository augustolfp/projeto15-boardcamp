import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });