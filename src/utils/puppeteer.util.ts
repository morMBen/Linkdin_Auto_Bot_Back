import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
import { Page } from 'puppeteer';
import { I_SearchDocument } from '../models/search.model';

config({ path: path.resolve(__dirname, '../.env') });

// Scraped websites' cookies utils

export async function setLinkedinCookies(page: Page): Promise<void> {
  const storedCookies = fs.readFileSync('./cookies.json', 'utf8');
  const deserializedCookies = JSON.parse(storedCookies);
  await page.setCookie(...deserializedCookies);
}

export async function getLinkedinCookies(page: Page): Promise<void> {
  const cookies = await page.cookies();
  const cookieJson = JSON.stringify(cookies);
  fs.writeFileSync('./cookies.json', cookieJson);
}


// Scroll in a page utils

async function isMoreSpaceToScroll(page: Page): Promise<boolean> {
  return await page.evaluate(() => {
    if (window && document.scrollingElement) {

      return document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight
    }
    return false;
  })
};


export async function scrollToBottom(page: Page) {
  const delay = getRandomTimeInterval(500, 750);
  let toScroll = await isMoreSpaceToScroll(page);

  while (toScroll) {
    await page.evaluate(() => {
      const distance = window.outerHeight / Math.floor(Math.random() * 4);
      document.scrollingElement?.scrollBy(0, distance);
    });

    await page.waitForTimeout(delay);

    toScroll = await isMoreSpaceToScroll(page);
  }
};


// Senitize Data from scraper utils

export function getSanitizedName(linkedInName: string) {
  const senitized = linkedInName.slice(0, linkedInName.indexOf(','));
  return lettersOnly(senitized);
}


function lettersOnly(str: string) {
  return str.replace(/[^a-zA-Z]/g, "");
}


// Misc utils

export function getRandomTimeInterval(timeRange: number, minTime: number): number {
  return Math.random() * timeRange + minTime;
};


export function editSearchKeyWords(keyWords: I_SearchDocument[]): string | null {
  const searchWords = keyWords.reduce((accumulator: string, keyWord:I_SearchDocument) => {
    return accumulator + '%20' + keyWord.searchWord;
  }, '');

  const { SEARCH_URI_DOMAIN, SEARCH_URI_GEO_URN, SEARCH_URI_ORIGIN } = process.env;
  if (!SEARCH_URI_DOMAIN || !SEARCH_URI_GEO_URN || !SEARCH_URI_ORIGIN) {
    return null
  }
  
  return SEARCH_URI_DOMAIN + SEARCH_URI_GEO_URN + `&keywords=${searchWords}` + SEARCH_URI_ORIGIN;
}
