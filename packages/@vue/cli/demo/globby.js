const globby = require("globby");

(async () => {
  const files = await globby(["**/*"], {cwd: './demo'});
  console.log("files", files);
})();
