const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middleware/error");

// Config
dotenv.config({ path: "server/config/.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

//Route Imports
const product = require("./routes/product.Routes");
const user = require("./routes/user.Routes");
const order = require("./routes/order.Routes");
const payment = require("./routes/payment.Routes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
