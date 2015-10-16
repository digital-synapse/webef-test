export class JSON2 {
    public static parse(str) {
        var iso8061 = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
        return JSON.parse(str, function (key, value) {
            if (typeof value != 'string') return value;
            if (value.length < 8) return value;
            if (iso8061 && value.match(iso8061)) return new Date(value);
            if (value.substring(0, 8) === 'function') return eval('(' + value + ')');
            if (value.substring(0, 8) === '_PxEgEr_') return eval(value.slice(8));
            return value;
        });
    }

    public static stringify(obj) {
        return JSON.stringify(obj, function (key, value) {
            if (value instanceof Function || typeof value == 'function') {
              return value.toString();
            }
            if (value instanceof RegExp) {
              return '_PxEgEr_' + value;
            }
            return value;
        });
    }
}