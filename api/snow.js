import models from "../sql/sequelize.js";
import fetch from "node-fetch";
import HttpsProxyAgent from 'https-proxy-agent';
import {dateTimeLog, environment} from "../utils/utils.js"
import {createRequire} from "module";
const require = createRequire(import.meta.url);
const config = require("../config.json")

async function fetchAssets(){
    const sysparam_query = "?sysparm_query=u_task_customer.department%3Df9480d75476749984e6d6ce5a46d432a%5EORu_task_customer.department%3D7dc31171db9f1280b9e63bc0cf961950%5EORu_task_customer.department%3D5be88db197634d98567b7d4e6253af88%5EORu_task_customer.department%3D9e9785fd87ab81d40fa5baa5dabb356d%5EORu_task_customer.department%3Dc08849b987674918bad8ec6e0ebb355c%5EORu_task_customer.department%3Dc473515d1b08c010ab2f77741a4bcb95%5Eclosed_atISNOTEMPTY%5Eopened_atONLast%207%20days%40javascript%3Ags.beginningOfLast7Days()%40javascript%3Ags.endOfLast7Days()&sysparm_view="
    const snowEnv = environment(config.env)
    const url = `${snowEnv.url}${sysparam_query}`
    let snowRes = await fetch(url, {
        method: 'GET',
        // agent: proxyAgent,  
        headers: {
            "Authorization": 'Basic ' + Buffer.from(config.snowUser + ":" + snowEnv.pw).toString('base64')
        },
    });

    let jsonRes = await snowRes.json()
    const assets = jsonRes.result.map(ticket => {
        return {
            "Number": ticket["number"],
            "Assignment Group": ticket["assignment_group"],
            "Assigned to": ticket["assigned_to"],
            "Short Description": ticket["short_description"],
        }
    })
    return assets
}

async function submitTicket(payload){
	// const proxyAgent = new HttpsProxyAgent(config.proxy);
    const {
        assignment_group, 

        caller_id, 
        u_customer, 
        opened_by, 
        category,

        cmdb_ci,
        contact_type,
        short_description,
        description,

        state,
        u_service,
        subcategory,
        urgency,
        impact,
        u_brand_network
    } = payload

    const snowEnv = environment(config.env)
    const url = snowEnv.url
    const snowUser = config.snowUser
    const snowPW = snowEnv.pw
    try {
        let snowRes = await fetch(url, {
            method: 'POST',
            // agent: proxyAgent,  
            headers: {
                "Authorization": 'Basic ' + Buffer.from(snowUser + ":" + snowPW).toString('base64'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                "assignment_group": assignment_group,
                "caller_id": caller_id,
                "u_customer": u_customer,
                "opened_by": opened_by,
                "category": category,
                "cmdb_ci": cmdb_ci,
                "contact_type": contact_type,
                "short_description": short_description,
                "description": description,
                "state": state,
                "u_service": u_service,
                "subcategory": subcategory,
                "urgency": urgency,
                "impact": impact,
                "u_brand_network": u_brand_network,
            }),
        });
        const json =  await snowRes.json()
        return json
    }
    catch(err){
        console.log("Error trying to create a new ticket in SNOW")
        console.log(err)
        return null
    }
}

async function addToDB(json, user = "default", shortDescription="default"){
    const {display_value, sys_id, record_link} = json
    try {
        const x = await models.TICKET_SUBMISSION.create({
            NUMBER: display_value,
            SYS_ID: sys_id,
            LINK: record_link,
            USER: user,
            SHORT_DES: shortDescription,
        })
        console.log("Added ticket to DB: " + display_value)

    } catch (err) {
        console.log(dateTimeLog() + " - Error 103: Adding asset to database failed");
        console.log(err)
    }
}

export {fetchAssets, addToDB, submitTicket}
