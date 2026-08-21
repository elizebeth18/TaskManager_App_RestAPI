const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();


app.use(express.json());

//registering the routes
app.use(userRouter);
app.use(taskRouter);

const multer = require('multer');

const upload = multer({
    dest: 'images'
});

app.post('/upload', upload.single('image'), (req, res) => {
    res.send();
});


//
// Without midddleware: new request -> run route handler
//
// With midddleware: new request -> do somthing -> run route handler
//

app.listen(3000, () => {
    console.log("Server is up and running in port 3000");
});