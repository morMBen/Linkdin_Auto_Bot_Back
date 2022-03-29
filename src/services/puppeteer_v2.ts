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
    await utils.setLinkedinCookies(page);

    const result = await getSearchResults(page);
    console.log("result.length = ", result.length);
    
    console.log(result);
    
    return result;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    await browser?.close();
  }
}


async function getSearchResults(page: Page): Promise<any> {
  try {
    await page.goto(`${process.env.SEARCH_URI}`);
  
    const searchResults: string[] = [];
    let isNext: boolean = true;

    while (isNext) {
      await page.waitForTimeout(Math.random() * 30000 + 10000);
      await utils.scrollToBottom(page);
      
      const pageResult: string[] = await scrapeProfilesLinks(page);
      searchResults.push(...pageResult);
  
      const nextPageButton = await getNextButton(page);
      if (!nextPageButton) {
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


async function scrapeProfilesLinks(page: Page): Promise<string[]> {
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


async function getNextButton(page: Page) {

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


linkedinScraper()
