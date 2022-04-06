import { Request, Response } from 'express';
import { linkedinScraper } from "./puppeteer";
import * as profileServices from '../services/profile.service';
import { ProfileDocument } from "../models/profile.model";

export async function scraperInit(req: Request, res: Response) {
  try {
    const scrapeResults = await linkedinScraper();
    const newProfiles = await getNewProfiles(scrapeResults);
    if (!newProfiles) {
      return res.send([]);
    }

    const profiles = await profileServices.addProfiles(newProfiles);
    return res.send(profiles);
  } catch (error) {
    console.error(error);
  }
}


async function getNewProfiles(scrapeResults: ProfileDocument[]): Promise<ProfileDocument[] | null> {
  try {
    const profilesInDB = await profileServices.getProfiles([{ $match: {} }]);
    if (!profilesInDB) {
      return null
    };
    console.log({ profilesInDB });

    profilesInDB.sort((a: ProfileDocument, b: ProfileDocument) => {
      return a.profileLink > b.profileLink ? 1 : a.profileLink < b.profileLink ? -1 : 0;
    });

    const newProfiles: ProfileDocument[] = filterNewProfiles(scrapeResults, profilesInDB);
    if (newProfiles.length === 0) {
      return null;
    };

    return newProfiles;
  } catch (error) {
    throw error;
  }
}


function filterNewProfiles(
  scrapeResults: ProfileDocument[],
  profilesInDB: ProfileDocument[]
): ProfileDocument[] {
  const newProfiles: ProfileDocument[] = [];

  for (const profile of scrapeResults) {
    if (!isInDB(profile, profilesInDB)) {
      newProfiles.push(profile);
    }
  }

  return newProfiles;
}


function isInDB(scrapedProfile: ProfileDocument, profilesInDB: ProfileDocument[]) {
  let start = 0, end = profilesInDB.length - 1;
  while (start < end) {
    const middle = Math.round((end - start) / 2);

    if (profilesInDB[middle].profileLink === scrapedProfile.profileLink) {
      return true;
    }

    if (profilesInDB[middle].profileLink > scrapedProfile.profileLink) {
      end = middle;
    }
    else {
      start = middle;
    }
  }

  return false;
}
