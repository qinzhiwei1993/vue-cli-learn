// 格式化入参，返回一个argv对象
// node demo/minimist.js -x 3 -y 4 -n5 -abc --beep=boop --m foo bar baz
const minimist = require("minimist");
console.log(process.argv)
const argv = minimist(process.argv);
console.log(argv);

// [ '/Users/qinzhiwei/.nvm/versions/node/v10.21.0/bin/node',
//   '/Users/qinzhiwei/IT/git/source-code/vue-cli/packages/@vue/cli/demo/minimist.js',
//   '-x3',
//   '-y',
//   '4',
//   '-n',
//   '5',
//   '--a',
//   '--b',
//   '--beep=boop',
//   '--test' ]

// { _:
//     [ '/Users/qinzhiwei/.nvm/versions/node/v10.21.0/bin/node',
//       '/Users/qinzhiwei/IT/git/source-code/vue-cli/packages/@vue/cli/demo/minimist.js' ],
//    x: 3,
//    y: 4,
//    n: 5,
//    a: true,
//    b: true,
//    beep: 'boop',
//    test: true }
