const Joi = require('joi');
const JoiManager = require('../dist/joi-manager.cjs');

test('import-bundle-cjs', () => {
    const joiManager = new JoiManager();
    expect(joiManager).toBeInstanceOf(JoiManager);
    expect(joiManager.defaultOptions).toEqual({});

    joiManager.add('number', Joi.number());
    joiManager.get('number');
    joiManager.validate('number', 1);
});
