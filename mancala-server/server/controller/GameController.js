"use strict"

const router = require('express').Router();
const {routeMappings} = require('../../config/Mappings');
const gameService = require('../service/GameService')
const {auth} = require('../service/Authentication')

module.exports = ()=>{
    router.get(routeMappings.CREATE, async (req, res) => {
        try {
            res.status(201).json(await gameService().createGame(req.params.gameName, req.params.playerOneId, req.params.playerTwoId));
        } catch (err) {
            res.status(500).json({message: err.message});
        }

    });

    router.get(routeMappings.JOIN, async (req, res) => {
        try{
            res.status(201).json(await gameService().join(req.params.gameName, req.params.playerTwoId));
        }catch (err){
            res.status(500).json({message: err.message});
        }
    });

    router.get(routeMappings.MOVE, async (req, res) => {
        try{
            res.status(201).json(await gameService().move(req.params.playerId, req.params.pitId));
        }catch (err){
            res.status(500).json({message: err.message});
        }
    })

    router.get(routeMappings.GET_ALL_GAMES, async (req, res) => {
        try {
            res.status(201).json(await gameService().getAllGames());
        } catch (err) {
            res.status(500).json({message: err.message});
        }

    })

    router.get(routeMappings.DELETE_GAMES, async (req, res) => {
        try {
            res.status(201).json(await gameService().deleteGame());
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    })

    router.get(routeMappings.DELETE_ALL_PLAYERS, async (req, res) => {
        try {
            res.status(201).json(await gameService().deleteAllPlayers());
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    })

    router.get(routeMappings.GET_CACHED_GAMES, async (req, res) => {
        try {
            res.status(201).json(await gameService().getCachedGames());
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    })


    return router;
}


