const jwt = require("jsonwebtoken");
const config = require('../../config/Config');
const {routeMappings} = require('../../config/Mappings');

module.exports.auth= async (req, res, next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    try{
        await this._auth(token);
        next();
    }catch (e){
        res.redirect(`/auth/${routeMappings.LOGIN}`);
    }
}

module.exports._auth = (token)=>{
    return new Promise((resolve, reject)=>{
        if (token == null) reject(`Token can not be null..`);

        jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user)=>{
            if(err) reject(`Token is not valid..`);
            resolve(user);
        })
    })
}

module.exports.generateAccessToken = (username, ip)=>{
    return jwt.sign(username, config.ACCESS_TOKEN_SECRET, {expiresIn: config.JWT_EXPIRE_TIME});
}