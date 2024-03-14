var express = require('express');
var router = express.Router();
const { login } = require('../constructor/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    const result = login(username, password)
    return result.then(data => {
        if (data.username) {
            req.session.username = data.username;
            req.session.password = data.password;
            res.json(new SuccessModel(data))
            return
        }
        res.json(new ErrorModel('登录失败'))

    })

});

module.exports = router;
