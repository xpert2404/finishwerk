import {defineConfig} from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3005';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'on'
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: {
        browserName: 'chromium',
        viewport: {width: 1440, height: 1200}
      }
    },
    {
      name: 'mobile-chromium',
      use: {
        browserName: 'chromium',
        viewport: {width: 390, height: 844},
        isMobile: true,
        hasTouch: true
      }
    }
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'npm run build && npm run start -- --hostname localhost --port 3005',
        url: baseURL,
        reuseExistingServer: false,
        timeout: 180_000
      }
});
