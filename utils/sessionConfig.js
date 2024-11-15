import bcrypt from 'bcrypt';
import session from 'express-session';
import {createRequire} from "module";
const require = createRequire(import.meta.url);
const config = require("../config.json")


function createSecret() {
    const salt1 = bcrypt.genSaltSync();
    const salt2 = bcrypt.genSaltSync();
    return bcrypt.hashSync(salt1 + salt2, 10);
}

const sessionConfig = session({
    name: config.cookieName,
    secret: createSecret(),
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 86400000 // 24 hours
    },
});

export default sessionConfig;