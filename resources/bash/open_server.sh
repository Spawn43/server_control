#!/bin/bash
screen -dmS $1 -L -Logfile $2output.txt
screen -S $1 -p 0 -X stuff "cd $2^M"
screen -S $1 -p 0 -X stuff "$3^M"