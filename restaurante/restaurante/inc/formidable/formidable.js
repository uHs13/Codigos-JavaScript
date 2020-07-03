var path = require('path');
let formidable = require('formidable');

module.exports = function (req, res, next) {

    if (req.method.toLowerCase() === 'post') {

        let form = formidable.IncomingForm({
            uploadDir: path.join(__dirname, './../../public/images'),
            keepExtensions: true
        });

        form.parse(req, function (error, fields, files) {

            req.fields = fields;
            req.files = files;

            next();

        });

    } else {

        next();

    }

};