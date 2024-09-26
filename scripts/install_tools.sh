#!/bin/bash

# Function to check if a command exists
command_exists () {
    command -v "$1" >/dev/null 2>&1 ;
}

# Install Scarb
install_scarb() {
    if command_exists scarb; then
        echo "Scarb is already installed."
    else
        echo "Installing Scarb..."
        curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
    fi
}

# Install Starknet-Foundry
install_starknet_foundry() {
    if command_exists snforge; then
        echo "Starknet-Foundry is already installed."
    else
        echo "Installing Starknet-Foundry..."
        curl -L https://raw.githubusercontent.com/foundry-rs/starknet-foundry/master/scripts/install.sh | sh
        snfoundryup
    fi

}

# Install Foundry
install_foundry() {
    if command_exists forge; then
        echo "Foundry is already installed."
    else
        echo "Installing Foundry..."
        curl -L https://foundry.paradigm.xyz | sh
        foundryup
    fi

}

# Install Dojo
install_dojo() {
    if command_exists dojoup; then
        echo "Dojo is already installed."
    else
        echo "Installing Dojo..."
        git clone https://github.com/dojoengine/dojo
        cd dojo
        echo "Installing Sozo..."
        cargo install --path ./bin/sozo --locked --force
        echo "Installing Katana..."
        cargo install --path ./bin/katana --locked --force
        cd .. && rm -rf dojo
    fi
}

# Main function to call installation scripts
main() {
    install_scarb
    install_starknet_foundry
    install_dojo

    echo "Installation complete!"
}

main
