import "dotenv/config";
import { getRPSChoices } from "./game.js";
import { capitalize, InstallGlobalCommands } from "./utils.js";

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Verse command
const VERSE_COMMAND = {
  name: "verse",
  description: "displays a bible verse",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

// Simple test command
const TEST_COMMAND = {
  name: "test",
  description: "Basic command",
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const ALL_COMMANDS = [TEST_COMMAND, VERSE_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
