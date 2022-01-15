module.exports = {};
module.exports.addTwoNumbers = addTwoNumbers;
// const getFileStats = require('./testableFunctions').getFileStats;

// have to set "type": "module", but then require() will stop working
// import { exportImportTest } from './usefulFunctios';
// export const exportImportTest = (s) => {
//   console.log('Workx: ' + s);
// };

// SIMPLE EXAMPLE
module.exports.importExportTest = importExportTest;
function importExportTest(s) {
  console.log('Workx: ' + s);
}

function addTwoNumbers(x, y) {
  return x + y;
}
