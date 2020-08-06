#!/usr/bin/env node
// 指定解释器，在环境变量PATH中去寻找
// #!/Users/qinzhiwei/.nvm/versions/node/v10.21.0/bin/node  指定固定的node路径

const program = require("commander");
const leven = require('leven')
const { chalk } = require("@vue/cli-shared-utils");

program
  .version(`0.0.1`) // 定义vue -V 返回的版本信息
  .usage("<command> [options]"); // 定义脚手架使用方法

program
  .command("create <app-name>")
  .description("create a new project powered by vue-cli-service")
  .option("-p, --preset <presetName>", "Skip prompts and use saved or remote preset")
  .option("-d, --default", "Skip prompts and use default preset")
  .option("-i, --inlinePreset <json>", "Skip prompts and use inline JSON string as preset")
  .option("-m, --packageManager <command>", "Use specified npm client when installing dependencies")
  .option("-r, --registry <url>", "Use specified npm registry when installing dependencies (only for npm)")
  .option("-g, --git [message]", "Force git initialization with initial commit message")
  .option("-n, --no-git", "Skip git initialization")
  .option("-f, --force", "Overwrite target directory if it exists")
  .option("--merge", "Merge target directory if it exists")
  .option("-c, --clone", "Use git clone when fetching remote preset")
  .option("-x, --proxy", "Use specified proxy when creating project")
  .option("-b, --bare", "Scaffold project without beginner instructions")
  .option("--skipGetStarted", 'Skip displaying "Get started" instructions')
  .action((name, cmd) => {
    // name 输入的参数<app-name>  cmd 定义的command对象
    console.log(`name:${name}`);
  });

  program
  .command('invoke <plugin> [pluginOptions]')
  .description('invoke the generator of a plugin in an already created project')
  .option('--registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')
  .allowUnknownOption() // 命令中允许有未知的选项，不处理即可
  .action((plugin) => {
    console.log('plugin:', plugin)
  })

// 命令推荐
function suggestCommands (unknownCommand) {
    const availableCommands = program.commands.map(cmd => cmd._name)
  
    let suggestion
  
    availableCommands.forEach(cmd => {
      const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
      if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
        suggestion = cmd
      }
    })
  
    if (suggestion) {
      console.log(`  ` + chalk.red(`Did you mean ${chalk.yellow(suggestion)}?`))
    }
  }

// output help information on unknown commands
program.arguments("<command>").action(cmd => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
  suggestCommands(cmd)
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

// 缺少必要参数
program.Command.prototype.missingArgument = function(...args) {
  this.outputHelp();
  console.log(
    `  ` + chalk.red(`Missing required argument ${chalk.yellow(`<${args}>`)}.`)
  );
  console.log();
  process.exit(1);
};

// 未知的选项
program.Command.prototype.unknownOption = function(...args) {
  if (this._allowUnknownOption) {
    return;
  }
  this.outputHelp();
  console.log(`  ` + chalk.red(`Unknown option ${chalk.yellow(args)}.`));
  console.log();
  process.exit(1);
};

// 选项缺少参数
program.Command.prototype.optionMissingArgument = function(option, flag) {
  this.outputHelp();
  let output =
    `Missing required argument for option ${chalk.yellow(option.flags)}` +
    (flag ? `, got ${chalk.yellow(flag)}` : ``);
  console.log(`  ` + chalk.red(output));
  console.log();
  process.exit(1);
};

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
