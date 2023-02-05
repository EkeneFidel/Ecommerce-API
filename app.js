const express = require("express");
const bodyParser = require("body-parser");

// custom imports
const db = require("./config/db.config");
const authRouter = require("./routes/auth.route");

db.connectToMongoDB();
require("dotenv").config();
require("./middlewares/auth.middleware");

PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRouter);
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
