joi-manager
===========
> Manage Joi schemes with joy.

## API
### `new JoiManager([defaultOptions])`

__Arguments__
- `[defaultOptions]` _(Object)_: Optional.

---

### `JoiManager`

__Methods__
- `add(schemaName, schema) → _this_`
- `get(schemaName) → _schema_`
- `validate(value, schemaName, options) → _Promise<value>_`
