import { ProfileDocument } from "../models/profile.model";
import * as profileServices from '../services/profile.service';


export async function getNewProfiles(scrapeResults: ProfileDocument[]): Promise<ProfileDocument[] | null> {
  try {
    const profilesInDB = await profileServices.getProfiles({}, {});
    if (!profilesInDB) {
      return null
    };

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
