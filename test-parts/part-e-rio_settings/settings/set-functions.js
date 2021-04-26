const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelativeFile);
const commonFunctionsFile = require(commonPaths.testCommonFull);

const subRequire = require("../sub-settings/get-rio-set");
const settingsFile = subRequire.getRemoteIoSettingsFile();
const prefixIndexFile = getPrefixIndexFile();

var prefixIndexObject = null;

var gSpy = null;
var prefixSpy = null;
var indexSpy = null;

function testRemoteIoFunctions()
{
	describe("Functions", function()
	{
		checkPrepare();
		
		checkGetSignalTypeFunction();
		checkParsePrefixFunction();
		checkParseIndexFunction();
		
		checkDispose();
	});
}

function checkPrepare()
{
	describe("Preperation", function()
	{
		it("Files Ready", function(done)
		{
			commonFunctionsFile.testPresent(settingsFile);
			commonFunctionsFile.testType(settingsFile, 'object');
			
			commonFunctionsFile.testPresent(prefixIndexFile);
			commonFunctionsFile.testType(prefixIndexFile, 'object');
			
			done();
		});
		
		it("Prefix Index Object Retrieved", function(done)
		{
			prefixIndexObject = prefixIndexFile.callGetIoSetObject();
			
			commonFunctionsFile.testPresent(prefixIndexObject);
			commonFunctionsFile.testType(prefixIndexObject, 'object');
			
			done();
		});
		
		it("Spy Objects Assigned", function(done)
		{
			gSpy = sinon.spy(settingsFile, 'getSignalType');
			prefixSpy = sinon.spy(settingsFile, 'parseIoPrefix');
			indexSpy = sinon.spy(settingsFile, 'parseIoIndex');
			
			done();
		});
		
		
	});
}


function checkGetSignalTypeFunction()
{
	var aValid = 'DI';
	var aInvalid = 'UNKNOWN';
	var aInvalidType = -1;
	
	describe("Function - Get Signal Type (getSignalType)", function()
	{
		
		it("Call - Valid IO Type", function()
		{
			settingsFile.getSignalType(aValid);
			
			commonFunctionsFile.testTrue(gSpy.calledOnce);
			expect(gSpy.firstCall.args).to.deep.equal([aValid]);
			commonFunctionsFile.testPresent(gSpy.firstCall.returnValue);
			commonFunctionsFile.testType(gSpy.firstCall.returnValue, 'number');
			expect(gSpy.firstCall.returnValue).to.equal(0);
		});
		
		it("Call - Invalid IO Type", function()
		{
			settingsFile.getSignalType(aInvalid);
			
			commonFunctionsFile.testPresent(gSpy.lastCall);
			expect(gSpy.lastCall.args).to.deep.equal([aInvalid]);
			commonFunctionsFile.testPresent(gSpy.lastCall.returnValue);
			commonFunctionsFile.testType(gSpy.lastCall.returnValue, 'number');
			expect(gSpy.lastCall.returnValue).to.equal(1);
		});
		
		it("Call - Invalid Type", function()
		{
			settingsFile.getSignalType(aInvalidType);
			
			commonFunctionsFile.testPresent(gSpy.lastCall);
			expect(gSpy.lastCall.args).to.deep.equal([aInvalidType]);
			commonFunctionsFile.testPresent(gSpy.lastCall.returnValue);
			commonFunctionsFile.testType(gSpy.lastCall.returnValue, 'number');
			expect(gSpy.lastCall.returnValue).to.equal(1);
		});
		
		it("Call - Null", function()
		{
			settingsFile.getSignalType(null);
			
			commonFunctionsFile.testPresent(gSpy.lastCall);
			expect(gSpy.lastCall.args).to.deep.equal([null]);
			commonFunctionsFile.testPresent(gSpy.lastCall.returnValue);
			commonFunctionsFile.testType(gSpy.lastCall.returnValue, 'number');
			expect(gSpy.lastCall.returnValue).to.equal(1);
		});
		
		
	});
}

