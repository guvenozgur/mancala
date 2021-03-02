'use strict';
const redisHelper = require('../server/cache/Helper')();
const {move, createGame,removeGame, getGame} = require('../server/service/GamePlay')

beforeAll(async () => {
});

afterEach(async () => {
    console.log(JSON.stringify(await redisHelper.getBoard('test-game-1')));
});


afterAll(async () => {
    console.log(JSON.stringify(await redisHelper.getBoard('test-game-1')));
});




describe('game ', () => {
    it('creation success', async () => {
        await expect(async () => {
            await createGame('test-game-1', 1, 2);
        })
            .not
            .toThrow();
    });

    it('move (player:1, pid:2)', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 2);
        })
            .not
            .toThrow();
    });

    it('move (player:2, pit:2)', async () => {
        await expect(async () => {
            await move('test-game-1', 2, 2);
        })
            .not
            .toThrow();
    });


    it('move (player:1, pit:5) RULE2?', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 5);
        })
            .not
            .toThrow();
    });

    it('move (player:2, pit:0) RULE2?', async () => {
        await expect(async () => {
            await move('test-game-1', 2, 0);
        })
            .not
            .toThrow();
    });

    it('move (player:1, pit:0) ', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 0);
        })
            .not
            .toThrow();
    });

    it('move (player:2, pit:5) ', async () => {
        await expect(async () => {
            await move('test-game-1', 2, 5);
        })
            .not
            .toThrow();
    });


    it('move (player:1, pit:0)', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 0);
        })
            .not
            .toThrow();
    });

    it('move (player:2, pit:0)', async () => {
        await expect(async () => {
            await move('test-game-1', 2, 0);
        })
            .not
            .toThrow();
    });

    it('move (player:1, pit:2)', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 2);
        })
            .not
            .toThrow();
    });

    it('RULE 3 player pit is empty: move (player:2, pit:1)', async () => {
        await expect(async () => {
            await move('test-game-1', 2, 1);
        })
            .not
            .toThrow();
    });

    it('move (player:1, pit:0)', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 0);
        })
            .not
            .toThrow();
    });

    it('RULE 1 player seeds end on its treasure: move (player:2, pit:2)', async () => {
        await expect(async () => {
            await move('test-game-1', 2, 2);
        })
            .not
            .toThrow();
    });

    it('RULE 3 player pit is empty: move (player:2, pit:3)', async () => {
        await expect(async () => {
            await move('test-game-1', 2, 3);
        })
            .not
            .toThrow();
    });


    it('move (player:1, pit:0)', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 0);
        })
            .not
            .toThrow();
    });

    it('RULE 3 player pit is empty: move (player:2, pit:1)', async () => {
        await expect(async () => {
            await move('test-game-1', 2, 0);
        })
            .not
            .toThrow();
    });

    it('RULE 1 player seeds end on its treasure: move (player:1, pit:5)', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 5);
        })
            .not
            .toThrow();
    });

    it('move (player:1, pit:1)', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 1);
        })
            .not
            .toThrow();
    });

    it('move (player:1, pit:1)', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 1);
        })
            .not
            .toThrow();
    });
});

