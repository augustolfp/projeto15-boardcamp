import { Router } from "express";
import { listRentals, insertRental, returnRental, deleteRental } from "../controllers/rentalsController.js";
import validateRental from "../middlewares/insertRentalMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get('/rentals', listRentals);
rentalsRouter.post('/rentals', validateRental, insertRental);
rentalsRouter.post('/rentals/:id/return', returnRental);
rentalsRouter.delete('/rentals/:id', deleteRental);

export default rentalsRouter;