import {
  DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery,
} from 'mongoose';
import ProfileModel, { ProfileDocument } from '../models/profile.model';

export async function addProfile(
  data: DocumentDefinition<ProfileDocument>
) {
  try {
    const newModel = await ProfileModel.insertMany(data);
    return;
  } catch (error) {
    throw '';
  }  
}

export async function getAllProfiles() {
  return ProfileModel.find({}).lean();
}

export async function updateProfile(
  query: FilterQuery<ProfileDocument>,
  update: UpdateQuery<ProfileDocument>,
  options: QueryOptions = { new: true },
) {
  return ProfileModel.findOneAndUpdate(query, update, options);
}


export async function deleteProfile(
  query: FilterQuery<ProfileDocument>,
  options: QueryOptions = { projection: 'email' }) {
  return ProfileModel.findOneAndRemove(query, options);
}
