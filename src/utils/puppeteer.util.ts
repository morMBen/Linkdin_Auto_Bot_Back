import * as fs from 'fs';
import { Page } from 'puppeteer';

export function getRandomTimeInterval(rangeMiliSecs: number): number {
  return Math.random() * rangeMiliSecs + 500;
};

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

export async function scrollToBottom(page: Page) {
  const delay = getRandomTimeInterval(500); 

  async function isMoreSpaceToScroll(): Promise<boolean> {
    return await page.evaluate(() => {
      if (window && document.scrollingElement) {

        return document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight
      }
      return false;
    })
  };

  async function scrollDown() {
    let toScroll = await isMoreSpaceToScroll()

    while (toScroll) {
      await page.evaluate(() => {
        const distance = window.outerHeight / Math.floor(Math.random() * 4);
        document.scrollingElement?.scrollBy(0, distance)
      });

      await page.waitForTimeout(delay);

      toScroll = await isMoreSpaceToScroll()
    }
  };

  await scrollDown();
}

