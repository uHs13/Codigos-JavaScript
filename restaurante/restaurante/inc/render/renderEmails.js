module.exports = {

    render(req, res, error = null, success = null) {

        res.render('emails', {
            title: 'Restaurante Saboroso !',
            body: req.body,
            error,
            success
        });

    }

};