import { Request, Response } from 'express';
import { linkedinScraper } from "../scraper/puppeteer";
import * as profileServices from '../services/profile.service';
import { ProfileDocument } from "../models/profile.model";
import { getNewProfiles } from '../scraper/filterNewProfiles';

export async function scraperInit(req: Request, res: Response) {
  try {
    const scrapeResults: ProfileDocument[] = await linkedinScraper();
    const newProfiles: ProfileDocument[] | null = await getNewProfiles(scrapeResults);
    if (!newProfiles) {
      return;
    }

    await profileServices.addProfiles(newProfiles);
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.status(500).send("LinkedIn scrape failed");
  }
}


