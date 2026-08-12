const express = require('express');
const router = new express.Router();
const Task = require('../models/tasks');

router.post("/tasks", async (req, res, next) => {

    try {
        const task = new Task(req.body);
        const savedTask = await task.save();

        res.status(201).send(savedTask);

    } catch (err) {
        res.status(400).send(err)
    }
});

router.get("/tasks", (req, res, next) => {

    Task.find({}).then((result) => {
        res.status(200).send(result)
    }).catch((error) => {
        res.status(500).send(error);
    });
});

router.get("/tasks/:id", async (req, res, next) => {
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

router.patch("/tasks/:id", async (req, res, next) => {
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

router.delete("/tasks/:id", async (req, res, next) => {
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

module.exports = router;