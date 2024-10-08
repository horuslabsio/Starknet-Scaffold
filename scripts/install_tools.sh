# Main function to call installation scripts
#!/bin/bash

# Function to check if a command exists
command_exists () {
    command -v "$1" >/dev/null 2>&1 ;
}

# Install Scarb
install_scarb() {
    local version=$1

    if [ -n "$version" ]; then
        echo "Installing Scarb $version..."
        curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh -s -- -v $version
    else 
        if command_exists scarb; then
            echo "Scarb is already installed."
        else
            echo "Installing Scarb latest..."
            curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh
        fi
    fi
}

# Install Starknet-Foundry
install_starknet_foundry() {
    local version=$1

    curl -L https://raw.githubusercontent.com/foundry-rs/starknet-foundry/master/scripts/install.sh | sh

    if [ -n "$version" ]; then
        echo "Installing Starknet-Foundry $version..."
        snfoundryup --version $version
    else 
        if command_exists sncast && command_exists snforge; then
            echo "Starknet-Foundry is already installed."
        else
            echo "Installing Starknet-Foundry latest..."
            snfoundryup
        fi
    fi
}

# Install Foundry
install_foundry() {
    local foundry_install_dir="$HOME/.foundry/bin"

    curl -L https://foundry.paradigm.xyz | bash
    export PATH="$PATH:$foundry_install_dir"

    if [ -n "$version" ]; then
        echo "Installing Foundry $version..."
        foundryup --version $version
    else 
        if command_exists forge; then
            echo "Foundry is already installed."
        else
            echo "Installing Foundry latest..."
            foundryup
        fi
    fi
}

# Install Dojo
install_dojo() {
    local version=$1
    local dojo_install_dir="$HOME/.dojo/bin"

    curl -L https://install.dojoengine.org | bash

    export PATH="$PATH:$dojo_install_dir"

    if [ -n "$version" ]; then
        echo "Installing Dojo $version..."
        dojoup --version $version
    else 
        if command_exists dojoup; then
            echo "Dojo is already installed."
        else
            echo "Installing Dojo latest..."
            dojoup
        fi
    fi
}

# Main function to call installation scripts
main() {
    # Default versions (empty means latest)
    local scarb_version=""
    local starknet_foundry_version=""
    local dojo_version=""
    local foundry_version=""

    # Parse the arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --scarb)
                shift
                scarb_version=$1
                shift
                ;;
            --starknet-foundry)
                shift
                starknet_foundry_version=$1
                shift
                ;;
            --dojo)
                shift
                dojo_version=$1
                shift
                ;;
            --foundry)
                shift
                foundry_version=$1
                shift
                ;;
            *)
                echo "Unknown argument: $1"
                echo "Available options: --scarb [version], --starknet-foundry [version], --dojo [version], --foundry [version]"
                exit 1
                ;;
        esac
    done

    # Install all packages, using the specified version or default to latest
    install_scarb "$scarb_version"
    install_starknet_foundry "$starknet_foundry_version"
    install_foundry "$foundry_version"
    install_dojo "$dojo_version"

    echo "Installation complete!"
}

main "$@"
