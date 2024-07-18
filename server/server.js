const express = require('express');

const app = express();
require("dotenv").config();
const dbConfig=require("./config/dbConfig");

app.use(express.json());
const userRoute=require("./routes/userRoute");
const moviesRoute = require("./routes/moviesRoute");
const theatresRoute = require("./routes/theatresRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/users", userRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/theatres", theatresRoute);
app.use("/api/bookings", bookingsRoute);

const port = process.env.PORT || 5000;
//km4812998 P1EkMR2XnQWhs2Ky
app.listen(port,()=>console.log(`Node JS server is running on port ${port}`));