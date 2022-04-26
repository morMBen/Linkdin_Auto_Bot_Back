import {
  DocumentDefinition, FilterQuery, PipelineStage, QueryOptions, UpdateQuery,
} from 'mongoose';
import { I_Filter, I_Sort } from '../interfaces/profiles.interface';
import ProfileModel, { ProfileDocument } from '../models/profile.model';

export async function addProfiles(data: DocumentDefinition<ProfileDocument[]>): Promise<void> {
  try {
    await ProfileModel.insertMany(data);
  } catch (error) {
    throw error;
  }
}

export async function getProfiles(filter: I_Filter, sortBy: I_Sort) {
  const stages: PipelineStage[] = [{ $match: filter }];
  
  const { field, order } = sortBy;
  if (field && order) {
    stages.push({ $sort: { [field]: order } });
  }
  return await ProfileModel.aggregate(stages);
}

export async function updateProfile(
  query: FilterQuery<ProfileDocument>,
  update: UpdateQuery<ProfileDocument>,
  options: QueryOptions = { new: true },
) {
  return await ProfileModel.findOneAndUpdate(query, update, options);
}


export async function deleteProfile(query: FilterQuery<ProfileDocument>) {
  return await ProfileModel.findById(query, { $set: { 'isDeleted': true } });
}
