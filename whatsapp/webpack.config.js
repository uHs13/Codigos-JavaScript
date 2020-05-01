const path = require("path");

module.exports = {

    entry: "./js/app.js",
    output: {
        filename: "whatsapp.bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "dist"
    }

}