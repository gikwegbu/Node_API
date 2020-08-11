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

## MVC Model
    This RESTful API, completes the models, and controllers, but the view is absent as it's just a public api.

#Built with 💖💖 By [George Ikwegbu](http://my-portfolio-29d3f.web.app/)
