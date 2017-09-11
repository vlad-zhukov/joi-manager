/* eslint-disable no-underscore-dangle */

import JoiManager from '../dist/joi-manager.es';

test('import-bundle-es', () => {
    expect(new JoiManager()).toBeInstanceOf(JoiManager);
});
