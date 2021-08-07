const {exec} = require("child_process");

const file_directory= "/home/testserver/minecraft/"
const run_command = "java -Xmx2048M -Xms1024M -jar server.jar nogui"
const screen_name = "minecraft"



module.exports.run = run_server;



function run_server(){
    exec("sh resources/bash/open_server.sh \""+screen_name+"\" \""+file_directory+"\" \""+run_command+"\"", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log("running");
    });

}