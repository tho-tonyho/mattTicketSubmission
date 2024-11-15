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

// Login form
router.post('/', async(req, res) => {
    console.log("Request to create a new ticket")
    console.log(req.body)
    const SHORT_DES = req.body.shortDescription
    const payload = {
        "assignment_group": "BCC",
    
        "caller_id": "matt.babcock@warnermedia.com",
        "u_customer": "matt.babcock@warnermedia.com",
        "opened_by": "matt.babcock@warnermedia.com",
        "category": "Application",
    
        "cmdb_ci": "Other",
        "contact_type": "Integrations",
        "short_description": SHORT_DES,
        "description": SHORT_DES,
     
        "state": "New",
        "u_service": "",
        "subcategory": "Performance",
        "urgency": "2",
        "impact": "4",
        "u_brand_network": "CNN",
    
        "u_best_brand_allocation": ""
    }

    const json = await submitTicket(payload)
    if(json !== null){
        console.log(json)
        addToDB(json.result[0], "testUser", SHORT_DES)
        res.send(json.result[0].display_value)
    } else{
        res.send(null)
    }
  
});

export default router