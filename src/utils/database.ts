import { Db, MongoClient } from 'mongodb';

type ConnectType = {
  db: Db,
  client: MongoClient
}

const client = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log(client);

export default async function connect():Promise<ConnectType> {
  if(!client.isConnected()) await client.connect();

  const db = client.db("podcastr");
  return {db, client}
}