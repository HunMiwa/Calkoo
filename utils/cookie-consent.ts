import type { Page } from '@playwright/test';

/**
 * Dismisses the Calkoo cookie / consent UI so the page is usable in tests.
 */
export async function acceptCalkooCookieConsent(page: Page): Promise<void> {
  await page.getByRole('link', { name: 'Agree & Close' }).click();
  await page.getByLabel('Consent', { exact: true }).click();
}
