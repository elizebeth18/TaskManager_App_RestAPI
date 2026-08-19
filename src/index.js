const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");


const app = express();

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled');
//     } else {
//         next();
//     }
// })


// app.use((req, res, next) => {
//     res.status(503).send("Site is currently down.Check back soon!!!");
// })

app.use(express.json());

//registering the routes
app.use(userRouter);
app.use(taskRouter);

//
// Without midddleware: new request -> run route handler
//
// With midddleware: new request -> do somthing -> run route handler
//

app.listen(3000, () => {
    console.log("Server is up and running in port 3000");
});

const Task = require('./models/tasks');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('6a84ad0c249e6ffce5ce7321');
    // const author = await task.populate('owner');
    // console.log(author);

    const user = await User.findById('6a84a3ff6272dd9e0d94175c');
    const tasks = await user.populate('tasks');
    console.log(user.tasks);
}

//main();