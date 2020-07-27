// 格式化入参，返回一个argv对象
// node demo/minimist.js -x 3 -y 4 -n5 -abc --beep=boop --m foo bar baz
const minimist = require("minimist");
const argv = minimist(process.argv);
console.log(argv);

// { _:
//     [ '/Users/qinzhiwei/.nvm/versions/node/v10.21.0/bin/node',
//       '/Users/qinzhiwei/IT/git/source-code/vue-cli/packages/@vue/cli/demo/minimist.js',
//       'foo',
//       'bar',
//       'baz' ],
//    x: 3,
//    y: 4,
//    n: 5,
//    a: true,
//    b: true,
//    c: true,
//    m: true,
//    beep: 'boop' }
