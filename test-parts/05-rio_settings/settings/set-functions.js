const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
const loadFoxFile = require(commonPaths.loadFox);
const prefixIndexObject = require("../sub/io-set-object");
const settingsFile = loadFoxFile(foxPath.rioSettingsFile);


function testRemoteIoFunctions()
{
	describe("Functions", function()
	{
		checkGetSignalTypeFunction();
		checkParsePrefixFunction();
		checkParseIndexFunction();
	});
}


function checkGetSignalTypeFunction()
{
	describe("Function - Get Signal Type (getSignalType)", function()
	{
		it("Exists", function()
		{
			commonFunctions.testFunction(settingsFile.getSignalType);
		});
		
		it("Call - Valid IO Type", function()
		{
			var validStringRes = settingsFile.getSignalType("DI");
			expect(validStringRes).to.equal(0);
		});
		
		it("Call - Invalid IO Type", function()
		{
			var invalidStringRes = settingsFile.getSignalType("UNKNOWN");
			expect(invalidStringRes).to.equal(1);
		});
		
		it("Call - Invalid Type", function()
		{
			var invalidTypeRes = settingsFile.getSignalType(-1);
			expect(invalidTypeRes).to.equal(1);
		});
		
		it("Call - Null", function()
		{
			var nullRes = settingsFile.getSignalType(null);
			expect(nullRes).to.equal(1);
		});
		
		
	});
}


function checkParsePrefixFunction()
{
	describe("Function - Parse Prefix (parseIoPrefix)", function()
	{
		it("Exists", function()
		{
			commonFunctions.testFunction(settingsFile.parseIoPrefix);
		});
		
		it("Call - Valid Prefix", function()
		{
			var validRes = settingsFile.parseIoPrefix(prefixIndexObject.validInput);
			expect(validRes).to.equal(prefixIndexObject.parsedCode);
		});
		
		it("Call - Invalid Prefix", function()
		{
			var invalidRes = settingsFile.parseIoPrefix(prefixIndexObject.invalidInput);
			expect(invalidRes).to.be.null;
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
		it("Exists", function()
		{
			commonFunctions.testFunction(settingsFile.parseIoIndex);
		});
		
		it("Call - Valid Prefix", function()
		{
			var validRes = settingsFile.parseIoIndex(prefixIndexObject.validInput);
			expect(validRes).to.equal(prefixIndexObject.parsedIndex);
		});
		
		it("Call - Invalid Prefix", function()
		{
			var invalidRes = settingsFile.parseIoIndex(prefixIndexObject.invalidInput);
			expect(invalidRes).to.be.null;
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
	catch(errorObj)
	{
		parseComplete = false;
		parseError = errorObj.message;
	}
	
	var parseRes = commonFunctions.prepareInvalidResult(parseComplete, parseError);
	commonFunctions.testInvalidResult(parseRes, exceptMessage);
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
	catch(errorObj)
	{
		parseComplete = false;
		parseError = errorObj.message;
	}
	
	var parseRes = commonFunctions.prepareInvalidResult(parseComplete, parseError);
	commonFunctions.testInvalidResult(parseRes, exceptMessage);
}


module.exports = testRemoteIoFunctions;