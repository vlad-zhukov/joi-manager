/* eslint-disable no-underscore-dangle */

import * as Joi from 'joi';
import JoiManager from '../src/index';

const NUMBER__ = 12345;
const STRING__ = 'boo!';
const NULL__ = null;
const SYMBOL__ = Symbol(STRING__);

const schemaName = 'schema-name/number';
const schema = Joi.number()
    .min(0)
    .max(1);
const validValue = 0.5;

describe('JoiManager#validate()', () => {
    it('should return an input value if valid', () => {
        const joiManager = new JoiManager();
        joiManager.add(schemaName, schema);

        const value = joiManager.validate(schemaName, validValue);
        expect(value).toBe(validValue);
    });

    it('should throw if validation failed', () => {
        const joiManager = new JoiManager();
        joiManager.add(schemaName, schema);

        expect(() => joiManager.validate(schemaName, STRING__)).toThrow(Error);
    });

    it('should throw if a schema with provided name was not added to the list', () => {
        const joiManager = new JoiManager();

        expect(() => joiManager.validate(schemaName, NUMBER__)).toThrow(Error);
    });

    it('should throw if "defaultOptions" is not an object', () => {
        const joiManager = new JoiManager();
        joiManager.add(schemaName, schema);

        expect(() => joiManager.validate(schemaName, NUMBER__, NULL__)).toThrow(TypeError);
        expect(() => joiManager.validate(schemaName, NUMBER__, NUMBER__)).toThrow(TypeError);
        expect(() => joiManager.validate(schemaName, NUMBER__, STRING__)).toThrow(TypeError);
        expect(() => joiManager.validate(schemaName, NUMBER__, SYMBOL__)).toThrow(TypeError);
    });
});
