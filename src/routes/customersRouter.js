import { Router } from "express";
import { listCustomers, insertCustomer, findCustomer } from "../controllers/customersController.js";
import validateCustomer from '../middlewares/insertCustomerCheckMiddleware.js';
const customersRouter = Router();

customersRouter.get('/customers', listCustomers);
customersRouter.post('/customers', validateCustomer, insertCustomer);
customersRouter.get('/customers/:id', findCustomer);

export default customersRouter;