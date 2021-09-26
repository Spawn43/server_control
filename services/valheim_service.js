const server = require('./server_library');

const file_directory= "/home/testserver/valheim/"
const run_command = "sh start_server.sh"
const stop_command = "^C"
const screen_name = "valheim"
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

