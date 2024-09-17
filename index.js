import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";  // Import MongoDB client

import roomRouter from "./Routers/rooms.router.js";
import bookingRouter from "./Routers/booking.router.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
/ Define a route for the root URL ("/")
app.get("/", (req, res) => {
  res.status(200).send(
    `<div style="display:flex;flex-direction:column;justify-content:center;align-items:center">
      <h1>Welcome to the Room Booking API</h1>
      <p>Create a room: <b>"/rooms/createroom"</b></p>
      <p>Get all rooms: <b>"/rooms/getrooms"</b></p>
      <p>Book a room: <b>"/bookings/bookroom"</b></p>
      <p>List all customers with bookings: <b>"/bookings/customers"</b></p>
    </div>`
  );
});





// Replace <username>, <password>, <dbname> with your MongoDB Atlas credentials
const uri = process.env.MONGO_URI || "mongodb+srv://dhanamveera:dhana123@cluster0.g123d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB and start the server
client.connect()
  .then(() => {
    console.log("Connected to MongoDB");

    // Add MongoDB client to request object (middleware)
    app.use((req, res, next) => {
      req.dbClient = client;
      req.db = client.db("<dbname>");  // Replace <dbname> with your database name
      next();
    });

    // Add your routers after the database connection
    app.use("/rooms", roomRouter);
    app.use("/bookings", bookingRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
