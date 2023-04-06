import { MongoClient } from 'mongodb';


const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dairy';

export const client = new MongoClient(MONGO_URI);

export const db = client.db();
