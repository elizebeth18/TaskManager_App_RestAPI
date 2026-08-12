require("../src/db/mongoose");
const User = require("../src/models/user");

User.findByIdAndUpdate('6a746d659311222e7f23cef3', { age: 1 }).then((result) => {
    console.log("result==>",result);
    return User.countDocuments({age: 1});
}).then((result2) => {
    console.log("result2===>",result2)
}).catch((e)=>{
    console.log(e)
})