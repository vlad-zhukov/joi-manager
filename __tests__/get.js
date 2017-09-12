/* eslint-disable no-underscore-dangle */

import * as Joi from 'joi';
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

describe('JoiManager#get()', () => {
    it('should get schemas from the list', () => {
        const joiManager = new JoiManager();

        joiManager.add(schemaName, schema);
        joiManager.add(schemaName2, schema);

        expect(joiManager.get(schemaName)).toBe(schema);
        expect(joiManager.get(schemaName2)).toBe(schema);
    });

    it('should throw if "schemaName" is not a string', () => {
        const joiManager = new JoiManager();

        expect(() => joiManager.get()).toThrow(TypeError);
        expect(() => joiManager.get(NUMBER__)).toThrow(TypeError);
        expect(() => joiManager.get(OBJECT__)).toThrow(TypeError);
        expect(() => joiManager.get(NULL__)).toThrow(TypeError);
        expect(() => joiManager.get(SYMBOL__)).toThrow(TypeError);
    });

    it('should throw if a schema with provided name was not added to the list', () => {
        const joiManager = new JoiManager();

        expect(() => joiManager.get(schemaName)).toThrow(Error);
        expect(() => joiManager.get(schemaName2)).toThrow(Error);
    });

    it('should support nested schemas', () => {
        const joiManager = new JoiManager();
        const nestedSchemaName = 'nested-schema';

        joiManager.add(schemaName, schema);

        expect(() =>
            joiManager.add(
                nestedSchemaName,
                Joi.object({
                    number: joiManager.get(schemaName),
                })
            )).not.toThrow();

        expect(joiManager.schemaList).toHaveProperty(schemaName, schema);
        expect(joiManager.schemaList).toHaveProperty(nestedSchemaName);
    });
});
