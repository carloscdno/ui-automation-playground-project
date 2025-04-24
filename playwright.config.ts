import { PlaywrightTestConfig } from "@playwright/test";    

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    use: {
        headless: true,
        viewport: null,
        actionTimeout: 15000,
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
    projects: [
        {
            name: 'Chromium',
            use: { browserName: 'chromium' }
        },
        {
            name: 'Firefox',
            use: { browserName: 'firefox' }
        },
        {
            name: 'WebKit',
            use: { browserName: 'webkit' }
        },
    ],
};

export default config;