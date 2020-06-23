class Utils {

    static sanitize(value) {

        return value.replace('*', '')
        .replace('&', '')
        .replace('/', '')
        .replace('<', '')
        .replace('>', '')
        .replace('"', '')
        .replace("'", '');

    }
    // .sanitize

    static safeEntry(value) {

        switch (typeof value) {

            case 'object':

                

                break;

            case 'string':
            case 'number':



                break;

        }

    }
    // .safeEntry

}
// .Utils

module.exports = Utils;