const express = require('express'); 
const app = express()

app.use( (req, res, next) =>{
    res.status(200).json({
        message: 'Hey, we will be just fine, just keep pushing bro..'
    });
});

module.exports = app