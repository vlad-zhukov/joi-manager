/* eslint-disable no-underscore-dangle */

import JoiManager from '../dist/joi-manager.cjs';

test('import-bundle-cjs-as-es', () => {
    expect(new JoiManager()).toBeInstanceOf(JoiManager);
});
