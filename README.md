<p align="center">
  <img width="200" src="https://open-wc.org/hero.png"></img>
</p>

## Open-wc Starter App

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Quickstart

To get started:
# requires node 10 & npm 6 or higher
# node v14.16.1 LTS (recommended)
```bash
npm i

```

## Start a live-reload dev server

```
npm run start
```

## Run Test
```
npm run test
```
### Example code for testing:

<p style="color: red">[project-name]/test/lit-element-template-js.test.js</p>

```
import { html, fixture, expect } from '@open-wc/testing';

import '../src/lit-element-template-js.js';

describe('LitElementTemplateJs', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<lit-element-template-js></lit-element-template-js>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot.querySelector('h1');
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
```
This is a test for LitElementTemplateJs Element Class [project-name]/src/LitElementTemplateJs.js

## Storybook
Your project will run in storybook
```
Running storybook: npm run storybook
Building storybook: npm run storybook:build
```

## [UI Components](https://vaadin.com/components)
Check the UI Components that you can use.

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## [Developer tools & Resources](https://github.com/Mata101/lit-element-js-template/blob/main/DEVELOPER.md)