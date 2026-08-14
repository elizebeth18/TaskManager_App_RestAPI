const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const User = require("../models/user");

const jwt = require('jsonwebtoken');

router.post("/users", async (req, res, next) => {

    try {
        const user = new User(req.body);

        // Explicitly wait for the database to complete the save operation
        const savedUser = await user.save();

        const token = await savedUser.generateAuthToken()

        // Respond with an appropriate HTTP status code
        res.status(201).send({ savedUser, token });
        
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
});

router.post("/users/login", async (req, res, next) => {
    try {
        //User.findByCredentials is a user-defined method
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();



        res.send({ user, token });

    } catch (error) {
        res.status(400).send();
    }
});

router.get("/users", auth, async (req, res, next) => {

    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (e) {
        res.status(500).send();
    }

});

router.get("/users/:id", async (req, res, next) => {

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

router.patch("/users/:id", async (req, res, next) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates" });
    }

    try {
        // const user = await User.findByIdAndUpdate(
        //     req.params.id,
        //     req.body,
        //     {
        //         new: true,
        //         runValidators: true
        //     }
        // );

        const user = await User.findById(req.params.id);

        updates.forEach((update) => {
            return user[update] = req.body[update];
        });

        await user.save();

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/users/:id", async (req, res, next) => {
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

module.exports = router;