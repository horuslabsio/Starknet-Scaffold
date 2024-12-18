const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Load configuration
const configPath = path.resolve(__dirname, "../configs/scaffold.config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// Destructure variables
const {
  feeToken,
  maxFee,
  account: { name, profile },
} = config;

// Build the command
const command = `cd contracts && sncast --profile ${profile} account deploy --name ${name} --fee-token ${feeToken} --max-fee ${maxFee}`;

try {
  console.log("Running deploy-account command...");
  execSync(command, { stdio: "inherit" });
  console.log("Account deployed successfully!");
} catch (error) {
  console.error("Error deploying account:", error.message);
  process.exit(1);
}
