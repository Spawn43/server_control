// const { exec } = require("child_process");
// const system_stats = require('./modules/system-stats-module');
const express = require('express');
const sys = require('./resources/js/system-stats-module');
const app = express();
/*
        API/SERVER FUNCTIONS
 */

app.get('/server', async function(req, res) {
    // Access the provided 'page' and 'limt' query parameters
    let time = req.query.time;
    let sys_info = sys.sysinfo(time*12);
    res.send('info = '+sys_info)
});

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))

/*
        INTERNAL FUNCTIONS
 */

