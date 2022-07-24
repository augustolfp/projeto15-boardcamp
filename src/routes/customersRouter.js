import { Router } from "express";
import { listCustomers, insertCustomer } from "../controllers/customersController.js";

const customersRouter = Router();

customersRouter.get('/customers', listCustomers);
customersRouter.post('/customers', insertCustomer);

export default customersRouter;