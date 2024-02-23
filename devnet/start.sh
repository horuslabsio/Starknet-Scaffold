#!/bin/bash
FILE_PATH=$(pwd)/devnet/dump.bak

if nc -z 127.0.0.1 5050; then
    echo "Port is not free, devnet might be already running"
    exit 1
else
    echo "Starting Devnet"
    docker run -p 127.0.0.1:5050:5050 -v $FILE_PATH:/tmp/starknet-devnet-dump shardlabs/starknet-devnet-rs:55191ee549b33ccbb0bc9d20dd929e39832a5ea5 --gas-price 36000000000 --timeout 320 --seed 0 --dump-path /tmp/starknet-devnet-dump
fi