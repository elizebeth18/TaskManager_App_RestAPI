const express = require('express');
const router = new express.Router();

const Task = require('../models/tasks');
const auth = require('../middleware/auth');
const User = require('../models/user');



router.post("/tasks", auth, async (req, res, next) => {
    //const task = new Task(req.body);

    const task = new Task({ ...req.body, owner: req.user._id })

    try {
        const savedTask = await task.save();

        res.status(201).send(savedTask);

    } catch (err) {
        res.status(400).send(err)
    }
});

//GET /tasks?completed=true
//GET /tasks?limit=10&skip=0
//GET /tasks?sortBy=createdAt:asc
router.get("/tasks", auth, async (req, res, next) => {

    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed  = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'asc' ? 1 : -1
    }

    try {
        //const result = await Task.find({ owner: req.user._id });
        const user = await User.findById(req.user._id);

        const result = await user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort,
            }
        });

        res.status(200).send(result.tasks);

    } catch (error) {
        res.status(500).send(error);
    }

});

router.get("/tasks/:id", auth, async (req, res, next) => {

    const _id = req.params.id;

    try {

        const result = await Task.findOne({ _id, owner: req.user._id }).exec();

        if (!result) {
            return res.status(404).send({ message: "Task not found" })
        }

        res.status(200).send(result);

    } catch (error) {
        res.status(500).send(error)
    }
});

router.patch("/tasks/:id", auth, async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['task', 'completed'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates" });
    }

    try {
        // const task = await Task.findByIdAndUpdate(
        //     req.params.id,
        //     req.body,
        //     {
        //         new: true,
        //         runValidators: true
        //     }
        // );

        //const task = await Task.findById(req.params.id);

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });


        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            return task[update] = req.body[update];
        })

        await task.save();
        res.send(task);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/tasks/:id", auth, async (req, res, next) => {
    try {

        const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!deletedTask) {
            return res.status(404).send({ error: "Task not found" })
        }
        res.send(deletedTask);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;