function checkParsePrefixFunction()
{
	describe("Function - Parse Prefix (parseIoPrefix)", function()
	{
		
		it("Call - Valid Prefix", function()
		{
			settingsFile.parseIoPrefix(prefixIndexObject.valid);
		
			commonFunctionsFile.testTrue(prefixSpy.calledOnce);
			expect(prefixSpy.firstCall.args).to.deep.equal([prefixIndexObject.valid]);
			commonFunctionsFile.testPresent(prefixSpy.firstCall.returnValue);
			commonFunctionsFile.testType(prefixSpy.firstCall.returnValue, 'string');
			expect(prefixSpy.firstCall.returnValue).to.equal(prefixIndexObject.code);
		});
		
		it("Call - Invalid Prefix", function()
		{
			settingsFile.parseIoPrefix(prefixIndexObject.invalid);
		
			commonFunctionsFile.testPresent(prefixSpy.lastCall);
			expect(prefixSpy.lastCall.args).to.deep.equal([prefixIndexObject.invalid]);
			commonFunctionsFile.testNull(prefixSpy.lastCall.returnValue);
		});
		
		it("Call - Invalid Type", function()
		{
			parseIoPrefixInvalidCall(-1, prefixIndexObject.eType);
		});
		
		it("Call - Null", function()
		{
			parseIoPrefixInvalidCall(null, prefixIndexObject.eNull);
		});
		
	});	
}

function checkParseIndexFunction()
{
	
	describe("Function - Parse Index (parseIoIndex)", function()
	{
		
		it("Call - Valid Prefix", function()
		{
			settingsFile.parseIoIndex(prefixIndexObject.valid);
			
			commonFunctionsFile.testTrue(indexSpy.calledOnce);
			expect(indexSpy.firstCall.args).to.deep.equal([prefixIndexObject.valid]);
			commonFunctionsFile.testPresent(indexSpy.firstCall.returnValue);
			commonFunctionsFile.testType(indexSpy.firstCall.returnValue, 'number');
			expect(indexSpy.firstCall.returnValue).to.equal(prefixIndexObject.index);
		});
		
		it("Call - Invalid Prefix", function()
		{
			settingsFile.parseIoIndex(prefixIndexObject.invalid);
			
			commonFunctionsFile.testPresent(indexSpy.lastCall);
			expect(indexSpy.lastCall.args).to.deep.equal([prefixIndexObject.invalid]);
			commonFunctionsFile.testNull(indexSpy.lastCall.returnValue);
		});
		
		it("Call - Invalid Type", function()
		{
			parseIoIndexInvalidCall(-1, prefixIndexObject.eType);
		});
		
		it("Call - Null", function()
		{
			parseIoIndexInvalidCall(null, prefixIndexObject.eNull);
		});
		
	});
}


function checkDispose()
{
	describe("Disposal", function()
	{
		it("Prefix Index Object", function()
		{
			prefixIndexObject = null;
		});
		
		it("Spy Objects", function()
		{
			gSpy.restore();
			indexSpy.restore();
			prefixSpy.restore();
		});
	});
}


function parseIoPrefixInvalidCall(invalidArg, exceptMessage)
{
	var parseReturn = null;
	var parseComplete = false;
	var parseError = "";
	
	try
	{
		parseReturn = settingsFile.parseIoPrefix(invalidArg);
		parseComplete = true;
	}
	catch(e)
	{
		parseReturn = null;
		parseComplete = false;
		parseError = e.message;
	}
	
	var parseRes = [parseComplete, parseError];
	commonFunctionsFile.testInvalidFunctionResult(parseRes, exceptMessage);
}

function parseIoIndexInvalidCall(invalidArg, exceptMessage)
{
	var parseReturn = null;
	var parseComplete = false;
	var parseError = "";
	
	try
	{
		parseReturn = settingsFile.parseIoIndex(invalidArg);
		parseComplete = true;
	}
	catch(e)
	{
		parseReturn = null;
		parseComplete = false;
		parseError = e.message;
	}
	
	var parseRes = [parseComplete, parseError];
	commonFunctionsFile.testInvalidFunctionResult(parseRes, exceptMessage);
}



function getPrefixIndexFile()
{
	var res = null;
	
	try
	{
		res = require("../sub-settings/io-set-object");
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestRemoteIoFunctions = testRemoteIoFunctions;