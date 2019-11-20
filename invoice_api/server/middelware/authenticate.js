var jwt = require('jsonwebtoken');
var config = require('../config/environment');
var User = require('../api/user/user.model');

//
// authenticate examines the request cookies for a cookie named
// 'token'. If the token cookie exists, is correctly decoded, 
// and hasn't expired then this method will attempt to retrieve
// the session and attach it and the session user to the request
// object for use by downstream filters.
//
exports.authenticate = function (req, res, next) {
    // do we have a cookie token?
    if (req.cookies.token === undefined) {
        res.status(401);
        res.end();
    }
    else {
        // get token details (user id)
        // if user doesnt exist it will return an error. 
        // this means, by the time we hit the controller, there is a user in the request
        jwt.verify(req.cookies.token, config.secrets.session, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                // id from parsed token
                const userId = decoded._id;
                console.log('Userid logging in ' + userId); // handy debugging
                // add user details based on token        
                User.findById(userId, function (err, user) {
                    if (err) return next(err);
                    if (!user) return res.status(401).send('Unauthorized');
                    req.user = user; 
                    next();
                });
            }
        });
    }    
};