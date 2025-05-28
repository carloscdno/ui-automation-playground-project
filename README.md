# 🧪 UI Testing Playground Automation with Playwright

This project is a comprehensive test suite built with [Playwright](https://playwright.dev/) to automate UI scenarios from the [UI Testing Playground](https://www.uitestingplayground.com/). It demonstrates modern, reliable, and maintainable end-to-end testing practices for common UI challenges like dynamic elements, overlays, dialogs, shadow DOM, and more.

--- 
## 📌 What This Project Covers

- ✅ Shadow DOM Testing
- ✅ Modal Dialog Handling (Alert, Confirm, Prompt)
- ✅ Dynamic Buttons and Disabled Elements
- ✅ Animation Waits & Visual Changes 
- ✅ Overlays Blocking Interaction
- ✅ Form Input States (Text, Select, Textarea, Label)

---

## 🚀 Tech Stack

- ⚙️ [Playwright](https://playwright.dev/) – End-to-end testing framework  
- 📄 TypeScript – Typed automation scripts  
- ✅ Built-in Playwright Test Runner  
- 🔄 Cross-browser testing (Chromium, Firefox, WebKit)

---

## 💡 Highlights & Challenges Solved

### 🧱 Shadow DOM
Playwright can pierce shadow DOM boundaries easily using locators. Clipboard permissions are handled explicitly for Chromium.
```ts
await context.grantPermissions(['clipboard-read', 'clipboard-write']);
```

### 🧨 Dialog Handling

Built-in page.on('dialog') events are used to assert and handle multiple alert/confirm/prompt flows.

### 🧪 Input Enable/Disable Testing

We assert that elements are enabled before typing, and correctly reject input when disabled.

### 🎯 Animation & Movement

Tests verify the state of UI elements during and after animations using class verification and timing control.

### ⏳ Waits and Overlays

To simulate overlay-blocked interactions, we wait for visibility/invisibility instead of relying on flaky click failures.
```ts
await overlay.waitFor({ state: 'hidden', timeout: 12000 });
```
---

### 🧪 Run the Tests

- Install dependencies:
```bash
npm install
```


- Run all tests: 
```bash
npm run ui-tests:firefox
npm run ui-tests:chrome
npm run ui-tests:webkit
```

- Run a specific file:
```bash
npx playwright test ui-tests/alerts.spec.ts
```
- Open the Playwright test report:
```bash
npx playwright show-report
```
- Run UI mode
```bash
npx playwright test --ui
```
---
### 📸 Screenshots and Debugging

Use Playwright Inspector for step-by-step debugging:
```bash
npx playwright test --debug
```

---
### 🙌 Why This Project?

This repository showcases real-world UI test automation strategies, focusing on readability, reliability, and good testing practices. It's a great starting point for beginners and a solid reference for experienced testers looking to automate edge-case UI behavior.

