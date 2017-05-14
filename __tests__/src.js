/* eslint-disable no-underscore-dangle */

import Joi from 'joi';
import JoiManager from '../src/joi-manager';

const NUMBER__ = 12345;
const STRING__ = 'boo!';
const OBJECT__ = {};
const NULL__ = null;
const SYMBOL__ = Symbol(STRING__);

describe('It should construct', () => {
    test('it should construct with 0 or 1 arguments', (done) => {
        expect(new JoiManager()).toBeInstanceOf(JoiManager);
        expect(new JoiManager(OBJECT__)).toBeInstanceOf(JoiManager);
        expect(new JoiManager({joi: STRING__})).toBeInstanceOf(JoiManager);
        expect(new JoiManager(new Error())).toBeInstanceOf(JoiManager);

        expect(new JoiManager(OBJECT__).defaultOptions).toBe(OBJECT__);

        done();
    });

    test('it should throw if "defaultOptions" is not an object', (done) => {
        expect(() => new JoiManager(NULL__)).toThrow(TypeError);
        expect(() => new JoiManager(NUMBER__)).toThrow(TypeError);
        expect(() => new JoiManager(STRING__)).toThrow(TypeError);
        expect(() => new JoiManager(SYMBOL__)).toThrow(TypeError);

        done();
    });

    test('"defaultOptions" should default to an empty object', (done) => {
        const joiManager = new JoiManager();

        expect(joiManager.defaultOptions).toEqual({});
        expect(Object.keys(joiManager.defaultOptions)).toHaveLength(0);

        done();
    });
});

describe('It should have "add" method', () => {
    const schemaName = 'random-schema-name/number';
    const schemaName2 = 'random-schema-name/number2';
    const schema = Joi.number().min(0).max(1);

    test('it should add new schemas to the list', (done) => {
        const joiManager = new JoiManager();

        expect(() => joiManager.add(schemaName, schema)).not.toThrow();
        expect(() => joiManager.add(schemaName2, schema)).not.toThrow();

        expect(joiManager.schemaList).toHaveProperty(schemaName, schema);
        expect(joiManager.schemaList).toHaveProperty(schemaName2, schema);

        done();
    });

    test('it should throw if "schemaName" is not a string', (done) => {
        const joiManager = new JoiManager();

        expect(() => joiManager.add(undefined, schema)).toThrow(TypeError);
        expect(() => joiManager.add(NUMBER__, schema)).toThrow(TypeError);
        expect(() => joiManager.add(OBJECT__, schema)).toThrow(TypeError);
        expect(() => joiManager.add(NULL__, schema)).toThrow(TypeError);
        expect(() => joiManager.add(SYMBOL__, schema)).toThrow(TypeError);

        done();
    });

    test('it should throw if "schema" is not defined', (done) => {
        const joiManager = new JoiManager();

        expect(() => joiManager.add(schemaName)).toThrow(TypeError);
        expect(() => joiManager.add(schemaName, NULL__)).toThrow(TypeError);

        done();
    });

    test('it should throw if a schema with provided name already exists', (done) => {
        const joiManager = new JoiManager();

        expect(() => joiManager.add(schemaName, schema)).not.toThrow();
        expect(() => joiManager.add(schemaName, schema)).toThrow(Error);

        done();
    });

    test('it should be chainable', (done) => {
        const joiManager = new JoiManager();

        expect(() => joiManager.add(schemaName, schema).add(schemaName2, schema)).not.toThrow();

        expect(joiManager.schemaList).toHaveProperty(schemaName, schema);
        expect(joiManager.schemaList).toHaveProperty(schemaName2, schema);

        done();
    });
});

describe('It should have "get" method', () => {
    const schemaName = 'random-schema-name/number';
    const schemaName2 = 'random-schema-name/number2';
    const schema = Joi.number().min(0).max(1);

    test('it should get schemas from the list', (done) => {
        const joiManager = new JoiManager();

        joiManager.add(schemaName, schema);
        joiManager.add(schemaName2, schema);

        expect(joiManager.get(schemaName)).toBe(schema);
        expect(joiManager.get(schemaName2)).toBe(schema);

        done();
    });

    test('it should throw if "schemaName" is not a string', (done) => {
        const joiManager = new JoiManager();

        expect(() => joiManager.get()).toThrow(TypeError);
        expect(() => joiManager.get(NUMBER__)).toThrow(TypeError);
        expect(() => joiManager.get(OBJECT__)).toThrow(TypeError);
        expect(() => joiManager.get(NULL__)).toThrow(TypeError);
        expect(() => joiManager.get(SYMBOL__)).toThrow(TypeError);

        done();
    });

    test('it should throw if a schema with provided name was not added to the list', (done) => {
        const joiManager = new JoiManager();

        expect(() => joiManager.get(schemaName)).toThrow(Error);
        expect(() => joiManager.get(schemaName2)).toThrow(Error);

        done();
    });

    test('it should support nested schemas', (done) => {
        const joiManager = new JoiManager();
        const nestedSchemaName = 'nested-schema';

        joiManager.add(schemaName, schema);

        expect(() =>
            joiManager.add(
                nestedSchemaName,
                Joi.object({
                    number: joiManager.get(schemaName),
                })
            )
        ).not.toThrow();

        expect(joiManager.schemaList).toHaveProperty(schemaName, schema);
        expect(joiManager.schemaList).toHaveProperty(nestedSchemaName);

        done();
    });
});

describe('It should have "validate" method', () => {
    const schemaName = 'random-schema-name/number';
    const schema = Joi.number().min(0).max(1);
    const correctValue = 0.5;

    test('it should return a promise', (done) => {
        const joiManager = new JoiManager();
        joiManager.add(schemaName, schema);

        joiManager.validate(correctValue, schemaName).then((value) => {
            expect(value).toBe(correctValue);

            done();
        });
    });

    test('it should reject a promise if validation failed', (done) => {
        const joiManager = new JoiManager();
        joiManager.add(schemaName, schema);

        joiManager.validate(NUMBER__, schemaName).catch((error) => {
            expect(error).toBeInstanceOf(Error);

            done();
        });
    });

    test('it should throw if a schema with provided name was not added to the list', (done) => {
        const joiManager = new JoiManager();

        expect(() => joiManager.validate(NUMBER__, schemaName)).toThrow(Error);

        done();
    });

    test('it should throw if "defaultOptions" is not an object', (done) => {
        const joiManager = new JoiManager();
        joiManager.add(schemaName, schema);

        expect(() => joiManager.validate(NUMBER__, schemaName, NULL__)).toThrow(TypeError);
        expect(() => joiManager.validate(NUMBER__, schemaName, NUMBER__)).toThrow(TypeError);
        expect(() => joiManager.validate(NUMBER__, schemaName, STRING__)).toThrow(TypeError);
        expect(() => joiManager.validate(NUMBER__, schemaName, SYMBOL__)).toThrow(TypeError);

        done();
    });
});
