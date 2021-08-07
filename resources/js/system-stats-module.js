const fs = require("fs");
const {exec} = require("child_process");
const filePath='resources/text/sys_info.txt';
const filePath_1='resources/text/sys_info_1.txt';
const {
    setIntervalAsync
} = require('set-interval-async/dynamic')
/*
    Exports
 */
module.exports.sysinfo = get_sysinfo;

const server_information = [];

/*
    API FUNCTIONS
 */
function get_sysinfo(count){
    var i = server_information.length-1;
    const return_array=[];
    console.log(count);
    console.log(i);
    console.log(server_information.length-1);
    let backup = [];
    var backup_i =0 ;
    if(count>server_information.length){
        backup = legacy_data()
        backup_i = backup.length-1;
    }

    while(0<count){
        if(server_information[i]===undefined){
            return_array.push(backup[backup_i]);
            backup_i--;
        }
        else{
            return_array.push(server_information[i]);
            i--;

        }
        count--;
    }
    console.log(return_array);
    console.log(return_array.length);
    return return_array;
}







/*
    INTERNAL FUNCTIONS
 */

setIntervalAsync(()=>{update_resources()},5000);
setIntervalAsync(()=>{write_tofile()},60000);

function write_tofile(){
    const store_array = [];
    while(server_information.length>17280){

        store_array.push(server_information.shift());
    }

    if(store_array.length>0){
        fs.appendFile(filePath_1,store_array,err => {
            if (err) {
                console.error(err)
            }
        })
    }

    fs.writeFile(filePath, server_information, err => {
        if (err) {
            console.error(err)
        }
    });
}

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


const data = fs.readFileSync(filePath,'utf8');
data_array = data.split("},");
var i=0;
while(i<data_array.length-1) {
    server_information.push(data_array[i] + "}");
    i++;
}

function legacy_data(){
    const data = fs.readFileSync(filePath_1,'utf8');
    const return_array=[]
    data_array = data.split("},");
    var i=0;
    while(i<data_array.length-1) {
        return_array.push(data_array[i] + "}");
        i++;
    }
    return return_array;
}

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
