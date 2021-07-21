import { expect } from '@esm-bundle/chai';
import { setViewport } from '@web/test-runner-commands';
import { isMobile } from '../src/views/isMobile';

//this is a test for codes that should only execute on mobile
describe('isMobile', () => {
  it('returns true if width < 1024px', async () => {
    await setViewport({ width: 360, height: 640 });
    expect(isMobile()).to.be.true;
  });

  it('returns false if width > 1024px', async () => {
    await setViewport({ width: 1200, height: 640 });
    expect(isMobile()).to.be.false;
  });
});