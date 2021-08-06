const fs = require("fs");
const {exec} = require("child_process");
const filePath='resources/text/sys_info.txt';

/*
    Exports
 */
module.exports.sysinfo = get_sysinfo;
module.exports.read = read_fromfile;
module.exports.write = write_tofile;
module.exports.update = update_resources;


/*
    API FUNCTIONS
 */
function get_sysinfo(count,server_information){
    var i = server_information.length-1;
    const return_array=[];
    console.log(count);
    console.log(i);
    console.log(server_information.length-1);
    while(0<count){
        return_array.push(server_information[i]);
        i--;
        count--;
    }
    console.log(return_array);
    console.log(return_array.length);
    return return_array;
}

function read_fromfile(){
    const return_array = []
    const data = fs.readFileSync(filePath,'utf8');
    data_array = data.split("},");

    var i=0;

    while(i<data_array.length-1){
        return_array.push(data_array[i]+"}");

        i++;
    }

    return return_array;

}

function write_tofile(Info){
    fs.writeFile(filePath, Info, err => {
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
        return return_json;
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