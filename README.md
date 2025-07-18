# Test Automation training from jaktestowac.pl

## Links

- test site https://demo-bank.vercel.app/

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`
  run Trace Viewer on zip file
  `npx playwright show-trace trace.zip`
- cancelling Node process  
  hit twice <kbd>Ctrl</kbd> + <kbd>C</kbd>

## Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```

## Visual Studio Code

- Preview: for README.md
- Autosave: in File -> Auto Save
- Timeline: file context menu -> Open Timeline
- Formatting: editor -> context menu -> Format Document

## Playwright snippets

- test:
  ```javascript
  test('test description', async ({ page }) => {});
  ```
- describe:

  ```javascript
  test.describe('Group description', () => {});
  ```

- running one test: `test.only`

### Prettier

- install Prettier  
  `npm install --save-dev --save-exact prettier`
- configure Prettier
  - exlude files in `.prettierignore`

    ```
    package-lock.json
    playwright-report
    test-results

    ```

  - set rules in `.prettierrc.json`
    ```
    {
        "singleQuote": true
    }
    ```

- run Prettier  
  `npx prettier --write .`
- additionaly you can install VSC extension: **Prettier**
