import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/errors.util';
import { ProfileDocument } from '../models/profile.model';
import { I_Filter, I_Sort } from '../interfaces/profiles.interface';
import * as profileServices from '../services/profile.service';

export async function addProfiles(req: Request<{}, {}, ProfileDocument[]>, res: Response) {
  try {
    await profileServices.addProfiles(req.body);
    return res.send('Profile insertion to DB success');
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}

export async function getProfiles(req: Request, res: Response) {
  try {
    const { filter, sortBy } = req.body;
    
    // if (!filter || !(filter instanceof I_Filter) ||
    //     !sortBy || !(sortBy instanceof I_Sort)
    //   ) {
    //   return res.sendStatus(400);
    // }

    // if (typeof filter !== 'object' || typeof sortBy !== 'object') {
    //   return res.sendStatus(400);
    // }

    // filter.isDeleted = false;

    const profiles = await profileServices.getProfiles(filter, sortBy);

    return res.send(profiles);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}

export async function updateProfile(req: Request<{}, {}, ProfileDocument>, res: Response) {
  try {
    const update = req.body;
    if (!update) {
      return res.status(400).send('Update required in body');
    }

    const result = await profileServices.updateProfile({ _id: update._id }, update);
    if (!result) {
      return res.status(404).send('Profile not found');
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
      return res.status(404).send('Profile not found');
    }

    return res.send(result);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
}
