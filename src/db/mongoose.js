const mongoose = require('mongoose');
const validator = require('validator');

const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");
    console.log("Connected");
}

connectDB();



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
const Task = mongoose.model("Task", taskSchema);


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

//savedTask();

// const user = new User({
//     name: "        Jenny     ",
//     email: " MEMAIL@ME.COM      ",
//     age: 45,
//     password: "Jenn@123"
// });

const savedUser = async () => {
    try {
        const data = await user.save();
        console.log("Success! Saved document:", data);
    } catch (error) {
        console.error("Database save failed:", error.message);
    }
}

//savedUser();
