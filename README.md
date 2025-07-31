# Playwright Automation Test Suite

A comprehensive end-to-end testing framework built with [Playwright](https://playwright.dev/) for automating web application testing across multiple browsers.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Configuration](#configuration)
- [Writing Tests](#writing-tests)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🎯 Overview

This project contains automated tests for web applications using Playwright, focusing on:
- Form interactions and validations
- UI component testing (sliders, inputs)
- Cross-browser compatibility testing
- Element location strategies and chain locators

## ✨ Features

- **Cross-browser testing** - Chrome, Firefox, Safari
- **Parallel test execution** for faster feedback
- **HTML test reports** with screenshots and videos
- **Trace viewer** for debugging failed tests
- **Test retries** on CI environments
- **Page Object Model** ready structure
- **Modern JavaScript/ES6** syntax

## 🔧 Prerequisites

Before running the tests, ensure you have:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **VS Code** (recommended) with Playwright extension

## 🚀 Installation

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Playwright_Automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### 🌐 Gitpod Setup (Cloud Development)

**Option 1: One-Click Setup**
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Thel101/Playwright_Automation)

**Option 2: Manual Setup**
1. **Prefix GitHub URL with `gitpod.io/#`:**
   ```
   https://gitpod.io/#https://github.com/Thel101/Playwright_Automation
   ```

2. **Wait for automatic setup** - Gitpod will:
   - Install Node.js and dependencies
   - Install Playwright browsers with system dependencies
   - Configure the environment for headless testing
   - Install VS Code extensions

3. **Environment will be ready** with all dependencies installed!

**Gitpod Features:**
- ✅ **Pre-configured environment** - No manual setup needed
- ✅ **Browser dependencies included** - Works out of the box
- ✅ **VS Code extensions** - Playwright extension pre-installed
- ✅ **Port forwarding** - Access reports and debugging tools
- ✅ **Optimized for headless testing** - Perfect for CI/CD workflows

## 📁 Project Structure

```
Playwright_Automation/
├── tests/
│   ├── form.spec.js              # Form testing scenarios
│   ├── sliders.spec.js           # Slider component tests
│   └── form-submission.spec.js   # Form submission tests
├── tests-examples/
│   └── demo-todo-app.spec.js     # Example test file
├── test-results/                 # Test execution results
├── playwright-report/            # HTML test reports
├── playwright.config.js          # Playwright configuration
├── package.json                  # Project dependencies
└── README.md                     # This file
```

## 🏃‍♂️ Running Tests

### Run All Tests
```bash
# Run all tests
npm run test
# or
npx playwright test

# Run tests in headed mode (visible browser) - Local only
npm run test:headed

# Run tests in debug mode - Local only
npm run test:debug

# Run tests with UI mode - Local only
npm run test:ui
```

### Run Specific Tests
```bash
# Run a single test file
npm run test:form
# or
npx playwright test tests/form.spec.js

# Run tests matching a pattern
npx playwright test --grep "Form Tests"

# Run specific browser
npx playwright test --project=chromium
```

### Gitpod-Specific Commands
```bash
# View test reports (automatically opens in Gitpod)
npm run test:report

# Generate test code interactively
npm run test:codegen

# Reinstall browsers if needed
npm run install:browsers
```

### Run Tests in VS Code
1. Install the **Playwright Test for VS Code** extension (auto-installed in Gitpod)
2. Click the ▶️ play button next to test names
3. Use the Test Explorer panel
4. Right-click in test file → "Run Playwright Test"

## 📊 Test Reports

### HTML Report
```bash
# Generate and open HTML report
npx playwright show-report
```

### View Test Results
- **HTML Report**: `playwright-report/index.html`
- **Test Results**: `test-results/` directory
- **Screenshots**: Automatically captured on failures
- **Videos**: Available for failed tests

### Trace Viewer
```bash
# Open trace viewer for debugging
npx playwright show-trace test-results/<test-name>/trace.zip
```

## ⚙️ Configuration

The `playwright.config.js` file contains:

- **Test Directory**: `./tests`
- **Browsers**: Chrome, Firefox, Safari
- **Parallel Execution**: Enabled
- **Retries**: 2 on CI, 0 locally
- **Reporter**: HTML
- **Trace**: On first retry

### Environment Variables
```bash
# CI environment detection
CI=true npx playwright test

# Custom base URL
BASE_URL=https://staging.example.com npx playwright test
```

## ✍️ Writing Tests

### Basic Test Structure
```javascript
import { test, expect } from '@playwright/test';

test.describe('Feature Tests', () => {
    test('should perform action', async ({ page }) => {
        await page.goto('https://example.com');
        
        await test.step('step description', async () => {
            // Test actions
            await page.click('button');
            await expect(page.locator('.result')).toBeVisible();
        });
    });
});
```

### Element Location Strategies
```javascript
// CSS selectors
const element = page.locator('input[type="text"]');

// Chain locators
const nestedElement = page.locator('.container').locator('input').first();

// Semantic locators (recommended)
const button = page.getByRole('button', { name: 'Submit' });
const input = page.getByLabel('Username');
```

### Assertions
```javascript
// Text assertions
await expect(page.locator('.message')).toHaveText('Success');

// Visibility assertions
await expect(page.locator('.modal')).toBeVisible();

// Value assertions
await expect(page.locator('input')).toHaveValue('expected value');
```

## 🎯 Best Practices

### 1. **Use Semantic Locators**
```javascript
// Preferred
page.getByRole('button', { name: 'Submit' })
page.getByLabel('Email address')

// Avoid
page.locator('#btn-123')
page.locator('.some-css-class')
```

### 2. **Implement Page Object Model**
```javascript
// pages/LoginPage.js
export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
```

### 3. **Use Test Steps for Better Reporting**
```javascript
test('user flow', async ({ page }) => {
    await test.step('Navigate to login page', async () => {
        await page.goto('/login');
    });
    
    await test.step('Enter credentials', async () => {
        await page.fill('[name="username"]', 'user');
        await page.fill('[name="password"]', 'pass');
    });
});
```

### 4. **Handle Async Operations**
```javascript
// Wait for elements
await page.waitForSelector('.loading', { state: 'hidden' });

// Wait for network
await page.waitForResponse('**/api/data');

// Wait for navigation
await page.waitForURL('**/dashboard');
```

## 🔍 Troubleshooting

### Common Issues

**Tests are flaky:**
- Add proper waits: `waitForSelector`, `waitForLoadState`
- Use `toBeVisible()` instead of `toHaveCount()`
- Increase timeout for slow operations

**Element not found:**
- Verify selectors in browser DevTools
- Use `page.pause()` to debug interactively
- Check if element is in iframe

**Slow test execution:**
- Enable parallel execution
- Use `page.goto()` with `waitUntil: 'networkidle'`
- Optimize test data and cleanup

### Gitpod-Specific Issues

**Browser installation fails:**
```bash
# Reinstall browsers with system dependencies
npm run install:browsers
```

**Display issues in Gitpod:**
```bash
# Set display environment variable
export DISPLAY=:99
Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

**Cannot access test reports:**
- Reports automatically open in Gitpod's Simple Browser
- Use `npm run test:report` to view reports
- Check port 9323 is forwarded in Gitpod

**Performance issues:**
- Gitpod free tier has resource limitations
- Consider upgrading to Gitpod Pro for better performance
- Use `--workers=1` for single-threaded execution

### Debug Commands
```bash
# Run with debug (local only)
npx playwright test --debug

# Pause execution
await page.pause();

# Generate locators
npm run test:codegen

# Check Gitpod environment
echo $GITPOD_WORKSPACE_URL
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/new-test`
3. **Write tests** following the established patterns
4. **Run tests locally:** `npx playwright test`
5. **Commit changes:** `git commit -m "Add new test for feature X"`
6. **Push and create PR**

### Code Standards
- Use descriptive test names
- Follow Page Object Model pattern
- Add appropriate waits and assertions
- Include test documentation

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

**Happy Testing! 🎭**
