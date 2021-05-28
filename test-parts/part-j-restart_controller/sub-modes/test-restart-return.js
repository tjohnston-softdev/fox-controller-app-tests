const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const requestFile = require(commonPaths.requestApi);


function testProcessReturnObject(procObj)
{
	commonFunctionsFile.testPresent(procObj);
	expect(procObj).to.be.an("object");
	
	commonFunctionsFile.testObjectPropertyDefinition(procObj, 'success');
	expect(procObj.success).to.be.true;
}


function testOfflineCheckResult(offlineReturn)
{
	var offlineRead = requestFile.getOnlineResult(offlineReturn);
	expect(offlineRead).to.be.false;
}


module.exports =
{
	callTestProcessReturnObject: testProcessReturnObject,
	callTestOfflineCheckResult: testOfflineCheckResult
};