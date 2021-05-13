/**
 * Script to clean local environment. Usage:
 * `yarn clean` to clean build artifacts
 * `yarn clean --reset` to totally reset local environment by removing build artifacts, node modules, and .env files.
 */

const fs = require("fs");
const glob = require("glob");

const args = process.argv.slice(2);

const foldersToDelete = [
  "./packages/types/dist",
  "./packages/common/dist",
  "./packages/server/__build__",
  "./packages/web/build",
];

const globsToDelete = [
  "./packages/**/tsconfig*.tsbuildinfo",
  "./packages/web/.env",
];

const foldersToDeleteForFullReset = [
  "./node_modules",
  "./packages/types/node_modules",
  "./packages/web/node_modules",
  "./packages/server/node_modules",
  "./packages/common/node_modules",
];

const globsToDeleteForFullReset = [
  "./packages/web/.env",
  "./packages/server/.env",
];

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

    console.log(`  🗑  Deleting "${path}"...`);
    fs.rmdirSync(path);
  }
}

function deleteGlob(globString) {
  glob.sync(globString, { cwd: ".", nodir: true }).forEach(f => {
    console.log(`  🗑  Deleting file "${f}"...`);
    fs.lstatSync(f).isFile() && fs.unlinkSync(f);
  });
}

console.log("🧹  Cleaning...");

foldersToDelete.forEach(deleteFolderRecursive);
globsToDelete.forEach(deleteGlob);

if (args[0] === "--reset") {
  foldersToDeleteForFullReset.forEach(deleteFolderRecursive);
  globsToDeleteForFullReset.forEach(deleteGlob);
}

console.log("🧼  Successfully cleaned.");
