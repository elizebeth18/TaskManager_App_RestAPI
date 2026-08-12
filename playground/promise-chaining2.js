require("../src/db/mongoose");
const Task = require("../src/models/tasks");

// Task.findByIdAndDelete("6a7ac1295e1892542a033ee7").then((deletedTask) => {
//     console.log("result===>", deletedTask);
//     return Task.countDocuments({ completed: false })
// }).then((result2) => {
//     console.log("result2===>", result2)
// }).catch((error) => {
//     console.error(error)
// });

const deleteTaskandCount = async (id) => {
    const deleteTask = await Task.findByIdAndDelete(id);
    const incompletedTaskCount = await Task.countDocuments({ completed: false });

    return incompletedTaskCount;
}

deleteTaskandCount("6a7ac239f2e08a8a55147f7e").then((result) => {
    console.log("result===>", result);
}).catch((error) => {
    console.error(error)
})