require("dotenv/config");
const express = require("express");
const config = require("../config");
const app = express()
const userRuote = require("./routes/user.route")

app.use(express.json())
app.use("/api/users", userRuote)

app.listen(config.port, () => {
    console.log(`Server running on PORT: ${config.port}`);
})