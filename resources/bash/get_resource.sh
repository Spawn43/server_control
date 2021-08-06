#!/bin/bash
data=$(top -b -n 1)

RAM=$(echo "$data" | grep -o 'MiB Mem : [ 0-9.]* total, [0-9. ]* free,[0-9. ]*' | grep -o '[0-9]*\.[0-9]*')
CPU=$(echo "$data" | grep -o '%Cpu(s): [0-9. ]*' | grep -o '[0-9.]*')

echo $RAM,$CPU
