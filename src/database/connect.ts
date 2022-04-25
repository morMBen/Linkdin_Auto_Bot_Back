import mongoose from 'mongoose';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.resolve(__dirname, '../.env') });

export async function connectDb(): Promise<void> {
  try { 
    await mongoose.connect(`${process.env.MONGO_URI}`);
    const { host, name, port } = mongoose.connection;
    console.log("mongoose connection to atlas: ", { host, name, port })  
  } catch (error) {
    console.log("mongoose connect Error: ", error);
  }
}


export async function disconnectDb(): Promise<void> {
  try { 
    await mongoose.disconnect();
    const { host, name, port } = mongoose.connection;
    console.log("mongoose disconnected from atlas at: ", { host, name, port })  
  } catch (error) {
    console.log("mongoose disconnection Error: ", error);
  }
}

