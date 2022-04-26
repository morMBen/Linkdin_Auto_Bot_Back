import { Page } from 'puppeteer';
import * as utils from '../utils/puppeteer.util';
import { ProfileDocument } from '../models/profile.model';

export async function scrapeSingleProfile(page: Page, url: string): Promise<ProfileDocument | null> {
  
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
  
    const sanitizedName = utils.getSanitizedName(res.name);
    res.name = sanitizedName;

    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
}
