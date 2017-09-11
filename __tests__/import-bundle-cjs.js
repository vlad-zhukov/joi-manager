/* eslint-disable no-underscore-dangle */

const JoiManager = require('../dist/joi-manager.cjs');

test('import-bundle-cjs', () => {
    expect(new JoiManager()).toBeInstanceOf(JoiManager);
});
