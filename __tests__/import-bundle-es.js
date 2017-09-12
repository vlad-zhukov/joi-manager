import * as Joi from 'joi';
import JoiManager from '../dist/joi-manager.es';

test('import-bundle-es', () => {
    const joiManager = new JoiManager();
    expect(joiManager).toBeInstanceOf(JoiManager);
    expect(joiManager.defaultOptions).toEqual({});

    joiManager.add('number', Joi.number());
    joiManager.get('number');
    joiManager.validate(1, 'number');
});
