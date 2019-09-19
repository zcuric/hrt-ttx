const chalk = require("chalk");
const got = require("got");
const termImg = require("term-img");

const helpText = () => {
  console.log(
    chalk.yellow(`
    Welcome to HRT Teletekst in iTerm2 on MacOS!
    - To use HRT Teletekst enter the desired page number in prompt, for example: 101
    - Press ${chalk.red(`right arrow ->`)} to go to the ${chalk.red(
      `next page`
    )}, 
    - Press ${chalk.red(`left arrow <-`)} to go to ${chalk.red(
      `previous page`
    )}.
    - To change sub page press ${chalk.red(`up`)} arrow, 
    - Press ${chalk.red(`down`)} to go to previous sub page.
    - Enter in prompt:
      ${chalk.red(`"hrvatska",
      "svijet",
      "kultura",
      "vrijeme",
      "promet",
      "sport"`)}
      to go to one of these pages,
    - enter ${chalk.red(`exit"`)} to exit" or press "ctrl + C".
    - enter ${chalk.red(`"help"`)} to show this help"

    Contribute on github.com/zcuric/hrt-ttx.

    Enjoy!
  `)
  );
};

const hrtTelextUrl = (page = 100, subPage = 1) =>
  `http://teletekst1.hrt.hr/images/${page}-0${subPage}.gif`;

const showImage = async ({ page = 100, subPage = 1 }) => {
  const fallback = () =>
    console.log("Images are only supported in iTerm >= 3. Sorry. :(");
  try {
    console.log("");
    const { body } = await got(hrtTelextUrl(page, subPage), { encoding: null });
    termImg(body, { fallback, width: "600px" });
    console.log("");
  } catch (e) {
    console.log(
      `${chalk.red.italic(
        `> Page ${page}-0${subPage} not found on HRT Teletekst`
      )}`
    );
  }
};

const handlePromptInput = (input, { subPage }) => {
  const pages = {
    hrvatska: 110,
    svijet: 150,
    kultura: 250,
    vrijeme: 450,
    promet: 470,
    sport: 500
  };

  if (pages[input]) return { page: pages[input], subPage: 1 };
  if (input < 100 || input > 999) return { page: 100, subPage: 1 };
  return { page: input, subPage };
};

const handlePagination = ({ page, subPage }, key = "") => {
  if (key === "right") {
    page++;
    subPage = 1;
  }
  if (key === "left") {
    page--;
    subPage = 1;
  }
  if (key === "up") subPage++;
  if (key === "down") subPage--;
  if (subPage < 1) subPage = 1;
  if (page < 100 || page > 999) return { page: 100, subPage: 1 };
  return { page, subPage };
};

module.exports = {
  helpText,
  handlePromptInput,
  handlePagination,
  showImage
};
