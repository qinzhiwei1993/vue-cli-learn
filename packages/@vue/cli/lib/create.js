// 创建项目交互

// 是否在当前目录创建
// 是否覆盖当前已存在目录
// 是否在已存在目录上继续构建

const fs = require('fs-extra') // 在fs模块的基础上增加了原本不支持的部分方法，并支持了promise
const path = require('path')
const inquirer = require('inquirer') // 命令行交互
const Creator = require('./Creator')
const { clearConsole } = require('./util/clearConsole')
const { getPromptModules } = require('./util/createTools') // 获取提示的模块 
const { chalk, error, stopSpinner, exit } = require('@vue/cli-shared-utils')
const validateProjectName = require('validate-npm-package-name') // 校验当前npm包的名称是否可以用

async function create (projectName, options) {
  // 是否使用代理
  if (options.proxy) {
    process.env.HTTP_PROXY = options.proxy
  }


  // process.cwd()  node命令执行时所在的目录
  // __dirname 被执行js所在的文件夹

  const cwd = options.cwd || process.cwd()
  const inCurrent = projectName === '.' // 是否以当前文件为初始化项目的根目录
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || '.')

  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach(err => {
      console.error(chalk.red.dim('Error: ' + err))
    })
    result.warnings && result.warnings.forEach(warn => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })
    exit(1) // 退出进程
  }

  

  // 存在当前目录，并且不合并
  if (fs.existsSync(targetDir) && !options.merge) {
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      
      await clearConsole() // 这里执行失败 ？？？？？？
      if (inCurrent) {
        const { ok } = await inquirer.prompt([
          {
            name: 'ok',
            type: 'confirm',
            message: `Generate project in current directory?`
          }
        ])
        if (!ok) {
          return
        }
      } else {
        
        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
            choices: [
              { name: 'Overwrite', value: 'overwrite' },
              { name: 'Merge', value: 'merge' },
              { name: 'Cancel', value: false }
            ]
          }
        ])
        if (!action) {
          return
        } else if (action === 'overwrite') {
          console.log(`\nRemoving ${chalk.cyan(targetDir)}...`)
          await fs.remove(targetDir)
        }
      }
    }
  }
  
  const creator = new Creator(name, targetDir, getPromptModules())
  await creator.create(options)
}

module.exports = (...args) => {
  return create(...args).catch(err => {
    stopSpinner(false) // do not persist
    error(err)
    if (!process.env.VUE_CLI_TEST) {
      process.exit(1)
    }
  })
}
