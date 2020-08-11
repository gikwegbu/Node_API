const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
   try {
       /* 
        * 1. i either allow user pass the token along with the body of the sent data or
        * 2. Using axios, and setting the heead auth from the client, so i can grab it like below
       */
       const token = req.headers.authorization.split(" ")[1]; /* When this is gotten, the Bearer with white space comes with it, so splitting it with white space and picking the second, which is the token itself */
       const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
       req.userData = decoded;
       /* 
        * The above code is from jwt, where the verify decodes the token then verify
        * if it's authentic, you could just use jwt.decode(), but that will only decode and
        * not verify .
       */
      next();/* If verification was successful, it calls the next event in line. */
   } catch (error) {
       res.status(401).json({
           status: "Failed",
           message: "Unaunthenticated User."
       });
   }
};