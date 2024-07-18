const express = require('express');
const path=require('path');

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

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/client/build")));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API is running..");
    });
  }

const port = process.env.PORT || 5000;
//km4812998 P1EkMR2XnQWhs2Ky
app.listen(port,()=>console.log(`Node JS server is running on port ${port}`));