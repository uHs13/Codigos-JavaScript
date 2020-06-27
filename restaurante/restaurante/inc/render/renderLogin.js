module.exports = {

    render(req, res, error = null, success = null) {

        res.render('admin/login', {
            title: 'Administração Saboroso !',
            body: req.body,
            error,
            success
        });

    }

};