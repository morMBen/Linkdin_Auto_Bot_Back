import { DocumentDefinition, FilterQuery } from 'mongoose';
import UserModel, { I_UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../middleware/auth';

export async function register(user: DocumentDefinition<I_UserDocument>): Promise<void> {
  try {
    //optional to set hashing here and remove from models
    await UserModel.create(user);
  } catch (error) {
    throw error;
  }
}

export async function login(user: DocumentDefinition<I_UserDocument>) {
  try {
    //hashing comparing happens in service
    const foundUser = await UserModel.findOne({ name: user.name });

    if (foundUser !== null) {
      const isMatch = bcrypt.compareSync(user.password, foundUser.password);

      if (isMatch) {
        const token = jwt.sign({ _id: foundUser._id?.toString() }, SECRET_KEY, { expiresIn: '2 days' });
        //check if token is unique - unique is models doesnt work
        foundUser.tokens = foundUser.tokens.concat({ token });
        await foundUser.save();
        return { user: foundUser, token: token };
      } else {
        return 'Password is not correct';
      }
    }
    return 'Name of user is not correct';
  } catch (error) {
    throw error;
  }
}

export async function findOne(user: DocumentDefinition<I_UserDocument>) {
  try {
    const foundUser = await UserModel.findOne({ name: user.name });
    return foundUser;
  } catch (error) {
    throw error;
  }
}
