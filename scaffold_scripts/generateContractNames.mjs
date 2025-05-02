import { readdirSync, readFileSync, writeFileSync } from "fs";
import { resolve, join } from "path";

const configPath = resolve(process.cwd(), "configs/scaffold.config.json");
const contractsDir = resolve(process.cwd(), "contracts/src");

/**
 * Scans the contracts directory and returns an array of contract names.
 * @returns {string[]} An array of contract names.
 */
function getContractNames() {
  try {
    // Read all files in the contracts directory with .cairo extension
    const cairoFiles = readdirSync(contractsDir).filter((file) =>
      file.endsWith(".cairo")
    );

    // Extract contract names using regex
    return cairoFiles.flatMap((file) => {
      const filePath = join(contractsDir, file);
      const content = readFileSync(filePath, "utf-8");
      const contractRegex = /#\[\s*starknet::contract\s*]\s*mod\s+(\w+)/g;
      const matches = [...content.matchAll(contractRegex)];
      return matches.map((match) => match[1]); // Extract the contract name from each match
    });
  } catch (err) {
    throw new Error(`Failed to read contract files: ${err.message}`);
  }
}

/**
 * Reads a JSON configuration file and updates the contract names array
 * @param {string[]} contractNames - The array of contract names for updating.
 */
function updateConfigFileWithContractNames(contractNames) {
  try {
    const config = JSON.parse(readFileSync(configPath, "utf-8"));

    // Update and write the configuration file
    config["contract-names"] = contractNames;
    writeFileSync(configPath, JSON.stringify(config, null, 2));

    console.log("Contract names added to config file successfully!");
  } catch (err) {
    throw new Error(`Error updating config file: ${err.message}`);
  }
}

/**
 * Main function to scan contracts and update the configuration file.
 */
function main() {
  try {
    const contractNames = getContractNames();
    console.log("Contracts found:", contractNames);

    updateConfigFileWithContractNames(contractNames);
  } catch (err) {
    console.error(err.message);
  }
}

main();
