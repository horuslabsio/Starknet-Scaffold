#!/usr/bin/env node
import readline from "readline";
import { promisify } from "util";
import cp from "child_process";
import fs from "fs";
import path from "path";
import ora from "ora";

const git_repo = "https://github.com/horuslabsio/Starknet-Scaffold";

// convert libs to promises
const exec = promisify(cp.exec);
const rm = promisify(fs.rm);

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask questions in the terminal
const askQuestion = (question) => {
  return new Promise((resolve) => rl.question(question, resolve));
};

// Main function to clone the repo and setup the package
let projectPath;
const installPackage = async () => {
  try {
    // Ask for package name
    const packageName = await askQuestion('Enter your package name: ');

    // Ask for package type
    const packageTypeChoices = ['contract_only', 'fullstack', 'dojo', 'debugger'];
    console.log('Available package types:');
    packageTypeChoices.forEach((type, index) => console.log(`${index + 1}. ${type}`));

    let packageType;
    while (!packageType) {
      const packageTypeChoice = await askQuestion('Select the package type (1-3): ');
      packageType = packageTypeChoices[parseInt(packageTypeChoice) - 1];
      if (!packageType) {
        console.log('Invalid choice. Please select a valid package type.');
      }
    }

    // create project directory
    const currentPath = process.cwd();
    projectPath = path.join(currentPath, packageName);

    if (fs.existsSync(projectPath)) {
        console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
        process.exit(1);
      }
      else {
        fs.mkdirSync(projectPath);
    }

    // Clone the repository
    const gitSpinner = ora("Downloading files...").start();
    // clone the repo into the project folder -> creates the new boilerplate
    await exec(`git clone --depth 1 ${git_repo} ${projectPath} --quiet`);
    gitSpinner.succeed();

    let cleanupTasks = [];
    let excluded_files = [".git", ".github", "CONTRIBUTING.md", "bin", "burner", "website", "docs", "CNAME"];

    if (packageType === "fullstack" || packageType === "dojo") {
        const FRONTEND_BASE_PATH = "frontend/src/app";
        const componentsToRemove = [
        `${FRONTEND_BASE_PATH}/burner`,
        `${FRONTEND_BASE_PATH}/wikipedia`,
        `${FRONTEND_BASE_PATH}/scaffold-deployer`,
        `${FRONTEND_BASE_PATH}/address-book`,
        `${FRONTEND_BASE_PATH}/components/Burner`,
        `${FRONTEND_BASE_PATH}/components/BurnerWallet`,
        `${FRONTEND_BASE_PATH}/components/ScaffoldDeployer`,
        `${FRONTEND_BASE_PATH}/components/AssetTransferModal.tsx`,
        `${FRONTEND_BASE_PATH}/components/ConnectionModal.tsx`,
        `${FRONTEND_BASE_PATH}/components/ContractExecutionModal.tsx`,
        ];
        cleanupTasks.push(
        ...componentsToRemove.map((comp) =>
            rm(path.join(projectPath, comp), {
            recursive: true,
            force: true,
            }),
        ),
        ...excluded_files.map((comp) =>
            rm(path.join(projectPath, comp), {
            recursive: true,
            force: true,
            }),
        ),
      );
    } 
    else if (packageType == "contract_only") {
      let componentsToRemove = [...excluded_files, "frontend", ".editorconfig"];
      cleanupTasks.push(
        ...componentsToRemove.map((comp) =>
          rm(path.join(projectPath, comp), {
          recursive: true,
          force: true,
          }),
      ),
      )
    }
    else {
      cleanupTasks.push(
        ...excluded_files.map((comp) =>
            rm(path.join(projectPath, comp), {
            recursive: true,
            force: true,
            }),
        ),
      );
    }

    // remove useless files
    const cleanSpinner = ora("Removing useless files").start();
    await Promise.all([
        ...cleanupTasks,
    ]);

    process.chdir(projectPath);
    // remove the packages needed for cli
    await exec("npm uninstall ora cli-spinners");
    cleanSpinner.succeed();

    // install dependencies
    const npmSpinner = ora("Installing dependencies...").start();
    if(packageType == "dojo") {
      await exec("npm run install --legacy-peer-deps && npm run initialize-dojo");
    }
    else if(packageType !== "contract_only") {
      await exec("npm run install --legacy-peer-deps");
    }
    npmSpinner.succeed();

    console.log("The installation is done!");
    console.log("You can now run the scaffold with:");
    console.log(`    cd ${packageName}`);
    console.log(`    npm run start`);

  } catch (err) {
    // clean up in case of error, so the user does not have to do it manually
    fs.rmSync(projectPath, { recursive: true, force: true });
    console.error(`Error: ${err.message}`);
  } finally {
    rl.close();
  }
};

installPackage();
