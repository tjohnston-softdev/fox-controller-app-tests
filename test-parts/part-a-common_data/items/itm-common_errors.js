const chai = require("chai");
const expect = require("chai").expect;
const commonPaths = require("../../../app/paths/files/app-paths");
const commonErrorsFile = require(commonPaths.commonErrors);
const testCommon = require(commonPaths.testCommon);


function testCommonErrors()
{
	describe("Common Errors", function()
	{
		it("Strings Valid", function()
		{
			testStringProperty('nullObject');
			testStringProperty('idMissing');
			testStringProperty('ipInvalid');
			testStringProperty('deviceNotObject');
			testStringProperty('rioPropertiesUndefined');
			testStringProperty('keyArg');
			testStringProperty('missingModule');
			testStringProperty('connectObject');
			testStringProperty('negativeNumberObject');
		});
		
		it("Functions Valid", function()
		{
			testFunctionProperty('writeKeyNotFound');
			testFunctionProperty('writeRemoteIoPropertyGeneral');
			testFunctionProperty('writeRemoteIoPropertySupport');
			testFunctionProperty('writeRemoteIoPropertyConstruct');
			testFunctionProperty('writeConnectDeviceProperty');
			testFunctionProperty('writeSetDeviceOutputWrong');
			testFunctionProperty('writeRegisterPrefixIndex');
			testFunctionProperty('writeUnexpectedTokenGeneral');
			testFunctionProperty('writeUnexpectedTokenNull');
			testFunctionProperty('writeUnexpectedTokenType');
			testFunctionProperty('writeTest');
		});
		
	});
}

function testFunctionProperty(pName)
{
	var pValue = commonErrorsFile[pName];
	expect(pValue).to.be.a("function");
}



function testStringProperty(pName)
{
	var pValue = commonErrorsFile[pName];
	testCommon.testString(pValue);
}


module.exports = testCommonErrors;