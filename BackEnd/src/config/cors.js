
require("dotenv").config();

const configCors = (app) => {
    // Add headers before the routes are defined
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        // let allowOrigins = process.env.ALLOW_ORIGINS;
        // if (allowOrigins) allowOrigins = allowOrigins.split(',');
        // if (req.header('origin')) {
        //     res.setHeader(
        //         'Access-Control-Allow-Origin',
        //         allowOrigins.includes(req.header('origin').toLowerCase()) ? req.headers.origin : "default");
        // }
        res.setHeader(
            'Access-Control-Allow-Origin',
            "*");
        
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        // Pass to next layer of middleware
        next();
    });
}

module.exports = configCors;