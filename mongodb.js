//CRUD - Create Read Update Delete

const { MongoClient, ObjectId } = require('mongodb');

//const MongoClient = mongodb.MongoClient;
const connectionURL = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(connectionURL);
const databaseName = "task-manager";

const startDBServer = async () => {
    await client.connect();
    console.log("MongoDB Connected!!")

    const db = client.db(databaseName); //creates a new DB using databaseName
    const users = db.collection('users'); //creates a collection
    const result = await users.insertOne({
        name: "Jisha",
        age: 32
    });

    const resultMany = await users.insertMany([{
        name: "Job",
        age: 22,
    },
    {
        name: "Jibu",
        age: 26,
    }]);

    // const tasks = db.collection("tasks");
    // const result = await tasks.insertMany([
    //     {
    //         description: "Buy groceries",
    //         completed: true,
    //     },
    //     {
    //         description: "Mopping house",
    //         completed: false,
    //     },
    //     {
    //         description: "Cooking dinner",
    //         completed: true
    //     }
    // ]);

    const user = await db.collection('users').findOne({
        _id: new ObjectId("6a72020c430a9d3aedfde87d")
    })

    const user1 = await db.collection("users").find({ name: "Ebin" }).limit(2).toArray();

    //console.log(user);

    //console.log(user1);

    const lastTask = await db.collection("tasks").findOne({
        _id: new ObjectId("6a721a6733cb6d468808881b")
    });

    console.log(lastTask);

    const inCompletedTasks = await db.collection("tasks").find({ completed: false }).limit(5).toArray();

    //console.log("Incompleted Tasks :", inCompletedTasks);

    // const result = await db.collection("users").updateOne({ _id: new ObjectId("6a72020c430a9d3aedfde87d") }, {
    //     $set: {
    //         name: "Shwetha"
    //     }
    // });

    const setTaskCompleted = await db.collection("tasks")
        .updateMany({ completed: false }, {
            $set: {
                completed: true
            }
        });

    const deleteUsers = await db.collection("users").deleteMany({
        name: 'Jibu'
    })
    
    const deleteUser = await db.collection("users").deleteOne({
        _id: new ObjectId("6a7330de48a0a8abca772ba6")
    })

    console.log(deleteUsers)
}

//startDBServer();