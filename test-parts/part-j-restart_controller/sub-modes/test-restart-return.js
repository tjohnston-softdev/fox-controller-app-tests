const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const requestFile = require(commonPaths.requestApi);


function testProcessReturnObject(procObj)
{
	commonFunctionsFile.testPresent(procObj);
	expect(procObj).to.be.an("object");
	
	objectFunctions.testPropExists(procObj, 'success');
	expect(procObj.success).to.be.true;
}


function testControllerOfflineCheckResult(offlineReturn)
{
	var offlineRead = requestFile.getOnlineResult(offlineReturn);
	expect(offlineRead).to.be.false;
}


module.exports =
{
	testProcessReturn: testProcessReturnObject,
	testOfflineCheckResult: testControllerOfflineCheckResult
};