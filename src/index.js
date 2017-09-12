import * as Joi from 'joi';

export default class JoiManager {
    /**
     * @param defaultOptions {Object}
     */
    constructor(defaultOptions = {}) {
        if (defaultOptions === null || typeof defaultOptions !== 'object') {
            throw new TypeError('Argument "defaultOptions" expected to be an object.');
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
        if (typeof schemaName !== 'string') {
            throw new TypeError(`Argument "schemaName" expected to be a string, but got ${typeof schemaName}.`);
        }

        if (schema == null) {
            throw new TypeError('Argument "schema" is required.');
        }

        if ({}.hasOwnProperty.call(this.schemaList, schemaName)) {
            throw new Error(`Schema with name "${schemaName}" already exists in the list.`);
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
        if (typeof schemaName !== 'string') {
            throw new TypeError(`Argument "schemaName" expected to be a string, but got ${typeof schemaName}.`);
        }

        if (!{}.hasOwnProperty.call(this.schemaList, schemaName)) {
            throw new Error(`Schema with name "${schemaName}" was not found in the list.`);
        }

        return this.schemaList[schemaName];
    }

    /**
     * Wrapper around Joi.validate() that throws on validation errors.
     * @param value {*}
     * @param schemaName {String}
     * @param options {Object}
     * @return {*}
     */
    validate(value, schemaName, options = {}) {
        if (options === null || typeof options !== 'object') {
            throw new TypeError('Argument "options" expected to be an object.');
        }

        const result = Joi.validate(value, this.get(schemaName), Object.assign({}, this.defaultOptions, options));

        if (result.error !== null) {
            throw new Error(result.error.message);
        }

        return result.value;
    }
}
