## Things To Install
    Running your npm install, would literally download and install the following dependencies:
    1. Express
    2. mongoose
    3. Nodemon
    4. bodyparser
    5. morgan (for logging)
    6. multer (for accepting multipartform data)
    7. dotenv
    8. Node.bcrypt.js (for hashing passwords, npm install bcrypt --save)
    9. jsonwebtoken

### Structurings
1. The server.js contains the server setting, which would require the app.js and pass it unto the createServer()

2. The app.js, houses all my system configs.

3. An upload folder will be automatically created as a result of the configuration passed to the multer when it's being initialised.

4. To use clone, download or fork this repo, do well to add '.env' file which would contain the following 
    1. MongoDb_Username 
    2. MongoDb_Password 
    3. MongoDb_Name 
    4. JWT_SECRET_KEY (This could be any word you wish to use to encrypt your JWT)

    NB: Get you mongoDb settings from the official site, when you register

## MVC Model
    This RESTful API, completes the models, and controllers, but the view is absent as it's just a public api.

## Documentation
    This API is divided into three(3) major Routes
    1. The Users 
    2. The Products
    3. The Orders 




##### Built with 💖💖 By [George Ikwegbu](http://my-portfolio-29d3f.web.app/)
