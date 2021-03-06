const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const requestFile = require(commonPaths.requestApi);


function testProcessReturnObject(procObj)
{
	commonFunctions.testObject(procObj);
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