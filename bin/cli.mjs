#!/usr/bin/env node
import { promisify } from "util";
import cp from "child_process";
import path from "path";
import fs from "fs";
// cli spinners
import ora from "ora";
// cli prompts
import inquirer from "inquirer";

// convert libs to promises
const exec = promisify(cp.exec);
const rm = promisify(fs.rm);
const currentPath = process.cwd();

const { projectName } = await inquirer.prompt([
  {
    name: "projectName",
    message: "Insert the name of the project:",
    validate: (pickedName) => {
      if (pickedName.length < 1) {
        return "Project name must contain at least one character.";
      }

      const pickedProjectPath = path.join(currentPath, pickedName);
      if (fs.existsSync(pickedProjectPath)) {
        return `The directory "${pickedName}" already exist in the current directory, please give it another name.`;
      }
      return true;
    },
  },
]);

const { projectType } = await inquirer.prompt([
  {
    name: "projectType",
    type: "list",
    message: "What type of scaffold do you need?",
    choices: [
      {
        name: "Basic (recommended for easy boilerplate to kickstart your dapp)",
        value: "basic",
      },
      {
        name: "Full Package (recommended for early development process, needing a full debug suite)",
        value: "full",
      },
    ],
  },
]);

const projectPath = path.join(currentPath, projectName);

// get github repo
const git_repo = "https://github.com/argentlabs/Starknet-Scaffold.git";

try {
  const gitSpinner = ora("Downloading files...").start();
  // clone the repo into the project folder -> creates the new boilerplate
  await exec(`git clone --depth 1 ${git_repo} ${projectPath} --quiet`);
  gitSpinner.succeed();

  let basicCleanupTasks = [];
  if (projectType === "basic") {
    const FRONTEND_BASE_PATH = "frontend/src/app";
    const componentsToRemove = [
      "burner",
      `${FRONTEND_BASE_PATH}/components/Burner`,
      `${FRONTEND_BASE_PATH}/components/StarkDeployer`,
      `${FRONTEND_BASE_PATH}/wikipedia`,
      `${FRONTEND_BASE_PATH}/burner`,
    ];
    basicCleanupTasks.push(
      ...componentsToRemove.map((comp) =>
        rm(path.join(projectPath, comp), {
          recursive: true,
          force: true,
        }),
      ),
    );
  }

  // remove useless files
  const cleanSpinner = ora("Removing useless files").start();
  const rmGit = rm(path.join(projectPath, ".git"), {
    recursive: true,
    force: true,
  });
  const rmGithub = rm(path.join(projectPath, ".github"), {
    recursive: true,
    force: true,
  });
  const rmContributing = rm(path.join(projectPath, "CONTRIBUTING.md"), {
    recursive: true,
    force: true,
  });
  const rmBin = rm(path.join(projectPath, "bin"), {
    recursive: true,
    force: true,
  });
  await Promise.all([
    rmGit,
    rmBin,
    rmGithub,
    rmContributing,
    ...basicCleanupTasks,
  ]);

  process.chdir(projectPath);
  // remove the packages needed for cli
  await exec("npm uninstall ora cli-spinners inquirer");
  cleanSpinner.succeed();

  // install dependencies
  const npmSpinner = ora("Installing dependencies...").start();
  await exec("npm run install");
  npmSpinner.succeed();

  console.log("The installation is done!");
  console.log("You can now run the scaffold with:");
  console.log(`    cd ${projectName}`);
  console.log(`    npm run start`);
} catch (error) {
  // clean up in case of error, so the user does not have to do it manually
  fs.rmSync(projectPath, { recursive: true, force: true });
  console.log(error);
}
