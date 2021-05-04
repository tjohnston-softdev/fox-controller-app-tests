const chai = require("chai");
const expect = require("chai").expect;
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);

const subRequire = require("../sub-settings/get-rio-set");
const settingsFile = require(foxPath.rioSettingsFile);
const prefixIndexObject = require("../sub-settings/io-set-object");



function testRemoteIoFunctions()
{
	describe("Functions", function()
	{
		checkPrepare();
		
		checkGetSignalTypeFunction();
		checkParsePrefixFunction();
		checkParseIndexFunction();
	});
}

function checkPrepare()
{
	describe("Preperation", function()
	{
		it("Prefix Index Object Retrieved", function()
		{
			commonFunctionsFile.testPresent(prefixIndexObject);
			expect(prefixIndexObject).to.be.an("object");
		});
	});
}


function checkGetSignalTypeFunction()
{
	var argValidString = 'DI';
	var argInvalidString = 'UNKNOWN';
	var argInvalidType = -1;
	
	describe("Function - Get Signal Type (getSignalType)", function()
	{
		
		it("Call - Valid IO Type", function(done)
		{
			var validStringSpy = sinon.spy(settingsFile, 'getSignalType');
			settingsFile.getSignalType(argValidString);
			
			expect(validStringSpy.calledOnce).to.be.true;
			commonFunctionsFile.testPresent(validStringSpy.firstCall);
			expect(validStringSpy.firstCall.args).to.deep.equal([argValidString]);
			expect(validStringSpy.firstCall.returnValue).to.equal(0);
			
			validStringSpy.restore();
			done();
		});
		
		it("Call - Invalid IO Type", function(done)
		{
			var invalidStringSpy = sinon.spy(settingsFile, 'getSignalType');
			settingsFile.getSignalType(argInvalidString);
			
			expect(invalidStringSpy.calledOnce).to.be.true;
			commonFunctionsFile.testPresent(validStringSpy.firstCall);
			expect(invalidStringSpy.firstCall.args).to.deep.equal([argInvalidString]);
			expect(invalidStringSpy.firstCall.returnValue).to.equal(1);
			
			invalidStringSpy.restore();
			done();
		});
		
		it("Call - Invalid Type", function(done)
		{
			var invalidTypeSpy = sinon.spy(settingsFile, 'getSignalType');
			settingsFile.getSignalType(argInvalidType);
			
			expect(invalidTypeSpy.called).to.be.true;
			expect(invalidTypeSpy.firstCall.args).to.deep.equal([argInvalidType]);
			expect(invalidTypeSpy.firstCall.returnValue).to.equal(1);
			
			invalidTypeSpy.restore();
			done();
		});
		
		it("Call - Null", function(done)
		{
			var nullSpy = sinon.spy(settingsFile, 'getSignalType');
			settingsFile.getSignalType(null);
			
			expect(nullSpy.called).to.be.true;
			expect(nullSpy.firstCall.args).to.deep.equal([null]);
			expect(nullSpy.firstCall.returnValue).to.equal(1);
			
			nullSpy.restore();
			done();
		});
		
		
	});
}

function checkParsePrefixFunction()
{
	describe("Function - Parse Prefix (parseIoPrefix)", function()
	{
		
		it("Call - Valid Prefix", function(done)
		{
			var validPrefixSpy = sinon.spy(settingsFile, 'parseIoPrefix');
			settingsFile.parseIoPrefix(prefixIndexObject.validInput);
		
			expect(validPrefixSpy.calledOnce).to.be.true;
			commonFunctionsFile.testPresent(validPrefixSpy.firstCall);
			expect(validPrefixSpy.firstCall.args).to.deep.equal([prefixIndexObject.validInput]);
			expect(validPrefixSpy.firstCall.returnValue).to.equal(prefixIndexObject.parsedCode);
			
			validPrefixSpy.restore();
			done();
		});
		
		it("Call - Invalid Prefix", function(done)
		{
			var invalidPrefixSpy = sinon.spy(settingsFile, 'parseIoPrefix');
			settingsFile.parseIoPrefix(prefixIndexObject.invalidInput);
		
			commonFunctionsFile.testPresent(invalidPrefixSpy.firstCall);
			expect(invalidPrefixSpy.firstCall.args).to.deep.equal([prefixIndexObject.invalidInput]);
			expect(invalidPrefixSpy.firstCall.returnValue).to.be.null;
			
			invalidPrefixSpy.restore();
			done();
		});
		
		it("Call - Invalid Type", function()
		{
			parseIoPrefixInvalidCall(-1, prefixIndexObject.typeErrorText);
		});
		
		it("Call - Null", function()
		{
			parseIoPrefixInvalidCall(null, prefixIndexObject.nullErrorText);
		});
		
	});	
}

function checkParseIndexFunction()
{
	
	describe("Function - Parse Index (parseIoIndex)", function()
	{
		
		it("Call - Valid Prefix", function(done)
		{
			var validSpy = sinon.spy(settingsFile, 'parseIoIndex');
			settingsFile.parseIoIndex(prefixIndexObject.validInput);
			
			expect(validSpy.calledOnce).to.be.true;
			commonFunctionsFile.testPresent(validSpy.firstCall);
			expect(validSpy.firstCall.args).to.deep.equal([prefixIndexObject.validInput]);
			expect(validSpy.firstCall.returnValue).to.equal(prefixIndexObject.parsedIndex);
			
			validSpy.restore();
			done();
		});
		
		it("Call - Invalid Prefix", function(done)
		{
			var invalidSpy = sinon.spy(settingsFile, 'parseIoIndex');
			settingsFile.parseIoIndex(prefixIndexObject.invalidInput);
			
			commonFunctionsFile.testPresent(invalidSpy.firstCall);
			expect(invalidSpy.firstCall.args).to.deep.equal([prefixIndexObject.invalidInput]);
			expect(invalidSpy.firstCall.returnValue).to.be.null;
			
			invalidSpy.restore();
			done();
		});
		
		it("Call - Invalid Type", function()
		{
			parseIoIndexInvalidCall(-1, prefixIndexObject.typeErrorText);
		});
		
		it("Call - Null", function()
		{
			parseIoIndexInvalidCall(null, prefixIndexObject.nullErrorText);
		});
		
	});
}



function parseIoPrefixInvalidCall(invalidArg, exceptMessage)
{
	var parseComplete = false;
	var parseError = "";
	
	try
	{
		settingsFile.parseIoPrefix(invalidArg);
		parseComplete = true;
	}
	catch(e)
	{
		parseComplete = false;
		parseError = e.message;
	}
	
	var parseRes = [parseComplete, parseError];
	commonFunctionsFile.testInvalidFunctionResult(parseRes, exceptMessage);
}


function parseIoIndexInvalidCall(invalidArg, exceptMessage)
{
	var parseComplete = false;
	var parseError = "";
	
	try
	{
		settingsFile.parseIoIndex(invalidArg);
		parseComplete = true;
	}
	catch(e)
	{
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