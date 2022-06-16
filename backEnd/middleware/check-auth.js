const jwt= require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        console.log('here')
        console.log(req.headers.authorization.split(" ")[1])
        console.log('here2')
        // split white space and get token
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET);
        console.log('got here')
        // res.status(200).json({message:"success"})
        next();
        
    }
    catch (error) {
        res.status(401).json({message: "Auth failed!"});
    }

};