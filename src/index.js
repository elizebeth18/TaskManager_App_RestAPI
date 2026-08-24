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
    dest: 'images',
    limits: {
        fileSize: 1000000,

    },
    fileFilter: (req, file, cb) => {

        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word Document'));
            //return cb(new Error('File must be a PDF'))
        }

        cb(undefined, true);
    }
});

app.post('/upload', upload.single('image'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
});


//
// Without midddleware: new request -> run route handler
//
// With midddleware: new request -> do somthing -> run route handler
//

app.listen(3000, () => {
    console.log("Server is up and running in port 3000");
});