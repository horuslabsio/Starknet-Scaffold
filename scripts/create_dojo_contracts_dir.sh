#!/bin/bash

# Hardcoded directory name
DIR_NAME="dojo-contracts"

# Check if the directory exists
if [ -d "$DIR_NAME" ]; then
  echo "Directory '$DIR_NAME' already exists."
else
  # Create the directory
  mkdir "$DIR_NAME"
  echo "Directory '$DIR_NAME' created."
fi