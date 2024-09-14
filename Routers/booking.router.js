import express from "express";
import { bookroom, getBookedRooms, getCustomerBookings, getCustomers } from "../Controllers/booking.controller.js";

const router = express.Router();

router.post("/bookroom", bookroom);
router.get('/bookedrooms', getBookedRooms);
router.get('/customers', getCustomers);
router.get('/customerbookings/:id', getCustomerBookings);

export default router;