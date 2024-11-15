{
    "env" : "DEV",
    "proxy": "",
        - if this app is living on the production network with no internet access and there is no firewall punch for the snow api, you need this to make api calls to snow - would be an ip + port like http://100.100.00.100:1000
    "port": 2000,
    "cookieName": "ticketSubmission",
        - session is created upon login and stored as a cookie on the browser under this name

    "ADUrl": "ldaps://hyengldap.warnermedia.com:636",
    "ADBaseDN": "dc=wmad,dc=warnermedia,dc=com",
    "ADBindDN": "",
    "ADBindCredentials": "",
        - this is for the login page that connects to AD to check what groups you are part of to see if you are part of the validGroups that are allowed to login and view the site

    "snowUser": "_svc_PostTechNorth",
    "PROD_snowPw": "pw",
    "PROD_snowBaseUrl": "https://warnermedia.service-now.com/api/tubs/proc_int/incident",
    "DEV_snowBaseUrl": "https://Warnermediatest.service-now.com/api/tubs/proc_int/incident",
    "DEV_snowPw": "pw",
        - snow credentials from the previous API that is probably depracated

    "sqlUser": "user",
    "sqlPw": "pw",
    "sqlDB": "SNOW",
    "sqlServer": "sqlServer",
        - i used sql db for storing info, and these are the the creds to connect to the db through sequelize

    "validGroups": ["avid_eng"]
        - ad groups that are allowed to access this dash
}
