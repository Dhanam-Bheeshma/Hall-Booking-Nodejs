import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";  // Import MongoDB client

import roomRouter from "./Routers/rooms.router.js";
import bookingRouter from "./Routers/booking.router.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// Replace <username>, <password>, <dbname> with your MongoDB Atlas credentials
const uri = process.env.MONGO_URI || "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority";

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
