import puppeteer, { Page } from 'puppeteer';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.resolve(__dirname, '../.env') });

export const mainAsF = async () => {

  try {
    const browser = await puppeteer.launch({ 
      headless: false,
      userDataDir: './tmp',
      slowMo: 1000, // slow down by 1000ms
    });

    const page: Page = await browser.newPage();
  
    // const result = await scrapLinksToProfiles(page, URL);
    await browser.close();
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const scrapLinksToProfiles = async (page: Page, URL: string): Promise<string[]> => {
  const result: string[] = [];
  let nextBtn;

  await page.goto(URL);
  await page.waitForTimeout(120000);

  do {
    let linksGroup = document.querySelectorAll(
      'span.entity-result__title-line.entity-result__title-line--2-lines > span > a'
    );
    
    linksGroup.forEach((link: Element) => {
      result.push((link as HTMLLinkElement).href);
    })

    nextBtn = document.querySelector(
      'div.artdeco-pagination.artdeco-pagination--has-controls > button[aria-label=Next]'
    );

    await page.click('');
  } while (!((nextBtn as HTMLButtonElement).disabled));

  return result
};

console.log(mainAsF());
 

// const urlLinkedIn = "https://www.linkedin.com/in/uzyhadad/"

// const profileLinks = []

// async function scraper () {
//   const browser = await puppeteer.launch({headless: false});
//   const page = await browser.newPage();
  
//   const result = await getTitle(page, urlLinkedIn);
//   console.log(result)

//   await browser.close();
// }

// scraper()

// const getTitle = async (page: any, url: string) => {
//   await page.goto(url, { waitUntil: "load"});
//   await page.waitForTimeout(10000);

//   const results = await page.evaluate(() => {
//       // const title = document.querySelector(".collection-header__headline ")?.textContent
//       //     return title
//       const result = document.querySelector("h1")?.textContent
//           return result
      
//         });
//   return results;
// }


