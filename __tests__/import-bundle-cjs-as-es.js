import * as Joi from 'joi';
import JoiManager from '../dist/joi-manager.cjs';

test('import-bundle-cjs-as-es', () => {
    const joiManager = new JoiManager();
    expect(joiManager).toBeInstanceOf(JoiManager);
    expect(joiManager.defaultOptions).toEqual({});

    joiManager.add('number', Joi.number());
    joiManager.get('number');
    joiManager.validate('number', 1);
});
