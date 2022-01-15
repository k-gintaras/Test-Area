// const fse = require('fs-extra');
const { resolve, join } = require('path');
const { readdir, stat, copyFile, mkdir } = require('fs').promises;

module.exports = {};
module.exports.getFiles = getFiles;
module.exports.getFilesByType = getFilesByType;
module.exports.getFileStats = getFileStats;
module.exports.copyFileExtra = copyFileExtra;
module.exports.doCreateFolder = doCreateFolder;

// have to set "type": "module", but then require() will stop working
// import { exportImportTest } from './usefulFunctios';
// export const exportImportTest = (s) => {
//   console.log('Workx: ' + s);
// };

function getFileStats(path) {
  return stat(path);
}

function doCreateFolder(where, dirName) {
  // TODO: require resolve
  const newPath = join(where, dirName);
  mkdir(newPath)
    .then((res) => {
      console.log('created: ' + res);
    })
    .catch((res) => {
      console.log('error: ' + res);
    });
}

function copyFileExtra(fromWhereWithFileName, toWhereWithFileName) {
  return copyFile(fromWhereWithFileName, toWhereWithFileName)
    .then((res) => {
      console.log('copied: ' + res);
    })
    .catch((res) => {
      console.log('error: ' + res);
    });
}

// thanks to @qwtel
// https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files.reduce((a, f) => a.concat(f), []);
}

async function getFilesByType(dir, hasString) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return files
    .reduce((a, f) => a.concat(f), [])
    .filter((res) => {
      return res.indexOf(hasString) > -1;
    });
}

// function getFilesByType(dirName, hasString) {
//   return getFiles(dirName).then((res) => {
//     console.log(res);
//     return res.filter((val) => {
//       val.indexOf(hasString) > -1;
//     });
//   });
// }

function error(err) {
  console.log(err);
}
