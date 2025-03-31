const session = require('express-session');
const MongoStore = require('connect-mongo');

const store = MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/twitter?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4',
    crypto: {
        secret: 'MySuperSecretKey1233'
    },
    touchAfter: 24 * 3600,
});

const sessionOptions = {
    store,
    secret: 'MySuperSecretKey1233',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: 'None',
    }
}

const sessionMiddleware = session(sessionOptions);

module.exports = sessionMiddleware;