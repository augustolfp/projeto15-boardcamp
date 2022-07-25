import { Router } from "express";
import { listCustomers, insertCustomer, findCustomer } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get('/customers', listCustomers);
customersRouter.post('/customers', insertCustomer);
customersRouter.get('/customers/:id', findCustomer);

export default customersRouter;