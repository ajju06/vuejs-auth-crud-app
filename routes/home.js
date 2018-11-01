var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = require('../models/users.js');
const { hashSync, compareSync } = require('bcrypt');
const { sign, verify } = require('jsonwebtoken');

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
//   Book.find(function (err, products) {
//     if (err) return next(err);
//     res.json(products);
//   });
});

let getEmail = function (email) {
    promise = new Promise(function (resolve, reject) {
        Users.find({ email: email }).exec().then((users, err) => {
            if (users.length) {
                reject('That username already exist');
            } else {
                resolve('not exist')
            }
        })
    })

    return promise;
}

router.post('/signup', function (req, res) {
    console.log("signup called >>>>")
    console.log('req ==>', req)
    console.log("req.body", req.body)
    getEmail(req.body.email).then((result) => {
        let user = new Users({ email: req.body.email, password: hashSync(req.body.password, 2) });
        user.save().then((user) => {
            console.log("user", user)
            res.send(JSON.stringify({ status: 1, code: 200, message: 'you are successfully register...' }));
        })
    }).catch((err) => {
        console.log("err >>>>>>>>>>>>>>", err)
        res.status(409);
        res.send(err);
    })
})


let attempt = function (email, password) {
    promise = new Promise(function (resolve, reject) {
        Users.find({ email: email }).exec().then((users) => {
            console.log("users", users)
            if (!users.length) {
                // res.status(401);
                reject("That user does not exist");
                // throw createError(401, 'That user does not exist');
            } else {
                const user = users[0];
                if (!compareSync(password, user.password)) {
                    // res.status(401);
                    reject("password doesn't match");
                    // throw createError(401, "password doesn't match");
                } else {
                    resolve(user);
                }
            }
        })
    })
    return promise;
};

router.post('/login', function (req, res) {
    // console.log("req.body.username",req.body.username)

    attempt(req.body.email, req.body.password).then((data) => {
        console.log("data", data)

        payload = {
            "userId": data._id,
            "iat": Math.floor(Date.now() / 1000) - 30,
            "exp": Math.floor(Date.now() / 1000) + (60 * 60),
            "aud": "https://yourdomain.com",
            "iss": "feathers",
            "sub": "anonymous"
        }
        console.log("payload", payload)
        let token = sign(payload, 'abcabcabcabc')
            console.log("token", token)
            // res.cookie("auth_token", token, { "path": "/view" });
            // res.redirect('/view');
        // res.render('view',{})
        res.send(JSON.stringify({ status: 1, code: 200, message: 'you are successfully login...' ,logintoken:token}));

    }).catch((err) => {
        console.log("err >>>>>", err)
        // res.redirect('/');
        // res.status(401);
        // res.send(err);
    })
})

  module.exports = router;