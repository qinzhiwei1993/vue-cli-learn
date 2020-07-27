#!/usr/bin/env node

const program = require("commander");
const { chalk } = require("@vue/cli-shared-utils");

program
  .version(`@vue/cli ${require("../package").version}`) // 定义vue -V 返回的版本信息
  .usage("<command> [options]"); // 定义脚手架使用方法

program.commands.forEach(c => c.on("--help", () => console.log()));

// output help information on unknown commands
program.arguments("<command>").action(cmd => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});

// add some useful info on help
program.on("--help", () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(
      `vue <command> --help`
    )} for detailed usage of given command.`
  );
  console.log();
});

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
