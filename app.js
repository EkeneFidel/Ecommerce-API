const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// custom imports
const db = require("./config/db.config");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const brandRouter = require("./routes/brand.routes");
const categoryRouter = require("./routes/category.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");

db.connectToMongoDB();
require("dotenv").config();
require("./middlewares/auth.middleware");

PORT = process.env.PORT;
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/brands", brandRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.get("/api/v1/", (req, res) => {
    res.send("Ecom Api Sweet!");
});
app.get("/", (req, res) => {
    res.send("Ecom Api Sweet!");
});

// Handle errors.
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = app;
