require("dotenv").config()
const express = require("express");
const cors = require('cors') 
const app = express();
const authRoute = require('./routers/auth-route')
const stockRoute = require('./routers/stock-route')
const sellRoute= require('./routers/sell-route')
const connectDb = require("./utils/db")

// cors for 
const corsOptions = {
    origin: "https://ims-sak.vercel.app/",
    methods: "GET, POST, PUT, PATCH, DELETE,HEAD",
    credentials: true,
};


app.use(cors(corsOptions))


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