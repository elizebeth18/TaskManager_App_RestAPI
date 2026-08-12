const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

app.use(express.json());

//registering the routes
app.use(userRouter);
app.use(taskRouter);


app.listen(3000, () => {
    console.log("Server is up and running in port 3000");
})