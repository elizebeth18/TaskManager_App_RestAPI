const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require('./models/tasks');

const app = express();

app.use(express.json());

app.post("/users", async (req, res, next) => {

    try {
        const user = new User(req.body);

        // Explicitly wait for the database to complete the save operation
        const savedUser = await user.save();

        // Respond with an appropriate HTTP status code
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(400).send(error)
    }
});

app.get("/users", async (req, res, next) => {

    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send();
    }

});

app.get("/users/:id", async (req, res, next) => {

    try {

        const _id = req.params.id;
        const result = await User.findById(_id).exec();

        if (!result) {
            return res.status(404).send({ message: "User not found" })
        }

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }

});

app.patch("/users/:id", async (req, res, next) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates" });
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);

    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete("/users/:id", async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send({ error: "User not found" })
        }

        res.send(deletedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/tasks", async (req, res, next) => {

    try {
        const task = new Task(req.body);
        const savedTask = await task.save();

        res.status(201).send(savedTask);

    } catch (err) {
        res.status(400).send(err)
    }
});

app.get("/tasks", (req, res, next) => {

    Task.find({}).then((result) => {
        res.status(200).send(result)
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get("/tasks/:id", async (req, res, next) => {
    try {
        const _id = req.params.id;

        const result = await Task.findById(_id).exec();

        if (!result) {
            return res.status(404).send({ message: "Task not found" })
        }

        res.status(200).send(result);

    } catch (error) {
        res.status(500).send(error)
    }
});

app.patch("/tasks/:id", async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['task', 'completed'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates" });
    }

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);

    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete("/tasks/:id", async (req, res, next) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).send({ error: "Task not found" })
        }
        res.send(deletedTask);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log("Server is up and running in port 3000");
})