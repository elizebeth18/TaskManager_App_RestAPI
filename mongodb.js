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
    // const result = await users.insertOne({
    //     name: "Jisha",
    //     age: 32
    // });

    // const result = await users.insertMany([{
    //     name: "Job",
    //     age: 22,
    // },
    // {
    //     name: "Jibu",
    //     age: 26,
    // }]);

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

    const user1 = await db.collection("users").findOne({name: "Ebin"});
    
    console.log(user);

    console.log(user1);

    //await client.close();
}

startDBServer();