import * as fs from 'fs';
import { Page } from 'puppeteer';

export function getRandomTimeInterval(rangeMiliSecs: number): number {
  return Math.random() * rangeMiliSecs + 750;
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
