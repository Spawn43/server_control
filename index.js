// const { exec } = require("child_process");
// const system_stats = require('./modules/system-stats-module');
const express = require('express');
const sys = require('./resources/js/system-stats-module');
const app = express();
const {
    setIntervalAsync,
    clearIntervalAsync
} = require('set-interval-async/dynamic')
const {exec} = require("child_process");


let server_information = sys.read();




/*
        API/SERVER FUNCTIONS
 */

app.get('/server', async function(req, res) {


    // Access the provided 'page' and 'limt' query parameters
    let time = req.query.time;

    let sys_info = sys.sysinfo(time*12,server_information);

    res.send('info = '+sys_info)
});

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))

/*
        INTERNAL FUNCTIONS
 */

setInterval(function(){sys.write(server_information)},30000);
setInterval(function(){ipdate_resources()},5000);




function update_resources(){
    exec("sh resources/bash/get_resource.sh", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        parsed_bash = parse_bash(stdout);
        return_json = get_json(parsed_bash);

        console.log(return_json);
        server_information.push(return_json);
    });

}

/*
    INTERNAL FUNCTIONS
 */


function parse_bash(data){
    bash_array=  data.slice(0, data.indexOf("\n")).split(",");
    ram_array = bash_array[0].split(" ");
    cpu_usage = bash_array[1];

    return [ram_array,cpu_usage];
}

function get_json(bash_array){
    usage_cpu_=bash_array[1];
    total_ram=bash_array[0][0];
    usage_ram=bash_array[0][2];
    remanining_ram_=total_ram-usage_ram;
    return JSON.stringify({ram_usage:usage_ram,ram_remining:remanining_ram_.toPrecision(5),cpu_usage:usage_cpu_,time:Date.now()})
}

