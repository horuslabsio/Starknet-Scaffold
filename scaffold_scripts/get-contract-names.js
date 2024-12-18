const fs = require("fs");
const path = require("path");

const configPath = path.resolve(__dirname, "../configs/scaffold.config.json");

// Function to scan files in a directory
function getContractNames() {
  const contractNames = [];

  // Read all files in the directory
  const contractsDir = path.resolve(__dirname, "../contracts/src");
  const files = fs.readdirSync(contractsDir);

  // Filter files with .cairo extension
  const cairoFiles = files.filter((file) => file.endsWith(".cairo"));

  cairoFiles.forEach((file) => {
    const filePath = path.join(contractsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    // Use regex to find contracts with #[starknet::contract] and module name
    const contractRegex = /#\[\s*starknet::contract\s*]\s*mod\s+(\w+)/g;
    let match;

    while ((match = contractRegex.exec(content)) !== null) {
      const contractName = match[1]; // The module name after 'mod'
      contractNames.push(contractName);
    }
  });

  return contractNames;
}

// Function to update the JSON file
function updateConfigFileWithContractNames(contractNames) {
  try {
    // Read the existing JSON file
    const jsonData = fs.readFileSync(configPath, "utf-8");
    const config = JSON.parse(jsonData);

    // Update the "contract-names" array
    config["contract-names"] = contractNames;

    // Write the updated JSON back to the file
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log("Contract names added to config file successfully!");
  } catch (err) {
    console.error("Error adding contract names to config file:", err.message);
  }
}

try {
  const contractNames = getContractNames();
  console.log("Contracts found:", contractNames);

  updateConfigFileWithContractNames(contractNames);
} catch (err) {
  console.error("Error scanning files:", err.message);
}
