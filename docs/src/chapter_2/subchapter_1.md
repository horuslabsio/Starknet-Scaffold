# Installation

This documentation provides detailed instructions on how to install and set up Starknet-Scaffold.

## Requirements

Before you begin, ensure you have the following tools installed on your system:

* [Node (v18 LTS)](https://nodejs.org/en/download/package-manager)
* [Rust](https://www.rust-lang.org/tools/install)
* [Git](https://git-scm.com/downloads)
* [Docker](https://docs.docker.com/get-docker/)

## Installation Methods

1. Using the `create-starknet-app` executable (recommended).
2. Cloning the repository from GitHub.

### Method One: Using `create-starknet-app` executable.

The recommended way to get started with Starknet-Scaffold is by using the `create-starknet-app` executable. This method allows you to choose between different boilerplate types based on your project needs.

1. Run the executable

    Open your terminal and run:
    ```
    npx create-starknet-app
    ```
    You'll be prompted for a project name, and a package type, enter both to proceed.
    
    Available package types include:
   * **contract-only:** For a project that require just contract-related tools (no frontend).

   * **fullstack:** For full stack projects. Provides customizable [out-of-the-box UI](../chapter_3.md) components.

   * **dojo:** For gaming projects which needs access to the dojo stack.

   * **debugger:** For projects with need to utilize the full debugging suite.

    Once installation is completed, navigate to the project directory:
    ```
    cd my-project
    ```

### Method Two: Cloning the repository from GitHub.

To get started with Starknet-Scaffold via GitHub, follow these steps:

1. Clone the repository:
   
   Clone the Starknet-Scaffold repository from GitHub to your local machine. Open your terminal or command prompt and run the following command:

    ```
    git@github.com:horuslabsio/Starknet-Scaffold.git
    ```

2. Navigate to the Project Directory
   
   After cloning, navigate into the project directory by running:

   ```
   cd Starknet-Scaffold
   ```

**PS: The executable automatically installs Scarb and Starknet Foundry, if you do not have them installed locally.**