import { expect, type Page } from '@playwright/test';
import { CALKOO_EXPECTED_COUNTRY_VAT_RATES } from '../constants/country_vat_rates';
import { CalkooCountryVatRates } from '../types';

const COUNTRY_SELECT = 'select[name="Country"]';
const VAT_RATE_RADIO = '#vat-basic-mode input[type="radio"][name="VAT"]';

export class VatCalculator {
  constructor(private readonly page: Page) {}

  private sortedRatesSnapshot(rates: readonly number[]): number[] {
    return [...rates].sort((a, b) => a - b);
  }

  private vatRadioInputId(percent: number): string {
    return `VAT_${percent}`;
  }

  private async getVatPercentsFromRadios(): Promise<number[]> {
    const radios = this.page.locator(VAT_RATE_RADIO);
    await radios.first().waitFor({ state: 'attached' });
    const count = await radios.count();
    expect(count, 'expected at least one VAT rate radio').toBeGreaterThan(0);
    const actual: number[] = [];
    for (let i = 0; i < count; i++) {
      const v = await radios.nth(i).getAttribute('value');
      if (v != null) actual.push(Number.parseFloat(v));
    }
    return [...new Set(actual)].sort((a, b) => a - b);
  }

  async gotoCalculator(): Promise<void> {
    await this.page.goto(process.env.CALKOO_BASE_URL!);
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.url()).toContain(process.env.CALKOO_BASE_URL!);
  }

  async assertVatRatesMatchCountries(
    expected: readonly CalkooCountryVatRates[] = CALKOO_EXPECTED_COUNTRY_VAT_RATES,
  ): Promise<void> {
    const countrySelect = this.page.locator(COUNTRY_SELECT);

    for (const entry of expected) {
      await countrySelect.selectOption({ value: entry.shortCode });
      await this.page.locator(VAT_RATE_RADIO).first().waitFor({ state: 'attached' });

      const actualSorted = await this.getVatPercentsFromRadios();
      const expectedSorted = this.sortedRatesSnapshot(entry.ratesPercent);

      expect(
        actualSorted,
        `VAT rate options for "${entry.country}" (${entry.shortCode}) should be ${expectedSorted.join(', ')}%`,
      ).toEqual(expectedSorted);
    }
  }

  async selectCountryByLabel(country: string): Promise<void> {
    const countrySelect = this.page.locator(COUNTRY_SELECT);
    await countrySelect.selectOption({ label: country });
    await this.page.locator(VAT_RATE_RADIO).first().waitFor({ state: 'attached' });
  }

  async selectVatRatePercent(percent: number): Promise<void> {
    const forId = this.vatRadioInputId(percent);
    await this.page.locator(`#vat-basic-mode label[for="${forId}"]`).click();
  }

  async fillNet(value: string): Promise<void> {
    await this.page.locator('#NetPrice').fill(value);
  }

  async expectVatAmount(value: string): Promise<void> {
    await expect(this.page.locator('#VATsum')).toHaveValue(value);
  }

  async expectGross(value: string): Promise<void> {
    await expect(this.page.locator('#Price')).toHaveValue(value);
  }

}
