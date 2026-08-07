const mongoose = require('mongoose');
const validator = require('validator');

const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");
    console.log("Connected");
}

connectDB();

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
        validate: (value)=>{
            if(value.toLowerCase().includes("password")){
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

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: String,
        default: false,
    }
});

const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);

// const user = new User({
//     name: "        Jenny     ",
//     email: " MEMAIL@ME.COM      ",
//     age: 45,
//     password: "Jenn@123"
// });

const learnMongooseTask = new Task({
    task: "Drawing",
});

const savedTask = async () => {
    try {
        const data = await learnMongooseTask.save();
        console.log("Success! Saved document:", data);
    } catch (error) {
        console.error("Database save failed:", error.message);
    }
}

savedTask();


const savedUser = async () => {
    try {
        const data = await user.save();
        console.log("Success! Saved document:", data);
    } catch (error) {
        console.error("Database save failed:", error.message);
    }
}

//savedUser();
