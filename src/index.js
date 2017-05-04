import bluebird from 'bluebird';
import {validate} from 'joi';

const validateAsync = bluebird.promisify(validate);

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

        if (this.schemaList.hasOwnProperty(schemaName)) {
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

        if (!this.schemaList.hasOwnProperty(schemaName)) {
            throw new Error(`Schema with name "${schemaName}" was not found in the list.`);
        }

        return this.schemaList[schemaName];
    }

    /**
     * Promisified wrapper around Joi.validate().
     * @param value {Object}
     * @param schemaName {String}
     * @param options {Object}
     * @return {bluebird<Object|Error>}
     */
    validate(value, schemaName, options = {}) {
        if (options === null || typeof options !== 'object') {
            throw new TypeError('Argument "options" expected to be an object.');
        }

        return validateAsync(value, this.get(schemaName), {...this.defaultOptions, ...options});
    }
}
