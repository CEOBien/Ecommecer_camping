const redis = require('redis');
const client= redis.createClient({
    port: 6379,
    host:'127.0.0.1'
});
client.ping(function (err, pong) {
    console.log(pong);
})

client.on('connect', () => {
    console.log('Redis client connected');
});

client.on("error", (error) => {
    console.error(error);
});

module.exports = client