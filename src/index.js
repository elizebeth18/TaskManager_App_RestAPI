const express = require("express");

const app = express();

app.post("/users", (req, res, next) => {
    res.send("Testing!!!")
})

app.listen(3000, () => {
    console.log("Server is up and running in port 3000");
})