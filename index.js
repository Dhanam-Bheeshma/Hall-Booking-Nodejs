import express from "express";
import cors from "cors";
import roomRouter from "./Routers/rooms.router.js";
import bookingRouter from "./Routers/booking.router.js";

const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send(
    `<div style="display:flex;flex-direction:column;justify-content:center;align-items:center">
      <h1>API Guide</h1>
      <p>Create a room : <b>"/rooms/createroom"</b></p>
      <p>Get all rooms : <b>"/rooms/getrooms"</b></p>
      <p>Book a room: <b>"/bookings/bookroom"</b></p>
      <p>List all rooms with booked data: <b>"/bookings/bookroom"</b></p>
      <p>List all customers with booked data: <b>"/bookings/customers"</b></p>
      <p>List how many times a customer booked room: <b>"/bookings/customerBookings/"</b></p>
      <p>API DOCUMENTATION URL : <a href="https://documenter.getpostman.com/view/36384038/2sA3kSo3QN" target="_blank">Click here</a></p>
    </div>`
  );
});

app.use("/rooms", roomRouter);
app.use("/bookings", bookingRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});