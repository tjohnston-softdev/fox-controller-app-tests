const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonErrorsFile = getCommonErrorsFile();


function testCommonErrors()
{
	describe("Common Errors", function()
	{
		verifyCommonErrorFileExists();
		verifyCommonErrorPropertiesValid();
	});
}

function verifyCommonErrorFileExists()
{
	it("File Exists (common-errors)", function()
	{
		expect(commonErrorsFile).to.not.be.undefined;
		expect(commonErrorsFile).to.not.be.null;
		expect(commonErrorsFile).to.be.a('object');
	});
}

function verifyCommonErrorPropertiesValid()
{
	it("Properties Valid", function()
	{
		testStringProperty('nullObject');
		testStringProperty('idMissing');
		testStringProperty('ipInvalid');
		testStringProperty('deviceNotObject');
		testStringProperty('getPropertiesUndefined');
		testStringProperty('keyArg');
		testStringProperty('missingModule');
		testStringProperty('connectObject');
		testStringProperty('negativeNumberObject');
		
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
}

function testFunctionProperty(pName)
{
	var pQuote = "'" + pName + "'";
	var pType = typeof commonErrorsFile[pName];
	var pExists = false;
	
	if (commonErrorsFile[pName] !== null && pType !== "undefined" && pType === "function")
	{
		pExists = true;
	}
	else if (commonErrorsFile[pName] !== null && pType !== "undefined")
	{
		pExists = false;
		notTypeError(pQuote, "function");
	}
	else
	{
		pExists = false;
		notExistError(pQuote);
	}
	
	expect(pExists).to.be.true;
}

function testStringProperty(pName)
{
	var pQuote = "'" + pName + "'";
	var pType = typeof commonErrorsFile[pName];
	var pExists = false;
	
	if (commonErrorsFile[pName] !== null && pType !== "undefined" && pType === "string" && pType.length > 0)
	{
		pExists = true;
	}
	else if (commonErrorsFile[pName] !== null && pType !== "undefined" && pType === "string")
	{
		pExists = false;
		emptyError();
	}
	else if (commonErrorsFile[pName] !== null && pType !== "undefined")
	{
		pExists = false;
		notTypeError(pQuote, "string");
	}
	else
	{
		pExists = false;
		notExistError(pQuote);
	}
	
	expect(pExists).to.be.true;
}


function getCommonErrorsFile()
{
	var errFile = null;
	
	try
	{
		errFile = require(commonPaths.commonErrorsFile);
	}
	catch(e)
	{
		errFile = null;
	}
	
	return errFile;
}

function notTypeError(eQuote, eType)
{
	throw new Error(eQuote + " is not a " + eType);
}

function notExistError(eQuote)
{
	throw new Error(eQuote + " does not exist");
}

function emptyError(eQuote)
{
	throw new Error(eQuote + " cannot be empty");
}

exports.callTestCommonErrors = testCommonErrors;