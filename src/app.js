require("dotenv/config");
const express = require("express");
const config = require("../config");
const app = express()
const authRuote = require("./routes/auth.route")

app.use(express.json())

app.use("/api", authRuote);

app.listen(config.port, () => {
    console.log(`Server running on PORT: ${config.port}`);
})