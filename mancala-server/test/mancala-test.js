const assert = require('assert');
const sinon = require("sinon");

const Promise = require('bluebird');
const {move} = require('../server/service/GamePlay');
const redisHelper = require('../server/cache/Helper');

afterEach(()=>{
    sinon.verifyAndRestore();
})


describe("Cache Mocking", () => {
    describe("move", () => {
        it("first move", async () => {

            const mock = {
                numberOfPit: 12,
                numberOfSeedPerPit: 6,
                playerOneId: 'p1',
                playerTwoId: 'p2',
                turn: 'p1',
                board: {p1: {pits: [6, 6, 6, 6, 6, 6], treasure: 0}, p2: {pits: [6, 6, 6, 6, 6, 6], treasure: 0}}
            };

            sinon.stub(redisHelper, 'getBoard').callsFake((gameId) => {
                return mock
            });


            const result = await move('testGame', 'p1', 0);

            assert.deepEqual(result, {
                winner: undefined,
                game: {"numberOfPit":12,"numberOfSeedPerPit":6,"playerOneId":"p1","playerTwoId":"p2","turn":"p1","board":{"p1":{"pits":[0,7,7,7,7,7],"treasure":1},"p2":{"pits":[6,6,6,6,6,6],"treasure":0}}}
            });
        })

        it("should be end of the game, winner p1", async () => {

            const mock = {
                numberOfPit: 12,
                numberOfSeedPerPit: 6,
                playerOneId: 'p1',
                playerTwoId: 'p2',
                turn: 'p1',
                board: {p1: {pits: [0, 0, 0, 0, 0, 1], treasure: 40}, p2: {pits: [2, 0, 6, 1, 0, 0], treasure: 22}}
            };

            sinon.stub(redisHelper, 'getBoard').callsFake((gameId) => {
                return mock
            });


            const result = await move('testGame', 'p1', 5);

            assert.deepEqual(result, {
                game: {"numberOfPit":12,"numberOfSeedPerPit":6,"playerOneId":"p1","playerTwoId":"p2","turn":"p1","board":{"p1":{"pits":[0,0,0,0,0,0],"treasure":41},"p2":{"pits":[2,0,6,1,0,0],"treasure":22}}},
                winner: {
                    isEnded: true,
                    winner: 'p1'
                }
            });
        })

        it("should be end of the game, winner p2", async () => {

            const mock = {
                numberOfPit: 12,
                numberOfSeedPerPit: 6,
                playerOneId: 'p1',
                playerTwoId: 'p2',
                turn: 'p1',
                board: {p1: {pits: [0, 0, 0, 0, 0, 1], treasure: 22}, p2: {pits: [2, 0, 6, 1, 0, 0], treasure: 40}}
            };

            sinon.stub(redisHelper, 'getBoard').callsFake((gameId) => {
                return mock
            });


            const result = await move('testGame', 'p1', 5);

            assert.deepEqual(result, {
                game: {"numberOfPit":12,"numberOfSeedPerPit":6,"playerOneId":"p1","playerTwoId":"p2","turn":"p1","board":{"p1":{"pits":[0,0,0,0,0,0],"treasure":23},"p2":{"pits":[2,0,6,1,0,0],"treasure":40}}},
                winner: {
                    isEnded: true,
                    winner: 'p2'
                }
            });
        })

        it("Rule 1: player seeds end on its treasure", async () => {

            const mock = {
                numberOfPit: 12,
                numberOfSeedPerPit: 6,
                playerOneId: 'p1',
                playerTwoId: 'p2',
                turn: 'p1',
                board: {p1: {pits: [6, 6, 6, 6, 6, 6], treasure: 0}, p2: {pits: [6, 6, 6, 6, 6, 6], treasure: 0}}
            };

            sinon.stub(redisHelper, 'getBoard').callsFake((gameId) => {
                return mock
            });


            const result = await move('testGame', 'p1', 0);

            assert.deepEqual(result, {
                game: {"numberOfPit":12,"numberOfSeedPerPit":6,"playerOneId":"p1","playerTwoId":"p2","turn":"p1","board":{"p1":{"pits":[0,7,7,7,7,7],"treasure":1},"p2":{"pits":[6,6,6,6,6,6],"treasure":0}}},
                winner: undefined,
            });
        })

        it("Rule 2: Player makes one of opponent's pit even", async () => {

            const mock = {
                numberOfPit: 12,
                numberOfSeedPerPit: 6,
                playerOneId: 'p1',
                playerTwoId: 'p2',
                turn: 'p1',
                board: {p1: {pits: [1, 3, 6, 0, 6, 2], treasure: 14}, p2: {pits: [5, 3, 7, 7, 7, 7], treasure: 9}}
            };

            sinon.stub(redisHelper, 'getBoard').callsFake((gameId) => {
                return mock
            });


            const result = await move('testGame', 'p1', 5);

            assert.deepEqual(result, {
                game: {"numberOfPit":12,"numberOfSeedPerPit":6,"playerOneId":"p1","playerTwoId":"p2","turn":"p2","board":{"p1":{"pits":[1,3,6,0,6,0],"treasure":21},"p2":{"pits":[0,3,7,7,7,7],"treasure":9}}},
                winner: undefined,
            });
        })

        it("Rule 3: if player own pit is empty", async () => {

            const mock = {
                numberOfPit: 12,
                numberOfSeedPerPit: 6,
                playerOneId: 'p1',
                playerTwoId: 'p2',
                turn: 'p1',
                board: {p1: {pits: [1, 2, 6, 0, 6, 2], treasure: 15}, p2: {pits: [5, 3, 7, 7, 7, 7], treasure: 9}}
            };

            sinon.stub(redisHelper, 'getBoard').callsFake((gameId) => {
                return mock
            });


            const result = await move('testGame', 'p1', 1);

            assert.deepEqual(result, {
                game: {"numberOfPit":12,"numberOfSeedPerPit":6,"playerOneId":"p1","playerTwoId":"p2","turn":"p2","board":{"p1":{"pits":[1,0,7,0,6,2],"treasure":23},"p2":{"pits":[5,3,0,7,7,7],"treasure":9}}},
                winner: undefined
            });
        })
    })
})