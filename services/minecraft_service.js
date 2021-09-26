const server = require('./server_library');

const file_directory= "/home/testserver/minecraft/"
const run_command = "java -Xmx2048M -Xms1024M -jar server.jar nogui"
const stop_command = "stop"
const screen_name = "minecraft"
let server_running = false;



module.exports.run = run_server;
module.exports.stop = close_server;
module.exports.status = server_running;



function run_server(){
    server.run(screen_name,file_directory,run_command);
    server_running = true;
}

function close_server(){
    server.stop(screen_name,file_directory,stop_command);
    server_running = false;
}

