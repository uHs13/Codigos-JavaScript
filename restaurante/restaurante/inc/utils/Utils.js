class Utils {

    static replaceInvalidChars(value) {

        return value.replace('*', '^*^')
            .replace('&', '^&^')
            .replace('/', '^/^')
            .replace('<', '')
            .replace('>', '')
            .replace('"', '')
            .replace("'", '');

    }
    // .replaceInvalidChars

    static sanitize(string) {

        let sanitized = [];

        string.split('').forEach(slice => {

            /**
             * Maximum call stack size exceeded :<
             */

            sanitized.push(Utils.sanitize(slice));

        });

        return sanitized.join('');

    }
    // .sanitize

    static safeEntry(value) {

        switch (typeof value) {

            case 'object':

                Object.keys(value).forEach(key => {

                    if (typeof value[key] === 'string') {

                        value[key] = Utils.sanitize(value[key]);

                    }

                });

                return value;

                break;

            case 'string':
            case 'number':

                return Utils.sanitize(value[key]);

                break;

        }
        // .switch

    }
    // .safeEntry

}
// .Utils

module.exports = Utils;