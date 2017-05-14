/* eslint-disable no-underscore-dangle */

import JoiManager from '../dist/joi-manager.cjs';

const NUMBER__ = 12345;
const STRING__ = 'boo!';
const OBJECT__ = {};
const NULL__ = null;
const SYMBOL__ = Symbol(STRING__);

describe('import-bundle-cjs-as-es', () => {
    it('should construct with 0 or 1 arguments', () => {
        expect(new JoiManager()).toBeInstanceOf(JoiManager);
        expect(new JoiManager(OBJECT__)).toBeInstanceOf(JoiManager);
        expect(new JoiManager({joi: STRING__})).toBeInstanceOf(JoiManager);
        expect(new JoiManager(new Error())).toBeInstanceOf(JoiManager);

        expect(new JoiManager(OBJECT__).defaultOptions).toBe(OBJECT__);
    });

    it('should throw if "defaultOptions" is not an object', () => {
        expect(() => new JoiManager(NULL__)).toThrow(TypeError);
        expect(() => new JoiManager(NUMBER__)).toThrow(TypeError);
        expect(() => new JoiManager(STRING__)).toThrow(TypeError);
        expect(() => new JoiManager(SYMBOL__)).toThrow(TypeError);
    });

    test('"defaultOptions" should default to an empty object', () => {
        const joiManager = new JoiManager();

        expect(joiManager.defaultOptions).toEqual({});
        expect(Object.keys(joiManager.defaultOptions)).toHaveLength(0);
    });
});
