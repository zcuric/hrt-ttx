const {
  handlePromptInput,
  handlePagination,
  helpText,
  showImage
} = require("./helpers");
const chalk = require("chalk");
const figlet = require("figlet");
const readline = require("readline");

const init = () => {
  console.log(
    chalk.red(
      figlet.textSync("+ HRT TELETEKST +", {
        horizontalLayout: "default",
        verticalLayout: "default"
      })
    )
  );

  if (
    process.env.TERM_PROGRAM !== "iTerm.app" ||
    process.platform !== "darwin"
  ) {
    console.log(
      chalk.white.bgRed("Currently only supported in iTerm and MacOS. Sorry :(")
    );
    process.exit(0);
  }
  helpText();
};

const run = async () => {
  init();
  if (process.stdin.isTTY) process.stdin.setRawMode(true);
  let options = { page: 100, subPage: 1 };
  await showImage(options);
  readline.emitKeypressEvents(process.stdin);
  process.stdin.on("keypress", async (_, key) => {
    if (key.ctrl && key.name === "c") return process.exit();
    if (["right", "left", "up", "down"].includes(key.name)) {
      options = handlePagination(options, key.name);
      await showImage(options);
    }
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${chalk.green(">")} ${chalk.italic("Enter page:")} `,
    terminal: true
  });

  rl.prompt();
  console.log("");
  rl.on("line", async line => {
    const input = line.trim();
    if (input === "exit") return process.exit(0);
    if (input === "help") return helpText();
    options = handlePromptInput(input, options);
    await showImage(options);
  }).on("close", () => {
    process.exit(0);
  });
};

const cli = async () => {
  try {
    await run();
  } catch (e) {
    console.log(chalk.white.bgRed("Something went wrong. :("));
  }
};

module.exports = {
  cli
};
