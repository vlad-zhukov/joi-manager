import * as Joi from 'joi';
import type from './type';

export default class JoiManager {
    /**
     * @param defaultOptions {Object}
     */
    constructor(defaultOptions = {}) {
        const defaultOptionsType = type(defaultOptions);
        if (defaultOptionsType !== 'object') {
            throw new TypeError(`Argument 'defaultOptions' must to be an object, but got: '${defaultOptionsType}'`);
        }

        this.defaultOptions = defaultOptions;
        this.schemaList = {};
    }

    /**
     * Adds validation schema to the list.
     * @param schemaName {String}
     * @param schema {Function|Object|Joi.any}
     * @return {this}
     */
    add(schemaName, schema) {
        const schemaNameType = type(schemaName);
        if (schemaNameType !== 'string') {
            throw new TypeError(`Argument 'schemaName' must to be a string, but got '${schemaNameType}'.`);
        }

        const schemaType = type(schema);
        if (schemaType === 'null' || schemaType === 'undefined') {
            throw new TypeError(`Argument 'schema' is required, but got: '${schemaType}'`);
        }

        if ({}.hasOwnProperty.call(this.schemaList, schemaName)) {
            throw new Error(`Schema with name '${schemaName}' has been already added to the list.`);
        }

        this.schemaList[schemaName] = schema;
        return this;
    }

    /**
     * Get validation schema from the list by its name.
     * @param schemaName {String}
     * @return {Function|Object}
     */
    get(schemaName) {
        const schemaNameType = type(schemaName);
        if (schemaNameType !== 'string') {
            throw new TypeError(`Argument 'schemaName' must to be a string, but got '${schemaNameType}'.`);
        }

        if (!{}.hasOwnProperty.call(this.schemaList, schemaName)) {
            throw new Error(`Schema with name '${schemaName}' has been already added to the list.`);
        }

        return this.schemaList[schemaName];
    }

    /**
     * Wrapper around Joi.validate() that throws on validation errors.
     * @param schemaName {String}
     * @param value {*}
     * @param options {Object}
     * @return {*}
     */
    validate(schemaName, value, options = {}) {
        const schemaNameType = type(schemaName);
        if (schemaNameType !== 'string') {
            throw new TypeError(`Argument 'schemaName' must to be a string, but got '${schemaNameType}'.`);
        }

        const optionsType = type(options);
        if (optionsType !== 'object') {
            throw new TypeError(`Argument 'options' must to be an object, but got '${optionsType}'.`);
        }

        const result = Joi.validate(value, this.get(schemaName), Object.assign({}, this.defaultOptions, options));

        if (result.error !== null) {
            throw new Error(result.error.message);
        }

        return result.value;
    }
}
