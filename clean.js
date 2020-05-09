const fs = require("fs");
const glob = require("glob");

const foldersToDelete = [
  "./packages/types/dist",
  "./packages/common/dist",
  "./packages/server/__build__",
  "./packages/web/build",
];

const globsToDelete = ["./packages/**/tsconfig*.tsbuildinfo"];

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function(file) {
      const curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });

    console.log(`  🗑  Deleting directory "${path}"...`);
    fs.rmdirSync(path);
  }
}

function deleteGlob(globString) {
  glob.sync(globString, { cwd: ".", nodir: true }).forEach(f => {
    console.log(`  🗑  Deleting file "${f}"...`);
    fs.lstatSync(f).isFile() && fs.unlinkSync(f);
  });
}

console.log("🧹  Cleaning build artifacts...");

foldersToDelete.forEach(deleteFolderRecursive);
globsToDelete.forEach(deleteGlob);

console.log("🧼  Successfully cleaned build artifacts.");
