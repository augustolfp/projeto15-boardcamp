import connection from "../database/database.js";

export default async function validateCategory(req, res, next) {
    const {name} = req.body;
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