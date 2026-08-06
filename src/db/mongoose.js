const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");
    console.log("Connected");
}

connectDB();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    }
});

const taskSchema = new mongoose.Schema({
    task: {
        type: String
    },
    completed: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);
const Task = mongoose.model("Task", taskSchema);

const user = new User({
    name: "Jackson",
    age: 25
});

const learnMongooseTask = new Task({
    task: "Learn Express",
    completed: false
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

savedUser();
