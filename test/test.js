const assert = require('assert');
const importExportTest = require('./testableFunctions').importExportTest;

describe('1. import export test', function () {
  it('should console log', function () {
    // 3. ASSERT
    // expect(sum2).to.be.equal(sum1);
    importExportTest('yoo');
  });
});
