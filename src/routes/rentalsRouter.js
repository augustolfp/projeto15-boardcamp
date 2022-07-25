import { Router } from "express";
import { listRentals, insertRental } from "../controllers/rentalsController.js";
import validateRental from "../middlewares/insertRentalMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get('/rentals', listRentals);
rentalsRouter.post('/rentals', validateRental, insertRental);

export default rentalsRouter;