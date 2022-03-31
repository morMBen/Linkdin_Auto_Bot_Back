import puppeteer, { Page, ElementHandle } from 'puppeteer';
import { config } from 'dotenv';
import * as path from 'path';
import * as utils from '../utils/puppeteer.util';
import { ProfileDocument } from '../models/profile.model';

config({ path: path.resolve(__dirname, '../.env') });


export const linkedinScraper = async () => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      slowMo: utils.getRandomTimeInterval(750, 750),
    });

    const page: Page = await browser.newPage();
    await utils.setLinkedinCookies(page);

    const scrapedProfiles: ProfileDocument[] = await getAllProfilesData(page);
    console.log(scrapedProfiles);
    
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


async function getAllLinks(page: Page): Promise<any> {
  try {
    await page.goto(`${process.env.SEARCH_URI}`);
  
    const searchResults: string[] = [];

    while (true) {
      await page.waitForTimeout(utils.getRandomTimeInterval(30000, 10000));
      await utils.scrollToBottom(page);
      
      const pageResult: string[] = await scrapePageLinks(page);
      searchResults.push(...pageResult);
  
      const nextPageButton = await getNextButton(page);
      if (!nextPageButton) {
        await utils.getLinkedinCookies(page);

        return searchResults.filter((result) => {
          return result.includes('miniProfile');
        });
      };
  
      await nextPageButton?.click();
    }
  } catch (error) {
    throw error;
  }
};


async function scrapePageLinks(page: Page): Promise<string[]> {
  try {
    const pageResult = await page.evaluate(() => {
      const groupRefs: string[] = [];
      let linksGroup: NodeListOf<Element> = document.querySelectorAll(
        'span.entity-result__title-line.entity-result__title-line--2-lines > span > a'
      );
      
      linksGroup.forEach((link: Element) => {
        groupRefs.push((link as HTMLLinkElement).href);
      });
  
      return groupRefs;
    });
  
    return pageResult;
  } catch (error) {
    console.error(error);
    return [];
  }
}


async function getNextButton(page: Page): Promise<ElementHandle | null> {

  const nextPageButton = await page.$('button[aria-label=Next]');
  if (!nextPageButton) {
    return null;
  };
  
  const isDisabled = await page.$('button[aria-label=Next][disabled]'); 
  if (isDisabled !== null) {
    return null;
  }

  return nextPageButton;
}


async function scrapeSingleProfile(page: Page, url: string): Promise<ProfileDocument | null> {
  
  await page.goto(url);
  await page.waitForTimeout(utils.getRandomTimeInterval(30000, 10000));

  const randTime = utils.getRandomTimeInterval(1000, 2000);
  try {
    const res = await page.evaluate(async (randTime) => {
      const profileData = <ProfileDocument>{};
  
      const imageSrc = document.querySelector('div > div > div > button > img');
      if (imageSrc) profileData.imageSrc = (imageSrc as HTMLImageElement).src;
    
      const name =  document.querySelector('h1'); 
      if (name) profileData.name = name.innerText;
    
      const position = document.querySelector('div.text-body-medium.break-words');
      if (position) profileData.position = (position as HTMLElement).innerText; 
      
      const infoButton = document.querySelector('#top-card-text-details-contact-info');
      if (infoButton) {
        (infoButton as HTMLButtonElement).click();
        await new Promise(function(resolve) {setTimeout(resolve, randTime)});

        const profileLink = document.querySelector('section.ci-vanity-url > div > a'); 
        if (profileLink) profileData.profileLink = (profileLink as HTMLAnchorElement).href;

        const email = document.querySelector('section.ci-email > div > a');
        if (email) profileData.email = (email as HTMLAnchorElement).href;
      }
      
      const closeModalButton = document.querySelector('div[role=dialog] > button');
      if (closeModalButton) (closeModalButton as HTMLButtonElement).click();

      return profileData;
    }, randTime);
  
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}


linkedinScraper()
