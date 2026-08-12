const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address");
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate: (value) => {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain password')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate: {
            validator: (value) => {
                if (value < 0) {
                    throw new Error('Age must be a positive number')
                }
            }
        }
    }
});


//Mongoose pre('save') middleware used to hash the password before saving the user
userSchema.pre('save', async function (next) {
    const user = this;

    //this runs both when user is created or when user's password is modified
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    console.log("just before saving!!");

    //next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;