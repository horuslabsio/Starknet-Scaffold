#!/usr/bin/env node
import readline from "readline";
import { promisify } from "util";
import cp from "child_process";
import fs from "fs";
import path from "path";
import ora from "ora";

const git_repo = "https://github.com/EjembiEmmanuel/Starknet-Scaffold.git";
const dojo_starter = "https://github.com/dojoengine/dojo-starter.git";

// convert libs to promises
const exec = promisify(cp.exec);
const rm = promisify(fs.rm);

// Initialize readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
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
    const packageName = await askQuestion("Enter your package name: ");

    // Ask for package type
    const packageTypeChoices = [
      "contract_only",
      "fullstack",
      "debugger",
      "dojo",
      "kakarot",
    ];
    console.log("Available package types:");
    packageTypeChoices.forEach((type, index) =>
      console.log(`${index + 1}. ${type}`)
    );

    let packageType;
    while (!packageType) {
      const packageTypeChoice = await askQuestion(
        "Select the package type (1-5): "
      );
      packageType = packageTypeChoices[parseInt(packageTypeChoice) - 1];
      if (!packageType) {
        console.log("Invalid choice. Please select a valid package type.");
      }
    }

    // create project directory
    const currentPath = process.cwd();
    projectPath = path.join(currentPath, packageName);

    if (fs.existsSync(projectPath)) {
      console.log(
        `The file ${projectName} already exist in the current directory, please give it another name.`
      );
      process.exit(1);
    } else {
      fs.mkdirSync(projectPath);
    }

    // Clone the repository
    const gitSpinner = ora("Downloading files...").start();
    // clone the repo into the project folder -> creates the new boilerplate
    await exec(`git clone --depth 1 ${git_repo} ${projectPath} --quiet`);
    gitSpinner.succeed();

    let cleanupTasks = [];
    let excluded_files = [
      ".git",
      ".github",
      "CONTRIBUTING.md",
      "bin",
      "burner",
      "website",
      "docs",
      "CNAME",
    ];

    if (
      packageType === "fullstack" ||
      packageType === "dojo" ||
      packageType === "kakarot"
    ) {
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
          })
        ),
        ...excluded_files.map((comp) =>
          rm(path.join(projectPath, comp), {
            recursive: true,
            force: true,
          })
        )
      );
    } else if (packageType == "contract_only") {
      let componentsToRemove = [...excluded_files, "frontend", ".editorconfig"];
      cleanupTasks.push(
        ...componentsToRemove.map((comp) =>
          rm(path.join(projectPath, comp), {
            recursive: true,
            force: true,
          })
        )
      );
    } else {
      cleanupTasks.push(
        ...excluded_files.map((comp) =>
          rm(path.join(projectPath, comp), {
            recursive: true,
            force: true,
          })
        )
      );
    }

    // remove useless files
    const cleanSpinner = ora("Removing useless files").start();
    await Promise.all([...cleanupTasks]);

    process.chdir(projectPath);
    // remove the packages needed for cli
    await exec("npm uninstall ora cli-spinners");
    cleanSpinner.succeed();

    // install dependencies
    const npmSpinner = ora("Installing dependencies...").start();
    if (packageType == "dojo") {
      await exec(
        `git clone --depth 1 ${dojo_starter} ${projectPath}/dojo-starter --quiet`
      );

      const dojo_version = getDojoVersion(
        path.join(projectPath, "/dojo-starter/Scarb.toml")
      );

      await exec(
        `npm run install --dojo-version=${dojo_version} --legacy-peer-deps && npm run initialize-dojo`
      );

      fs.rmSync(path.join(projectPath, "/dojo-starter"), {
        recursive: true,
        force: true,
      });
    } else if (packageType == "kakarot") {
      await exec("npm run initialize-kakarot");

      await exec("npm run setup-kakarot");

      const tool_versions = await getVersionsFromToolFile(
        path.join(projectPath, "/contracts/.tool-versions")
      );

      await exec(
        `npm run install --scarb-version=${tool_versions.scarb} --legacy-peer-deps`
      );

      // await exec("npm run install-tools");
    } else if (packageType !== "contract_only") {
      await exec("npm run install --legacy-peer-deps");
    }
    npmSpinner.succeed();

    console.log("The installation is done!");
    console.log("You can now run the scaffold with:");
    console.log(`    cd ${packageName}`);

    if (packageType == "kakarot") {
      console.log(`    npm run start-kakarot`);
    } else {
      console.log(`    npm run start`);
    }
  } catch (err) {
    // clean up in case of error, so the user does not have to do it manually
    fs.rmSync(projectPath, { recursive: true, force: true });
    console.error(`Error: ${err.message}`);
  } finally {
    rl.close();
  }
};

/**
 * Reads the .tool-versions file and returns the versions of packages.
 * @param {string} filePath - The path to the .tool-versions file.
 * @returns {Promise<Object>} - A promise that resolves to an object containing package names and their versions.
 */
function getVersionsFromToolFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }

      const versions = {};
      const lines = data.trim().split("\n");

      for (const line of lines) {
        const [packageName, version] = line
          .split(" ")
          .map((item) => item.trim());
        if (packageName && version) {
          versions[packageName] = version;
        }
      }

      resolve(versions);
    });
  });
}

/**
 * Reads the Scarb.toml file and returns the versions of dojo
 * @param {string} filePath - The path to the Scarb.toml file.
 * @returns {string} - A string corresponding to the dojo version.
 */
function getDojoVersion(filePath) {
  const tomlContent = fs.readFileSync(filePath, "utf-8");

  // Use a regular expression to match the Dojo version tag
  const dojoVersionMatch = tomlContent.match(
    /dojo\s*=\s*{[^}]*tag\s*=\s*"v([\d\w\.\-]+)"/
  );

  // Check if the match was found and return the version with 'v' prefix
  if (dojoVersionMatch && dojoVersionMatch[1]) {
    return dojoVersionMatch[1];
  }

  // Return null if no version found
  return null;
}

installPackage();
