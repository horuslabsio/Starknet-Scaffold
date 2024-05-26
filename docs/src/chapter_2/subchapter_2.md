# Environment

## Getting Started with Your Starknet-Scaffold Project

After setting up your project using either method, follow these steps to get your development environment running smoothly:

1. Install the required dependencies
   
   Navigate to your project directory and install the required dependencies:

   ```
   cd my-app
   ```

   ```
   npm install
   ```

   This will download and install all the important packages specified in the `package.json` file.

2. Build the Contract
   
   Build the contract to ensure all files are correctly compiled and prepared for development:

   ```
   npm run build-contracts
   ```

3. Start the Development Server
   
   Start the development server to see your project in action:

   ```
   npm run start
   ```

   This command will start a local server and open your default web browser to display your new Starknet-Scaffold project.

4. Running Tests
   
   To ensure your project is set up correctly and to verify your code, run the test command:

   ```
   npm run test-contracts
   ```

   This will compile the contracts, collect the tests from the contracts package and run the tests.

5. Formatting
   
   To ensure and maintain consistency in your codes, run the format command:

   ```
   npm run format-contracts
   ```

   This command will check your code for style inconsistencies and automatically fix them.

6. Deploying the Project
   
    When you are ready to deploy your application, use the deploy command to create a production-ready build:

    ```
    npm run deploy-contract
    ```


You now have a fully set up and running installation of Starknet-Scaffold. You can start developing your StarkNet application using the provided boilerplate. For further customization and detailed instructions, refer to the documentation.

If you encounter any issues or need additional help, consider checking the [GitHub repository](https://github.com/argentlabs/Starknet-Scaffold) for updates and support.