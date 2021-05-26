const chai = require("chai");
const expect = require("chai").expect;
const commonPaths = require("../../../app/paths/files/app-paths");
const commonErrorsFile = require(commonPaths.commonErrors);


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
			testFunctionProperty('writeKeyNotFoundError');
			testFunctionProperty('writeRemoteIoPropertyError');
			testFunctionProperty('writeRemoteIoPropertySupport');
			testFunctionProperty('writeRemoteIoPropertyConstruct');
			testFunctionProperty('writeConnectDeviceProperty');
			testFunctionProperty('writeSetDeviceOutputWrong');
			testFunctionProperty('writeRegisterPrefixIndex');
			testFunctionProperty('writeUnexpectedTokenError');
			testFunctionProperty('writeUnexpectedTokenErrorNull');
			testFunctionProperty('writeUnexpectedTokenErrorType');
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
	expect(pValue).to.be.a("string");
	expect(pValue).to.not.be.empty;
}


module.exports = testCommonErrors;