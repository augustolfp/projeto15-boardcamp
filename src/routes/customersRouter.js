import { Router } from "express";
import { listCustomers, insertCustomer, findCustomer, updateCustomer } from "../controllers/customersController.js";
import validateCustomer from '../middlewares/insertCustomerCheckMiddleware.js';
const customersRouter = Router();

customersRouter.get('/customers', listCustomers);
customersRouter.post('/customers', validateCustomer, insertCustomer);
customersRouter.get('/customers/:id', findCustomer);
customersRouter.put('/customers/:id', validateCustomer, updateCustomer);

export default customersRouter;