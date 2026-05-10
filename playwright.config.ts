import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';

const testDir = defineBddConfig({
  featuresRoot: './features',
  steps: ['fixtures/*.ts', 'step_definitions/*.ts'],
});

dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

const browsers = process.env.BROWSERS!.split(', ');
const workers = parseInt(process.env.WORKERS!);

const storageStatePath = path.join(__dirname, '.auth', 'calkoo-storage.json');

export default defineConfig({
  globalSetup: path.join(__dirname, 'global-setup.ts'),
  testDir,
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: workers,
  reporter: [['html'], ['list']],
  expect: {
    timeout: 20_000,
  },
  use: {
    baseURL: process.env.CALKOO_BASE_URL!,
    storageState: storageStatePath,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 20_000,
  },
  projects: [
		...browsers.map((browser) => ({
			name: browser,
			testDir: testDir,
			use: {
				...devices[`Desktop ${browser}`]
			}
		}))
	]
});
