import {
  DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery,
} from 'mongoose';
import ProfileModel, { ProfileDocument } from '../models/profile.model';

export async function addProfiles(data: DocumentDefinition<ProfileDocument[]>): Promise<void> {
  try {
    await ProfileModel.insertMany(data);
  } catch (error) {
    throw error;
  }  
}

export async function getProfiles() {
  return await ProfileModel.find({});
}

export async function updateProfile(
  query: FilterQuery<ProfileDocument>,
  update: UpdateQuery<ProfileDocument>,
  options: QueryOptions = { new: true },
) {
  return await ProfileModel.findOneAndUpdate(query, update, options);
}


export async function deleteProfile(
  query: FilterQuery<ProfileDocument>,
  options: QueryOptions = { projection: 'profileLink' }
) {
  return await ProfileModel.findOneAndRemove(query, options);
}
