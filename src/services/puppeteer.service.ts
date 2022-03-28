import puppeteer, { Page } from 'puppeteer';
import { config } from 'dotenv';
import * as path from 'path';
import * as utils from '../utils/puppeteer.util';

config({ path: path.resolve(__dirname, '../.env') });

export const linkedinScraper = async () => {

  try {
    const browser = await puppeteer.launch({ 
      headless: false,
      defaultViewport: null,
      slowMo: utils.getRandomTimeInterval(500),
    });

    const page: Page = await browser.newPage();
    
    // await page.goto(`${process.env.LOGIN_URI}`);
    // await page.waitForTimeout(60000);
    // const cookies = await page.cookies();
    // const cookieJson = JSON.stringify(cookies);
    // fs.writeFileSync('./cookies.json', cookieJson);
    // const timeBefore = Date.now();
    const result = await getSearchResults(page);
    
    await browser.close();
    console.log(result);
    
    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const getSearchResults = async (page: Page): Promise<string[]> => {

  await utils.setLinkedinCookies(page);

  await page.goto(`${process.env.SEARCH_URI}`);
  await page.waitForTimeout(Math.random() * 30000 + 10000);
  
  const results: string[] = [];
  let pageResult: string[] = [];
  let i = 0;

  while (true) {
    // await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await scrollToBottom(page);
    console.log("after scrollToBottom");
    console.log(i++);
    
    // await autoScroll(page);
    
    
    pageResult = await page.evaluate(() => {
      const groupRefs: string[] = [];
      let linksGroup: NodeListOf<Element> = document.querySelectorAll(
        'span.entity-result__title-line.entity-result__title-line--2-lines > span > a'
      );
      
      linksGroup.forEach((link: Element) => {
        groupRefs.push((link as HTMLLinkElement).href);
      });

      return groupRefs;
    });

    results.push(...pageResult);
    // 
    // page.on('console', async (msg) => {
    //   const msgArgs = msg.args();
    //   for (let i = 0; i < msgArgs.length; ++i) {
    //     console.log(await msgArgs[i].jsonValue());
    //   }
    // });
    //

    // document.querySelector("ul.artdeco-pagination__pages").lastElementChild.getAttribute("data-test-pagination-page-btn");

    const isButton = await page.waitForSelector('button[aria-label=Next]'); 
    if(!isButton) {
      console.log("isButton:",false)
      await page.waitForTimeout(10000)
    }
    const nextBtn = await page.evaluate(() => document.querySelector('button[aria-label=Next]'))

    console.log("nextBtn: ", nextBtn);
    
    if ((nextBtn as HTMLButtonElement).disabled) {
      break;
    }
    page.click('button[aria-label=Next]'); 
  
  }
  
  await utils.getLinkedinCookies(page);

  return results;
};

// async function setLinkedinCookies(page: Page): Promise<void> {
//   const storedCookies = fs.readFileSync('./cookies.json', 'utf8');
//   const deserializedCookies = JSON.parse(storedCookies);
//   await page.setCookie(...deserializedCookies);
// }

// async function getLinkedinCookies(page: Page): Promise<void> {
//   const cookies = await page.cookies();
//   const cookieJson = JSON.stringify(cookies);
//   fs.writeFileSync('./cookies.json', cookieJson);
// }


async function autoScroll(page: Page){
  await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
          let totalHeight = 0;
          let distance = 400;
          let timer = setInterval(() => {
              let { scrollHeight } = document.body;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight - window.innerHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, utils.getRandomTimeInterval(500));
      });
  });
}


async function scrollToBottom(page: Page) {
  const distance = 100; // distance to scroll by
  const delay = 100; // delay in ms




  while (
    await page.evaluate(
      () =>
      
        document.scrollingElement.scrollTop + window.innerHeight <
        document.scrollingElement.scrollHeight
    ) // while bottom is not reached scroll
  ) {
    await page.evaluate((y) => {
      document.scrollingElement.scrollBy(0, y);
    }, distance);
    await page.waitForTimeout(delay);
  }
}


// async function scrapLinksToProfiles(page: Page): Promise<string[]> {
  // const nextBtn = 'div.artdeco-pagination.artdeco-pagination--has-controls > button[aria-label=Next]';
  // const result: string[] = [];
  // let nextBtn;

  // do{
  //   let linksGroup: NodeListOf<Element> = await page.evaluate(() => {
  //     return document.querySelectorAll(
  //       'span.entity-result__title-line.entity-result__title-line--2-lines > span > a'
  //     );
  //   });

  //   linksGroup.forEach((link: Element) => {
  //     result.push((link as HTMLLinkElement).href);
  //   });
  //   nextBtn = await page.evaluate(() => {
  //     return document.querySelector(
  //       'div.artdeco-pagination.artdeco-pagination--has-controls > button[aria-label=Next]'
  //     );
  //   });

  //   (nextBtn as HTMLButtonElement).click();
  // } while (!( nextBtn as HTMLButtonElement).disabled) 
  // {
  //   return result.push(...( await scrapLinksToProfiles(page))); 
  // }
// }

// const results: string[] = await page.evaluate(async () => {
//   const result: string[] = [];
//   let linksGroup: NodeListOf<Element> = document.querySelectorAll(
//     'span.entity-result__title-line.entity-result__title-line--2-lines > span > a'
//   );
  
//   linksGroup.forEach((link: Element) => {
//     result.push((link as HTMLLinkElement).href);
//   })

//   let nextBtn: Element | null = document.querySelector(
//     'div.artdeco-pagination.artdeco-pagination--has-controls > button[aria-label=Next]'
//   );

//   (nextBtn as HTMLButtonElement).click();
//   console.log("nextBtn:", nextBtn);
  
//   return result
// });
// } while (!((nextBtn as HTMLButtonElement).disabled));

linkedinScraper();
 

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


