module.exports = {

    assign(req) {

        return Object.assign(
            {},
            req.files,
            req.fields
        )

    }

}