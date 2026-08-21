const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const User = require("../models/user");

const jwt = require('jsonwebtoken');

const multer = require('multer');


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

router.post("/users/logout", auth, async (req, res, next) => {
    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save();

        res.send("Logout Succesful");

    } catch (error) {
        res.status(500).send();
    }
});

router.post("/users/logoutAll", auth, async (req, res, next) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send("Successfully logged out from all devices");
    } catch (error) {
        res.status(500).send();
    }
})

router.get("/users/me", auth, async (req, res, next) => {
    res.send(req.user);
});


router.patch("/users/me", auth, async (req, res, next) => {

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

        // const user = await User.findById(req.params.id);
        const user = req.user;

        updates.forEach((update) => {
            return user[update] = req.body[update];
        });

        await user.save();

        // if (!user) {
        //     return res.status(404).send();
        // }

        res.send(user);

    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/users/me", auth, async (req, res, next) => {

    try {
        const deletedUser = await req.user.deleteOne();
        // if (!deletedUser) {
        //     return res.status(404).send({ error: "User not found" })
        // }
        res.send(deletedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

const upload = multer({
    dest: 'avatars/'
});

router.post("/users/me/avatar", upload.single('avatar'),(req, res) => {
    res.send();
})

module.exports = router;