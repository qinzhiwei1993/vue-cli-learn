// 解析参数
// 从0开始截取的结果
// _:
//    [ '/Users/qinzhiwei/.nvm/versions/node/v10.21.0/bin/node', // node的路径
//      '/Users/qinzhiwei/IT/git/source-code/vue-cli/packages/@vue/cli/mock/minimist.js', // 运行的文件路径
//      'ha',
//      'ji' ] 
console.log(process.argv)
var argv = require('minimist')(process.argv.slice(0));
console.log(argv);