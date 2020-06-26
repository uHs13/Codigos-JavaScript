module.exports = {

    render(req, res, error = null, success = null) {

        res.render('contacts', {
            title: 'Restaurante Saboroso !',
            body: req.body,
            error,
            success
        });

    }

};