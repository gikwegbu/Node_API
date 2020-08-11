const express = require('express');
const router = express.Router(); 
const mongoose  = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user'); 

router.get('/', (req, res) => {
    User.find()
    .select('email password')
    .exec()
    .then(result => {
        if (result) {
            const users = result.map(user =>{
               return{ 
                   _id: user._id,
                    email: user.email,
                    password: user.password
                } 
            });
            res.status(200).json({
                status: "Success",
                users: users
            })
        }else{
            res.status(404).json({
                status: "Failed",
                message: "Users Not Found."
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            status: "Failed",
            message: err
        });
    })
});

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})/* Checking if user with email exist already */
    .exec()
    .then(result => {
        if(result.length){
            return res.status(409).json({
                status: "Failed",
                message: `Oops!!! User with email ${req.body.email} already exist in our Database`
            });
        }else{ 
            /* 
                The below happens with the help of the bcrypt package installed
                where the incoming password gets hashed, with a strength of 10, then
                a callback function of error and hash, which on error of the promise, 
                an error is thrown and sent but on success, the newly 
                hashed passed gets passed along to the new creation of the user.
            */
            bcrypt.hash( req.body.password, 10, (err, hash) => { 
                if (err) {
                    return res.status(500).json({
                        status: "Failed",
                        message: err,
                    });
                }else{ 
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    user.save()
                    .then( result => {
                        res.status(201).json({
                            status: "Success",
                            message: "User Created"
                        });
                        console.log(result)
                    })
                    .catch(err => {
                        res.status(500).json({
                            status: "Failed",
                            message: err
                        });
                    })
                }
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            status: "Failed",
            message: err
        });
    })
});


router.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    status: "Failed",
                    message: "Invalid Credentials."
                });
            }
            // user[0] is used to grab the first user from the array because i used
            // User.find, had i used User.findOne, then i won't be needing the zero index.
            bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
                if (err) {
                    return res.status(401).json({
                        status: "Failed",
                        message: "Invalid Credentials."
                    });
                }
                if (result) {
                    // The token runs asyn
                    const token = jwt.sign(
                        {
                            email: req.body.email,
                            userId: user[0]._id
                        },
                        process.env.JWT_SECRET_KEY, /* This is the key used to create the token */
                        {
                            expiresIn: "1h" /* Time set for the token to expire, could be set in seconds or string equivalent */
                        }
                    )
                    return res.status(200).json({
                        status: "Success",
                        message: "Login Successful.",
                        token: token
                    });
                }
                res.status(401).json({
                    status: "Failed",
                    message: "Invalid Credentials."
                });
            })
        } )
        .catch(err => {
            console.log(err)
            res.status(500).json({
                status: "Failed",
                message: err
            });
        })
});


router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    User.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            status: "Success",
            message: `User Deleted.`
        });
    })
    .catch(err => {
        res.status(500).json({
            status: "Failed",
            message: err
        });
    })
});


module.exports = router