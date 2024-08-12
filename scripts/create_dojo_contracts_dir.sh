#!/bin/bash

# Hardcoded directory name
DIR_NAME="contracts"

# Check if the directory exists
if [ -d "$DIR_NAME" ]; then
  rm -rf "$DIR_NAME"
  echo "Directory '$DIR_NAME' created."
else
  # Create the directory
  mkdir "$DIR_NAME"
  echo "Directory '$DIR_NAME' created."
fi