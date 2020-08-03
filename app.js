const express = require('express'); 
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 

// This is used to install the dotenv package
require('dotenv').config() 

const morgan = require('morgan') 

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/order')

mongoose.connect('mongodb+srv://mr-browny:yHtohdj1dOB2mm37@node-rest-api-f7u4e.mongodb.net/noderestapi?retryWrites=true&w=majority', 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })

// mongoose.connect(`
//     mongodb+srv://${process.env.MongoDb_Username}:${process.env.MongoDb_Password}@node-rest-api-f7u4e.mongodb.net/${process.env.MongoDb_Name}?retryWrites=true&w=majority`,
//     { useNewUrlParser: true }
//     )

app.use(morgan('dev'))
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
// Routes which should handle request set up in the middleware
app.use('/products', productRoutes)
app.use('/orders', orderRoutes);


// This is for the cors
// This header(), contains 2 args, the first being the access-control-allow type, and the second, either '*' to accept all, or define things to accept
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') /* The asterix there means, any and every site can access this api, to restrict it, just enter the url of the site you wish to only access this api */
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') { /* This checks if the request has a method set to options, the the response header should accomodate the below methods set */
        res.header('Access-Control-All-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json();
    }
    next() /* Without this next() the routes below would be blocked,  */
});

// This phase catches any route that makes it past the above 
// routes, meaning it was not found
app.use( (req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404

    next(error) 
});

// An additions arg 'error' is passed to it, which was sent by the 
// next(error) above, to alert the client that an error occured
// either from the server of ENOENTres.status(value);

// So in otherwords, the below block is used to capture both the server error
// and errors aroused as a result of client hiting a wrong endPoint
app.use( (error, req, res, next) =>{
     res.status(error.status || 500).json({
         status: 'Failed',
         message: error.message
     });
});

module.exports = app