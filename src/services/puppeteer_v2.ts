import puppeteer, { Page } from 'puppeteer';
import { config } from 'dotenv';
import * as path from 'path';
import * as utils from '../utils/puppeteer.util';

config({ path: path.resolve(__dirname, '../.env') });

export const linkedinScraper = async () => {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      slowMo: utils.getRandomTimeInterval(500),
    });

    const page: Page = await browser.newPage();
    const result = await getSearchResults(page);
    return result;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await browser?.close();
  }
}

async function getSearchResults(page: Page): Promise<any> {

  await utils.setLinkedinCookies(page);

  await page.goto(`${process.env.SEARCH_URI}`);
  await page.waitForTimeout(Math.random() * 30000 + 10000);

  const results: string[] = [];
  let pageResult: string[] = [];

  while (true) {
    await page.waitForTimeout(Math.random() * 30000 + 10000);
    await utils.scrollToBottom(page)

    const isButton = await page.waitForSelector('button[aria-label=Next]')
    if (isButton === null) {
      break;
    }

    const nextPageButton = await page.$('button[aria-label=Next]')
    if (!nextPageButton) {
      break;
    };
    
    const isDisabled = await page.$('button[aria-label=Next][disabled]'); 
    if (isDisabled !== null) {
      break;
    }

    await nextPageButton?.click();
  }
};


linkedinScraper()
