'use strict';
const {move, createGame} = require('../server/service/GamePlay')


describe('game ', () => {
    it('creation success', async () => {
        await expect(async () => {
            await createGame('test-game-1', 1, 2);
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


    it('move (player:2, pit:0)', async () => {
        await expect(async () => {
            await move('test-game-1', 2, 0);
        })
            .not
            .toThrow();
    });

    it('move (player:1, pit:5)', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 5);
        })
            .not
            .toThrow();
    });

    it('move (player:1, pit:3)', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 3);
        })
            .not
            .toThrow();
    });

    it('move (player:2, pit:3)', async () => {
        await expect(async () => {
            await move('test-game-1', 2, 3);
        })
            .not
            .toThrow();
    });

    it('move (player:1, pit:4)', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 4);
        })
            .not
            .toThrow();
    });

    it('move (player:1, pit:3)', async () => {
        await expect(async () => {
            await move('test-game-1', 1, 3);
        })
            .not
            .toThrow();
    });


    it('move (player:2, pit:5)', async () => {
        await expect(async () => {
            await move('test-game-1', 2, 5);
        })
            .not
            .toThrow();
    });

    it('move (player:2, pit:4)', async () => {
        await expect(async () => {
            await move('test-game-1', 2, 4);
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

    it('move (player:2, pit:1)', async () => {
        await expect(async () => {
            let result = await move('test-game-1', 2, 1);
        })
    });
});



