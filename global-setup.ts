import { chromium, type FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import { acceptCalkooCookieConsent } from './utils/cookie-consent';

/**
 * Opens the app once, accepts cookies/consent, and saves cookies + storage into JSON for all tests.
 */
async function globalSetup(_config: FullConfig): Promise<void> {
  dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });
  const baseURL = process.env.CALKOO_BASE_URL;
  if (!baseURL) {
    throw new Error('CALKOO_BASE_URL is required for global setup');
  }

  const storageDir = path.join(__dirname, '.auth');
  const storageStatePath = path.join(storageDir, 'calkoo-storage.json');

  fs.mkdirSync(storageDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(baseURL);
  await page.waitForLoadState('domcontentloaded');
  await acceptCalkooCookieConsent(page);

  await context.storageState({ path: storageStatePath });
  await browser.close();
}

export default globalSetup;
