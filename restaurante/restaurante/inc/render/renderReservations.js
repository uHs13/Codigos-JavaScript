module.exports = {

    render (req, res, error = null) {

        res.render('reservations', {
            title: 'Restaurante Saboroso !',
            body: req.body,
            error
        });

    }
    // .render

};