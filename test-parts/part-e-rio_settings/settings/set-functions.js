const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);

const subRequire = require("../sub-settings/get-rio-set");
const settingsFile = require(foxPath.rioSettingsFile);
const prefixIndexFile = require("../sub-settings/io-set-object");

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
			expect(settingsFile).to.be.an("object");
			
			commonFunctionsFile.testPresent(prefixIndexFile);
			expect(prefixIndexFile).to.be.an("object");
			
			done();
		});
		
		it("Prefix Index Object Retrieved", function(done)
		{
			prefixIndexObject = prefixIndexFile.callGetIoSetObject();
			
			commonFunctionsFile.testPresent(prefixIndexObject);
			expect(prefixIndexObject).to.be.an("object");
			
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
			
			expect(gSpy.calledOnce).to.be.true;
			expect(gSpy.firstCall.args).to.deep.equal([aValid]);
			commonFunctionsFile.testPresent(gSpy.firstCall.returnValue);
			expect(gSpy.firstCall.returnValue).to.be.a("number");
			expect(gSpy.firstCall.returnValue).to.equal(0);
		});
		
		it("Call - Invalid IO Type", function()
		{
			settingsFile.getSignalType(aInvalid);
			
			commonFunctionsFile.testPresent(gSpy.lastCall);
			expect(gSpy.lastCall.args).to.deep.equal([aInvalid]);
			commonFunctionsFile.testPresent(gSpy.lastCall.returnValue);
			expect(gSpy.lastCall.returnValue).to.be.a("number");
			expect(gSpy.lastCall.returnValue).to.equal(1);
		});
		
		it("Call - Invalid Type", function()
		{
			settingsFile.getSignalType(aInvalidType);
			
			commonFunctionsFile.testPresent(gSpy.lastCall);
			expect(gSpy.lastCall.args).to.deep.equal([aInvalidType]);
			commonFunctionsFile.testPresent(gSpy.lastCall.returnValue);
			expect(gSpy.lastCall.returnValue).to.be.a("number");
			expect(gSpy.lastCall.returnValue).to.equal(1);
		});
		
		it("Call - Null", function()
		{
			settingsFile.getSignalType(null);
			
			commonFunctionsFile.testPresent(gSpy.lastCall);
			expect(gSpy.lastCall.args).to.deep.equal([null]);
			commonFunctionsFile.testPresent(gSpy.lastCall.returnValue);
			expect(gSpy.lastCall.returnValue).to.be.a("number");
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
		
			expect(prefixSpy.calledOnce).to.be.true;
			expect(prefixSpy.firstCall.args).to.deep.equal([prefixIndexObject.valid]);
			commonFunctionsFile.testPresent(prefixSpy.firstCall.returnValue);
			expect(prefixSpy.firstCall.returnValue).to.be.a("string");
			expect(prefixSpy.firstCall.returnValue).to.equal(prefixIndexObject.code);
		});
		
		it("Call - Invalid Prefix", function()
		{
			settingsFile.parseIoPrefix(prefixIndexObject.invalid);
		
			commonFunctionsFile.testPresent(prefixSpy.lastCall);
			expect(prefixSpy.lastCall.args).to.deep.equal([prefixIndexObject.invalid]);
			expect(prefixSpy.lastCall.returnValue).to.be.null;
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
			
			expect(indexSpy.calledOnce).to.be.true;
			expect(indexSpy.firstCall.args).to.deep.equal([prefixIndexObject.valid]);
			commonFunctionsFile.testPresent(indexSpy.firstCall.returnValue);
			expect(indexSpy.firstCall.returnValue).to.be.a("number");
			expect(indexSpy.firstCall.returnValue).to.equal(prefixIndexObject.index);
		});
		
		it("Call - Invalid Prefix", function()
		{
			settingsFile.parseIoIndex(prefixIndexObject.invalid);
			
			commonFunctionsFile.testPresent(indexSpy.lastCall);
			expect(indexSpy.lastCall.args).to.deep.equal([prefixIndexObject.invalid]);
			expect(indexSpy.lastCall.returnValue).to.be.null;
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


module.exports =
{
	callTestRemoteIoFunctions: testRemoteIoFunctions
};