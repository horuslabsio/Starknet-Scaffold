import cp, { execSync } from "child_process";
import { readFileSync, existsSync, writeFileSync } from "fs";
import { resolve } from "path";
import { createInterface } from "readline";
import { promisify } from "util";
import ora from "ora";

// Resolve config path
const configPath = resolve(process.cwd(), "configs/scaffold.config.json");
const deploymentsPath = resolve(
  process.cwd(),
  "configs/deployments.config.json"
);

// convert libs to promises
const exec = promisify(cp.exec);

// Check if the config file exists
if (!existsSync(configPath) || !existsSync(deploymentsPath)) {
  console.error("Error: Config file not found. Ensure the correct setup.");
  process.exit(1);
}

// Load and parse the configuration file
let config;
try {
  config = JSON.parse(readFileSync(configPath, "utf-8"));
} catch (error) {
  console.error("Error reading or parsing the config file:", error.message);
  process.exit(1);
}

// Initialize readline interface
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Prompt the user with a question and return their response.
 * @param {string} question - The question to ask.
 * @returns {Promise<string>} - User's input.
 */
const askQuestion = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

/**
 * Display contract names and prompt the user to select one.
 * @returns {Promise<string>} - The selected contract name.
 */
async function getContract() {
  const contracts = config["contracts"] || [];

  if (!contracts.length) {
    console.error(
      "No contracts found. Please run 'npm run generate-contract-names' and try again."
    );
    process.exit(1);
  }

  console.log("Available Contracts:");
  contracts.forEach((contract, index) =>
    console.log(`${index + 1}. ${contract}`)
  );

  while (true) {
    const choice = await askQuestion(
      `Select the contract to declare (1-${contracts.length}): `
    );
    const selectedIndex = parseInt(choice, 10) - 1;

    if (selectedIndex >= 0 && selectedIndex < contracts.length) {
      return contracts[selectedIndex];
    }

    console.log("Invalid choice. Please try again.");
  }
}

/**
 * Validate if `sncast` is available in the environment.
 */
async function validateSncast() {
  try {
    await exec("sncast --version");
  } catch {
    console.error("Error: `sncast` is not installed or not in PATH.");
    process.exit(1);
  }
}

/**
 * Reads a JSON configuration file and updates the deployment details.
 * @param {string} network - The network of deployment.
 * @param {string} contract - The name of the declared contract.
 * @param {string} classHash - The declared class hash.
 */
function updateDeploymentConfig(network, contract, classHash) {
  try {
    const deployments = JSON.parse(readFileSync(deploymentsPath, "utf-8"));

    if (!deployments[network]) {
      deployments[network] = {};
    }

    // Update and write the configuration file
    deployments[network][contract] = {
      contract,
      classHash,
      constructorArgs: [],
      address: "",
    };

    // Save updated deployments
    writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
  } catch (err) {
    throw new Error(`Error updating deployments config file: ${err.message}`);
  }
}

(async () => {
  const spinner = ora();

  try {
    // Validate `sncast` availability
    validateSncast();

    // Destructure config variables
    const {
      network,
      feeToken,
      account: { profile },
    } = config;

    // Get the selected contract name
    const contract = await getContract();

    // Build the command
    const command = `cd contracts && sncast --profile ${profile} declare --contract-name ${contract} --fee-token ${feeToken}`;

    spinner.start("Declaring contract...");
    const output = await exec(command);

    if (output.stderr) {
      throw new Error(output.stderr);
    }

    const classHashMatch = output.stdout.match(
      /class_hash:\s*(0x[0-9a-fA-F]+)/
    );
    const classHash = classHashMatch ? classHashMatch[1] : null;

    if (!classHash) {
      throw new Error("class_hash not found in command output.");
    }

    updateDeploymentConfig(network, contract, classHash);

    spinner.succeed("Contract declared successfully.");
    console.log("Run 'npm deploy-contract' to deploy a contract.");
  } catch (error) {
    spinner.fail("Error during contract declaration.");
    console.error("Error:", error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
})();
