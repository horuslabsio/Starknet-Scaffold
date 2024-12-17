const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Load configuration
const configPath = path.resolve(__dirname, "../configs/scaffold.config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

// Destructure variables
const {
  url,
  account: { name, profile },
} = config;

// Build the command
const command = `cd contracts && sncast account create --url ${url} --name ${name} --add-profile ${profile}`;

try {
  console.log("Running prepare-account command...");
  execSync(command, { stdio: "inherit" });
  console.log("Account prepared successfully!");
} catch (error) {
  console.error("Error preparing account:", error.message);
  process.exit(1);
}
