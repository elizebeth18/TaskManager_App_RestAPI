const express = require("express");
require("./db/mongoose");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/users", (req, res, next) => {

    const user = new User(req.body);
    
    // Explicitly wait for the database to complete the save operation
    user.save().then((savedUser) => {
        // Respond with an appropriate HTTP status code
        res.status(201).send(savedUser);
    })
    .catch((error) => {
            res.status(400).send(error)
        });

});

app.listen(3000, () => {
    console.log("Server is up and running in port 3000");
})