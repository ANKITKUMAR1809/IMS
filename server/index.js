require("dotenv").config()
const express = require("express");
const cors = require('cors') 
const app = express();
const authRoute = require('./routers/auth-route')
const stockRoute = require('./routers/stock-route')
const sellRoute= require('./routers/sell-route')
const connectDb = require("./utils/db")

// cors for 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });


app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/stock",stockRoute)
app.use("/api/sell",sellRoute)

const PORT =process.env.PORT||5000;
// connectDb is promise then it will use .then 
connectDb().then(() => {
    // on which port app will run 
    app.listen(PORT, () => {
        console.log(`The server port is:${PORT}`)
    })
})