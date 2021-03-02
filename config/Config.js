const config = {
    NUMBER_OF_PIT: 12,
    NUMBER_OF_SEED_PER_PIT: 6,
    MANCALA_GAME_PREFIX: 'MANCALA',
    SESSION_KEY:'key',
    SOCKET_PING_INTERVAL:20000,
    SOCKET_PING_TIMEOUT: 10000,
    SERVER_PORT: 4000,
    REDIS_HOST: 'localhost',
    REDIS_PORT: 6379,
    REDIS_REQ_TIMEOUT: 5000,
    DATABASE_URL: 'mongodb://localhost:27017/games'
}

module.exports = config;