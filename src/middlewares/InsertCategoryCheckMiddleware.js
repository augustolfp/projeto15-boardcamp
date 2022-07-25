import connection from "../database/database.js";
import {categorySchema} from '../schemas/categorySchema.js';

export default async function validateCategory(req, res, next) {
    const {name} = req.body;
    const validation = categorySchema.validate({name});

    if(validation.error) {
        console.log(validation.error.details);
        return res.sendStatus(400);
    }
    
    try {
        const categoryAlreadyExists = await connection.query(`SELECT EXISTS (SELECT 1 FROM categories WHERE name = $1)`,[name]);
        if(categoryAlreadyExists.rows[0].exists) {
            console.log("Categoria já existe!");
            return res.sendStatus(409);
        }
    
        res.locals.name = name;
        next();
    }
    catch(error) {
        return res.send(error);
    }
}