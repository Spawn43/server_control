const exec = require("child_process");
const sleep = require('sleep-promise');


module.exports.run = run_server;
module.exports.execute_command = execute_command;
module.exports.stop = close_server;
module.exports.kill = kill;


function run_server(screen_name,file_directory,run_command){
    execute_command(`sh services/bash/open_server.sh \"${screen_name}\" \"${file_directory}\" \"${run_command}\"`)
}

function kill(screen_name){
    execute_command(`screen -S ${screen_name} -X quit`);
}

async function close_server(screen_name, file_directory, stop_command) {
    execute_screen(screen_name, stop_command);
    let oldOutput = execute_command(`tail -n 2 ${file_directory}output.txt`);
    let newOutput = "";

    while(newOutput!==oldOutput){
        await sleep(2000);
        console.log("test");
        oldOutput=newOutput;
        newOutput = execute_command(`tail -n 2 ${file_directory}output.txt`);
    }

    execute_command(`screen -S ${screen_name} -X quit`);
    console.log("done");
}


function execute_screen(screen_name,command){
    return exec.execSync(`screen -S ${screen_name} -p 0 -X stuff \'${command}^M\'`, {encoding:'utf8'})
}

function execute_command(command){
    return exec.execSync(command, {encoding:'utf8'});
}
