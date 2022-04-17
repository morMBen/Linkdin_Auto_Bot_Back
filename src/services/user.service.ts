import { DocumentDefinition, FilterQuery } from 'mongoose';
import UserModel, { I_UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt';

export async function register(user: DocumentDefinition<I_UserDocument>): Promise<void> {
  try {
    //optional to set hashing here and remove from models
    await UserModel.create(user);
  } catch (error) {
    throw error;
  }
}

export async function findOne(user: DocumentDefinition<I_UserDocument>) {
  try {
    //hashing happens in service
    const foundUser = await UserModel.findOne({ name: user.name });
    if (foundUser !== null) {
      const isMatch = bcrypt.compareSync(user.password, foundUser.password);
      return isMatch ? foundUser : 'Password is not correct';
    } else {
      return 'Name of user is not correct';
    }
  } catch (error) {
    throw error;
  }
}
