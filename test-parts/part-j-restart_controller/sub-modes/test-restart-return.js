const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const requestFile = require(commonPaths.requestApi);


function testProcessReturnObject(procRetObj)
{
	commonFunctionsFile.testPresent(procRetObj);
	commonFunctionsFile.testType(procRetObj, 'object');
	
	commonFunctionsFile.testObjectPropertyDefinition(procRetObj, 'success');
	commonFunctionsFile.testObjectPropertyContent(procRetObj, 'success', 'boolean');
	expect(procRetObj.success).to.be.true;
}


function testOfflineCheckResult(offlineReturn)
{
	var offlineRead = requestFile.getApplicationOnlineResult(offlineReturn);
	expect(offlineRead).to.be.false;
}


exports.callTestProcessReturnObject = testProcessReturnObject;
exports.callTestOfflineCheckResult = testOfflineCheckResult;