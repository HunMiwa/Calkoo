import { Given, Then, When, test } from '../fixtures/fixtures';

Given('I open the VAT calculator', async function ({ vatCalculator }) {
  await vatCalculator.gotoCalculator();
});

Then('I check that the VAT rate is correct for the countries', async function ({ vatCalculator }) {
  test.setTimeout(20 * 60 * 1000);
  await vatCalculator.assertVatRatesMatchCountries();
});

Given('I select {string} as the country', async function ({ vatCalculator }, country: string) {
  await vatCalculator.selectCountryByLabel(country);
});

Given('I select {int} as the VAT rate', async function ({ vatCalculator }, percent: number) {
  await vatCalculator.selectVatRatePercent(percent);
});

When('I enter the net price {string}', async function ({ vatCalculator }, value: string) {
  await vatCalculator.fillNet(value);
});

Then('the value-added tax amount should be {string}', async function ({ vatCalculator }, value: string) {
  await vatCalculator.expectVatAmount(value);
});

Then('the gross price should be {string}', async function ({ vatCalculator }, value: string) {
  await vatCalculator.expectGross(value);
});

Then('I should see an error message', async function ({  }) {
});

When('I click on the advanced options button', async function ({  }) {
});

Then('I should see calculation mode options', async function ({  }) {
});

Then('I can switch between calculation modes', async function ({  }) {
});

Then('I should see the exported CSV file', async function ({  }) {
});

When('I select the {string} calculation mode', async function ({  }) {
});

When('I select {string} as the export format', async function ({  }) {
});

When('I click on the export button', async function ({  }) {
});

When('I add a new row', async function ({  }) {
});

When('I remove the new row', async function ({  }) {
});

Then('I should see the new row', async function ({  }) {
});

Then('I should not see the new row', async function ({  }) {
});

When('I select {string} as the rounding method', async function ({  }) {
});

Then('I should see the rounding method options', async function ({  }) {
});

Then('I can switch between rounding methods', async function ({  }) {
});