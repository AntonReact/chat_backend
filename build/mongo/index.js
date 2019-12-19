define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const { MongoClient } = require('mongodb');
    const uri = "mongodb+srv://root:root@test-orders-onzjk.gcp.mongodb.net/test?retryWrites=true&w=majority&connectTimeoutMS=100000&keepAlive=true&socketTimeoutMS=1000000";
    const mongoConfig = {
        connectTimeoutMS: 100000,
        socketTimeoutMS: 100000,
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    const client = new MongoClient(uri, mongoConfig);
    let DB;
    client.connect((err) => {
        if (err)
            console.error(err);
        else
            DB = client.db("chat");
    });
    function findUsers(find) {
        return DB.collection('users').find(find || {}).toArray();
    }
    async function getUsers(name) {
        if (!DB)
            return;
        const find = name && { name };
        const res = await findUsers(find);
        return res;
    }
    ;
    async function createUser(user) {
        if (!DB)
            return;
        user.id = Number(new Date());
        const users = await findUsers({ name: user.name });
        const res = users.length === 0 && await DB.collection('users').insertOne(user);
        return res && res.insertedCount && user;
    }
    async function handleLogin(input) {
        const user = await findUsers({ name: input.name });
        const isLogged = user.length !== 0 && user[0].password === input.password;
        return { isLogged };
    }
    async function updateUser(user) {
        if (!DB)
            return;
        const res = await DB.collection('users').replaceOne({ id: user.id }, { $set: user });
        return res.modifiedCount && user;
    }
    client.close();
    module.exports = { getUsers, createUser, updateUser, handleLogin };
});
