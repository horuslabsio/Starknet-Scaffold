# Installation

This documention provides detailed instructions on how to install and set up Starknet-Scaffold, an open-source, up-to-date toolkit for building decentralized applications (dapps) on Starknet.

## Requirements

Before you begin, ensure you have the following tools installed on your system:

* [Node (v18 LTS)](https://nodejs.org/en/download/package-manager)
* [Rust](https://www.rust-lang.org/tools/install)
* [Git](https://git-scm.com/downloads)
* [Scarb](https://docs.swmansion.com/scarb/download.html)
* [Starknet Foundry](https://foundry-rs.github.io/starknet-foundry/getting-started/installation.html)

## Installation Methods

1. Using the `create-starknet-app` tool (recommended).
2. Cloning the repository from GitHub.

### Method One: Using `create-starknet-app` tool.

The recommended way to start with Starknet-Scaffold is by using the `create-starknet-app` command. This method allows you to choose between different boilerplate types based on your project. This method is more recommended for users.

1. Run the initialization command

    Open your terminal and run one of the following commands depending on your desired setup:

   * For a project with a full debugging suite:
     ```
     npx create-starknet-app my-app debugger
     ```

   * For a project with frontend UI components:
     ```
     npx create-starknet-app my-app basic
     ```

   * If you don't specify a type, it defaults to the debugger mode:
     ```
     npx create-starknet-app my-app
     ```

    Replace `my-app` with your project name.

    After running the command, follow the prompts to customize your new Starknet application.

### Method Two: Cloning the repository from GitHub.

To get started with Starknet-Scaffold via GitHub, follow these steps:

1. Clone the repository:
   
   Clone the Starknet-Scaffold repository from GitHub to your local machine. Open your terminal or command prompt and run the following command:

    ```
    git clone git@github.com:argentlabs/Starknet-Scaffold.git
    ```

2. Navigate to the Project Directory
   
   After cloning, navigate into the project directory by running:

   ```
   cd Starknet-Scaffold
   ```