const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const localValidFile = require(commonPaths.localValid);

function testLocalValidSpecific()
{
	describe("Local Validation - Specific", function()
	{
		handleTimezoneOffsetFunction();
		handleDriveLetterFunction();
		handleDrivePathFunction();
		handleFilenameFunction();
		handleRioPrefixFunction();
		handleRioTextFunction();
	});
}


function handleTimezoneOffsetFunction()
{
	var timeEarlyValid = "GMT+1234";
	var timeLateValid = "GMT+2345";
	var timeEarlyInvalid = "GMT+0970";
	var timeLateInvalid = "GMT+5678";
	var timeWrongPrefix = "UTC+1234";
	
	var invalidErrTxt = "Invalid Timezone Offset string.";
	
	describe("Timezone Offset Code (validateTimezoneOffset)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(localValidFile.validateTimezoneOffset);
		});
		
		it("Call - Early Valid", function()
		{
			var earlyValidRes = localValidFile.validateTimezoneOffset(timeEarlyValid, false);
			expect(earlyValidRes).to.be.true;
		});
		
		it("Call - Late Valid", function()
		{
			var lateValidRes = localValidFile.validateTimezoneOffset(timeLateValid, false);
			expect(lateValidRes).to.be.true;
		});
		
		it("Call - Early Invalid", function()
		{
			callInvalid(localValidFile.validateTimezoneOffset, timeEarlyInvalid, invalidErrTxt);
		});
		
		it("Call - Late Invalid", function()
		{
			callInvalid(localValidFile.validateTimezoneOffset, timeLateInvalid, invalidErrTxt);
		});
		
		it("Call - Invalid Prefix", function()
		{
			callInvalid(localValidFile.validateTimezoneOffset, timeWrongPrefix, invalidErrTxt);
		});
		
	});
}


function handleDriveLetterFunction()
{
	var driveValidString = "C:";
	var driveInvalidString = "3:";
	
	describe("Drive Letter (validateDriveLetter)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(localValidFile.validateDriveLetter);
		});
		
		it("Call - Valid Format", function()
		{
			var driveValidRes = localValidFile.validateDriveLetter(driveValidString, false);
			expect(driveValidRes).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			callInvalid(localValidFile.validateDriveLetter, driveInvalidString, "Invalid Drive Letter string.");
		});
	
	});
}


function handleDrivePathFunction()
{
	var validPathString = "/dev/root";
	var invalidPathString = "C:";
	
	describe("Drive Path (validateDrivePath)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(localValidFile.validateDrivePath);
		});
		
		it("Call - Valid Format", function()
		{
			var validPathRes = localValidFile.validateDrivePath(validPathString, false);
			expect(validPathRes).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			callInvalid(localValidFile.validateDrivePath, invalidPathString, "Invalid Drive Path string.");
		});
		
	});
	
}



function handleFilenameFunction()
{
	var validFileString = "example.txt";
	var invalidFileString = "fi/le.txt";
	
	describe("File Name (validateFilename)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(localValidFile.validateFilename);
		});
		
		it("Call - Valid Format", function()
		{
			var validFileRes = localValidFile.validateFilename(validFileString, false);
			expect(validFileRes).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			callInvalid(localValidFile.validateFilename, invalidFileString, "Invalid File Name string.");
		});
		
	});
	
}



function handleRioPrefixFunction()
{
	var validPrefixString = "AO-3";
	var invalidPrefixString = "OA-5";
	var negativePrefixString = "DI--1";
	
	var invalidErrTxt = "Invalid Remote IO Prefix string.";
	
	describe("Remote IO Prefix (validateRioPrefix)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(localValidFile.validateRioPrefix);
		});
		
		it("Call - Valid Format", function()
		{
			var validPrefixRes = localValidFile.validateRioPrefix(validPrefixString, false);
			expect(validPrefixRes).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			callInvalid(localValidFile.validateRioPrefix, invalidPrefixString, invalidErrTxt);
		});
		
		it("Call - Negative Index", function()
		{
			callInvalid(localValidFile.validateRioPrefix, negativePrefixString, invalidErrTxt);
		});
		
	});
	
}



function handleRioTextFunction()
{
	var validString = "Analogue Output 3";
	var invalidString = "Output Analogue 5";
	var negativeString = "Digital Input -1";
	
	var invalidErrTxt = "Invalid Remote IO Text string.";
	
	describe("Remote IO Text (validateRioText)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(localValidFile.validateRioText);
		});
		
		it("Call - Valid Format", function()
		{
			var validRes = localValidFile.validateRioText(validString, false);
			expect(validRes).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			callInvalid(localValidFile.validateRioText, invalidString, invalidErrTxt);
		});
		
		it("Call - Negative Number", function()
		{
			callInvalid(localValidFile.validateRioText, negativeString, invalidErrTxt);
		});
	});
	
}


function callInvalid(localFunction, stringArgument, eErrorText)
{
	var callComplete = false;
	var thrownError = "";
	
	try
	{
		localFunction(stringArgument, false);
		callComplete = true;
	}
	catch(errorObject)
	{
		callComplete = false;
		thrownError = errorObject.message;
	}
	
	var callRes = commonFunctions.prepareInvalidResult(callComplete, thrownError);
	commonFunctions.testInvalidResult(callRes, eErrorText);
}


module.exports = testLocalValidSpecific;