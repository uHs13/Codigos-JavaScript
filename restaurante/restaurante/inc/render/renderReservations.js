module.exports = {

    render (req, res, error = null, success = null) {

        res.render('reservations', {
            title: 'Restaurante Saboroso !',
            body: req.body,
            error,
            success
        });

    }
    // .render

};