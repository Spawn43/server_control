const server = require('./server_library');

const file_directory= "/home/testserver/factorio/"
const run_command = "bin/x64/factorio --start-server saves/server.zip --server-settings data/server-settings.json bin/x64/factorio --start-server saves/server.zip --server-settings data/server-settings.json"
const stop_command = "^C"
const screen_name = "factorio"
let server_running = false;



module.exports.run = run_server;
module.exports.stop = close_server;
module.exports.kill = hard_kill;
module.exports.status = status;

function status(){
    if(server_running){
        return "Running";
    }
    else{
        return "Not Running"
    }
}

function run_server(){
    if(!server_running){
        server.run(screen_name,file_directory,run_command);
        server_running = true;
    }
    else{

    }
}

function close_server(){
    if(server_running){
        server.stop(screen_name,file_directory,stop_command);
        server_running = false;
    }else{

    }
}

function hard_kill(){
    server.kill(screen_name);
}

