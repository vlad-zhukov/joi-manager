export default function type(value) {
    if (value === null) {
        return 'null';
    }
    if (value === undefined) {
        return 'undefined';
    }
    return typeof value;
}
