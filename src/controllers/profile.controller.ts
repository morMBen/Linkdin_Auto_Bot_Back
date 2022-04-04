import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import { ProfileDocument } from '../models/profile.model'
import * as profileServices from '../services/profile.service';


export async function addProfiles(
  req: Request<{}, {}, ProfileDocument[]>,
  res: Response
) {
  try {
    const result = await profileServices.addProfiles(req.body);
    return res.send("Profile insertion to DB success");
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}

export async function getProfiles(
  req: Request<{}, {}, {}, ProfileDocument>, 
  res: Response) {
  try {
    const filter = {$match: }
    const profiles = await profileServices.getProfiles();
    return res.send(profiles || []);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}

export async function updateProfile(
  req: Request<{}, {}, ProfileDocument>,
  res: Response
) {
  try {
    const update = req.body;
    if (!update) {
      return res.status(400).send("Update required in body"); 
    }

    const result = await profileServices.updateProfile({ _id: update._id }, update);
    if (!result) {
      return res.status(404).send("Profile not found");
    }

    return res.send(result);    
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}

// TODO: collect emails to separate collection
export async function deleteProfile(req: Request, res: Response) {
  try {
    const { profileId } = req.query;
    
    const result = await profileServices.deleteProfile({ _id: profileId });
    if (!result) {
      return res.status(404).send("Profile not found");
    }

    return res.send(result);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}
