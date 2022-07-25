import { Router } from "express";
import { listRentals, insertRental } from "../controllers/rentalsController.js";

const rentalsRouter = Router();

rentalsRouter.get('/rentals', listRentals);
rentalsRouter.post('/rentals', insertRental);

export default rentalsRouter;