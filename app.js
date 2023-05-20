const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/conn");
const router = require("./Routes/router");

//dotenv config
dotenv.config();

//db connection
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use(router);

//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const port = process.env.PORT || 8080;
//listen port
app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_MODE} mode on port ${port}`.bgCyan
      .white
  );
});
