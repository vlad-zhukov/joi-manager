joi-manager · [![npm](https://img.shields.io/npm/v/joi-manager.svg)](https://www.npmjs.com/package/joi-manager)
===========
> Manage Joi schemas with joy.

## API
### `new JoiManager([defaultOptions])`

__Arguments__
- `[defaultOptions]` _(Object)_: Optional. Options that will be passed to `Joi.validate`.

__Returns__

`JoiManager` instance.

---

### `JoiManager`

__Methods__
- `add(schemaName, schema)` → _this_: Adds a new schema to the list.
- `get(schemaName)` → _schema_: Retrieves a schema from the list by its name.
- `validate(value, schemaName, [options])` → _Promise_: `options` are merged with `defaultOptions`.
