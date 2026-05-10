import { test as base, createBdd } from 'playwright-bdd';
import { VatCalculator } from '../src/vat_calculator';
import { VatCalculatorFixtures } from '../types';

export const test = base.extend<VatCalculatorFixtures>({ vatCalculator: async ({ page }, use) => {
  await use(new VatCalculator(page));
}});

export const { Given, When, Then } = createBdd(test);
