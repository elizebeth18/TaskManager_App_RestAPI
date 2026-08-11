const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require('./models/tasks');

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

app.get("/users", (req, res, next) => {
    User.find({}).then((users) => {
        res.status(200).send(users);
    }).catch((error) => {
        res.status(500).send();
    })
});

app.get("/users/:id", (req, res, next) => {

    const _id = req.params.id;

    User.findById(_id).exec().then((result) => {

        if (!result) {
            return res.status(404).send({ message: "User not found" })
        }

        res.status(200).send(result);

    }).catch((error) => {
        res.status(500).send(error);
    });
})

app.post("/tasks", (req, res, next) => {

    const task = new Task(req.body);

    task.save().then((savedTask) => {
        res.status(201).send(savedTask)
    }).catch((err) => {
        res.status(400).send(err)
    })
});

app.get("/tasks", (req, res, next) => {

    Task.find({}).then((result) => {
        res.status(200).send(result)
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get("/tasks/:id", (req, res, next) => {

    const _id = req.params.id;

    Task.findById(_id).exec().then((result) => {

        if(!result){
            return res.status(404).send({ message: "Task not found" })
        }

        res.status(200).send(result);
    }).catch((error) => {
        res.send(error)
    })
});

app.listen(3000, () => {
    console.log("Server is up and running in port 3000");
})