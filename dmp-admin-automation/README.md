# DMP Admin Automation Framework

Automation Testing Framework using Playwright + TypeScript for dmp.vtscloud.vn/admin

## Prerequisites
- Node.js >= 18
- npm

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Install Playwright browsers:
   ```bash
   npx playwright install --with-deps
   ```
3. Copy `.env.example` to `.env` and configure your credentials.

## Running Tests
Run all tests:
```bash
npm run test
```

Run tests with UI mode:
```bash
npm run test:ui
```

Generate and open Allure report:
```bash
npm run report
```
