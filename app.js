// const { exec } = require("child_process");
// const system_stats = require('./modules/system-stats-module');
const express = require('express');
const bodyParser = require('body-parser');


const sys = require('./services/system_stats_service');
const minecraft = require('./services/minecraft_service');
const valheim = require('./services/valheim_service');
const app = express();
app.use(bodyParser.json({ extended: true }));
/*
        API/SERVER FUNCTIONS
 */

app.get('/server', async function(req, res) {
    // Access the provided 'page' and 'limt' query parameters
    let time = req.query.time;
    let sys_info = sys.sysinfo(time*12);
    res.send('info = '+sys_info)
});


app.get('/minecraft', async function(req, res) {
    // Access the provided 'page' and 'limt' query parameters
    minecraft.run();
    res.send('ran');
});

app.get('/minecraft/stop', async function(req, res) {
    // Access the provided 'page' and 'limt' query parameters
    minecraft.stop();
    res.send('ran');
});

app.post('/valheim',(req, res) =>{
    let requestbody = req.body;
    console.debug('request ',req.body);
     if(requestbody["apikey"]==='zainisafatneek'){
         switch (requestbody["request"]){
             case "start":
                 valheim.run();
                 res.sendStatus(200);
                 break;
             case "stop":
                 valheim.stop();
                 res.sendStatus(200);
                 break;
             case "status":
                 let valheim_status = valheim.status();
                 res.send(valheim_status);
                 break;
             default:
                 res.sendStatus(405);
         }
     }
     else{
         res.sendStatus(401)
     }
});


app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))

/*
        INTERNAL FUNCTIONS
 */

