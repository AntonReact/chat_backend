export {};
const { MongoClient } = require('mongodb');

const uri: String = "mongodb+srv://root:root@test-orders-onzjk.gcp.mongodb.net/test?retryWrites=true&w=majority&connectTimeoutMS=100000&keepAlive=true&socketTimeoutMS=1000000";

interface MongoConfig {
  connectTimeoutMS: Number
  socketTimeoutMS: Number
  keepAlive: Boolean
  useNewUrlParser: Boolean
  useUnifiedTopology:Boolean
}

interface User {
  id?: Number
  name?: String
  password?: String
}

const mongoConfig:MongoConfig = {
  connectTimeoutMS: 100000,
  socketTimeoutMS: 100000,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const client:any = new MongoClient(uri, mongoConfig);

let DB:any;

client.connect((err: any) => {
  if (err) console.error(err)
    else DB = client.db("chat");
});

function findUsers(find: Object):Array<Object> {
  return DB.collection('users').find(find || {}).toArray();
}

async function getUsers(name: String):Promise<any[]> {
  if (!DB) return;

  const find: undefined | Object = name && { name };
  const res:any[] = await findUsers(find);

  return res;
};

async function createUser(user: User):Promise<User | undefined> {
  if (!DB) return;

  user.id = Number(new Date());

  const users = await findUsers({ name: user.name });
  const res = users.length === 0 && await DB.collection('users').insertOne(user);

  return res && res.insertedCount && user;
}

async function handleLogin(input: User):Promise<{ isLogged: Boolean }> {
  const user: Array<User> = await findUsers({ name: input.name });
  const isLogged: Boolean = user.length !== 0 && user[0].password === input.password;

  return { isLogged };
}

async function updateUser(user: User):Promise<any> {
  if (!DB) return;

  const res = await DB.collection('users').replaceOne({ id: user.id }, { $set: user });

  return res.modifiedCount && user;
}

client.close();

module.exports = { getUsers, createUser, updateUser, handleLogin };