import { Page, ElementHandle } from 'puppeteer';
import { all } from '../services/search.service';
import * as utils from '../utils/puppeteer.util';


export async function getAllLinks(page: Page): Promise<any> {
  try {
    const keys = await all();    
    const searchURI = utils.editSearchKeyWords(keys);
    if (!searchURI) {
      throw new Error("search URI not found");
    } 
    await page.goto(searchURI);
  
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
