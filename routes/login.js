import express from 'express'
import ActiveDirectory from 'activedirectory2'
import {createRequire} from "module";

import {getDateTime} from "../utils/utils.js"
const require = createRequire(import.meta.url);
const config = require('../config.json')

var router = express.Router();
const adConfig = {
    url: config.ADUrl,
    baseDN: config.ADBaseDN,
    bindDN: config.ADBindDN,
    bindCredentials: config.ADBindCredentials,
}
const ad = new ActiveDirectory(adConfig);

// Redirect back to login if user has not logged in, but if you are logged in,
// go to home page
router.get('/', (req, res) => {
    if(req.session.auth){
        res.redirect(`http://${req.hostname}:${config.port}`)
    }
    else{
        res.render('login.ejs', {error: ""})
    }
})

// Login form
router.post('/', async function(req, res, next) {
    const { username, password } = req.body
    console.log(`${getDateTime()} - ${username} - login attempt`)

    let authUser = `${username}@wmad`;
    ad.authenticate(authUser, password, function (err, auth) {

        if (err) {
            console.log(`${getDateTime()} - Error 201: ${JSON.stringify(err)}`)
            res.render('login.ejs', {error: "Error 201: Unable to authenticate user with given username and password"})
            return;
        }
        
        console.log(`${getDateTime()} - ${username} successfully logged in!`)
        req.session.auth = true;
        req.session.user = username;     
        req.session.validGroups = [] 

        //Check AD Groups and add to session so it can be filtered later
        ad.getGroupMembershipForUser(username, function(err, groups) {
            if (err) {
                console.log('ERROR: ' +JSON.stringify(err));
                res.render('login.ejs', {error: 'User: ' + username + ' was found.'})
                return;
            }

            if (!groups) {
                console.log('User: ' + username + ' not found.');
                res.render('login.ejs', {error: 'User: ' + sAMAccountName + ' not found.'})
            } else {
                const userGroups = groups.map(e => e.cn.toLowerCase());
                const validGroups = config.validGroups.filter(group => userGroups.includes(group));
                req.session.validGroups = validGroups

                if(validGroups <= 0){
                    console.log(`${username} is not part of any groups.`)
                    res.render('login.ejs', {proxyName: config.proxyName, error: 'User: ' + username + ' is not part of valid groups.'})
                } else {
                    console.log(`${username} is part of these groups: ${validGroups}`)
                    res.redirect(`http://${req.hostname}:${config.port}/login`)
                }
            }
        });
    });
})

export default router