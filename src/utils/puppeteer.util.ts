import * as fs from 'fs';
import { Page } from 'puppeteer';

export function getRandomTimeInterval(timeRange: number, minTime: number): number {
  return Math.random() * timeRange + minTime;
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

