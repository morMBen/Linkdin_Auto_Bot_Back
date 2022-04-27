import puppeteer, { Page } from 'puppeteer';
import { config } from 'dotenv';
import * as path from 'path';
import * as utils from '../utils/puppeteer.util';
import { ProfileDocument } from '../models/profile.model';
import { getAllLinks } from './scrapeProfilesLinks';
import { scrapeSingleProfile } from './scrapeSingleProfile';


config({ path: path.resolve(__dirname, '../.env') });


export const linkedinScraper = async () => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: process.env.ENV === 'Production' ? true : false,
      defaultViewport: null,
      slowMo: utils.getRandomTimeInterval(750, 750),
    });

    const page: Page = await browser.newPage();
    await utils.setLinkedinCookies(page);

    const scrapedProfiles: ProfileDocument[] = await getAllProfilesData(page);
    
    return scrapedProfiles;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await browser?.close();
  }
}


async function getAllProfilesData(page: Page): Promise<ProfileDocument[]> {
  try {
    const scrapedProfiles: ProfileDocument[] = [];
    const profilesURLs = await getAllLinks(page);
  
    for (const profile of profilesURLs) {
      const profileData = await scrapeSingleProfile(page, profile);
      if (profileData) {
        scrapedProfiles.push(profileData);
      }
    }
    
    return scrapedProfiles;
} catch (error) {
  console.error(error);
  throw error;
}
}


// linkedinScraper()
