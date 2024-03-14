const redis = require('redis')
const { REDIS_CONF } = require('../contfig/db')

// 创建客户端
const redisClient = redis.createClient({
    host: REDIS_CONF.host,
    port: REDIS_CONF.port,
})

redisClient.connect()

redisClient.on('connect', () => {
    console.log('连接成功');
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
  });

module.exports = {
    redisClient
}
