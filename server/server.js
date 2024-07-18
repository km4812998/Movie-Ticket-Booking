const express = require('express');
const path = require('path');

const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

app.use(express.json());

const userRoute = require("./routes/userRoute");
const moviesRoute = require("./routes/moviesRoute");
const theatresRoute = require("./routes/theatresRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use("/api/users", userRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/theatres", theatresRoute);
app.use("/api/bookings", bookingsRoute);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Node JS server is running on port ${port}`));
