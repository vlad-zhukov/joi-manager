/* eslint-disable no-underscore-dangle */

import Joi from 'joi';
import JoiManager from '../src/index';

const NUMBER__ = 12345;
const STRING__ = 'boo!';
const OBJECT__ = {};
const NULL__ = null;
const SYMBOL__ = Symbol(STRING__);

const schemaName = 'random-schema-name/number';
const schemaName2 = 'random-schema-name/number2';
const schema = Joi.number()
    .min(0)
    .max(1);

describe('JoiManager#add()', () => {
    it('should add new schemas to the list', () => {
        const joiManager = new JoiManager();

        expect(() => joiManager.add(schemaName, schema)).not.toThrow();
        expect(() => joiManager.add(schemaName2, schema)).not.toThrow();

        expect(joiManager.schemaList).toHaveProperty(schemaName, schema);
        expect(joiManager.schemaList).toHaveProperty(schemaName2, schema);
    });

    it('should throw if "schemaName" is not a string', () => {
        const joiManager = new JoiManager();

        expect(() => joiManager.add(undefined, schema)).toThrow(TypeError);
        expect(() => joiManager.add(NUMBER__, schema)).toThrow(TypeError);
        expect(() => joiManager.add(OBJECT__, schema)).toThrow(TypeError);
        expect(() => joiManager.add(NULL__, schema)).toThrow(TypeError);
        expect(() => joiManager.add(SYMBOL__, schema)).toThrow(TypeError);
    });

    it('should throw if "schema" is not defined', () => {
        const joiManager = new JoiManager();

        expect(() => joiManager.add(schemaName)).toThrow(TypeError);
        expect(() => joiManager.add(schemaName, NULL__)).toThrow(TypeError);
    });

    it('should throw if a schema with provided name already exists', () => {
        const joiManager = new JoiManager();

        expect(() => joiManager.add(schemaName, schema)).not.toThrow();
        expect(() => joiManager.add(schemaName, schema)).toThrow(Error);
    });

    it('should be chainable', () => {
        const joiManager = new JoiManager();

        expect(() => joiManager.add(schemaName, schema).add(schemaName2, schema)).not.toThrow();

        expect(joiManager.schemaList).toHaveProperty(schemaName, schema);
        expect(joiManager.schemaList).toHaveProperty(schemaName2, schema);
    });
});
