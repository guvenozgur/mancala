"use strict"

const router = require('express').Router();
const {routeMappings} = require('../../config/Mappings');
const {generateAccessToken} = require('../service/Authentication');
const {createPlayer} = require('../service/PlayerService')

module.exports = ()=>{
    router.get(routeMappings.LOGIN, async (req, res) => {
        try {
            const token = generateAccessToken({username: req.query.username})
            res.cookie("mancalaToken", token, { expires: new Date(Date.now() + 900000), httpOnly: true });
            res.send("Login successful");
        } catch (err) {
            res.status(500).json({message: err.message});
        }

    });
    return router;
}


