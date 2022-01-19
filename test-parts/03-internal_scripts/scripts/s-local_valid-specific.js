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
			var earlyInvalidRes = localValidFile.validateTimezoneOffset(timeEarlyInvalid, false);
			expect(earlyInvalidRes).to.be.false;
		});
		
		it("Call - Late Invalid", function()
		{
			var lateInvalidRes = localValidFile.validateTimezoneOffset(timeLateInvalid, false);
			expect(lateInvalidRes).to.be.false;
		});
		
		it("Call - Invalid Prefix", function()
		{
			var invalidPrefixRes = localValidFile.validateTimezoneOffset(timeWrongPrefix, false);
			expect(invalidPrefixRes).to.be.false;
		});
		
	});
}


function handleDriveLetterFunction()
{
	var driveValidString = "C:";
	var driveInvalidString = "3:";
	
	var driveValidRes = false;
	var driveInvalidRes = false;
	
	describe("Drive Letter (validateDriveLetter)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(localValidFile.validateDriveLetter);
		});
		
		it("Call - Valid Format", function()
		{
			driveValidRes = localValidFile.validateDriveLetter(driveValidString, false);
			expect(driveValidRes).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			driveInvalidRes = localValidFile.validateDriveLetter(driveInvalidString, false);
			expect(driveInvalidRes).to.be.false;
		});
	
	});
}


function handleDrivePathFunction()
{
	var validPathString = "/dev/root";
	var invalidPathString = "C:";
	
	var validPathRes = false;
	var invalidPathRes = false;
	
	describe("Drive Path (validateDrivePath)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(localValidFile.validateDrivePath);
		});
		
		it("Call - Valid Format", function()
		{
			validPathRes = localValidFile.validateDrivePath(validPathString, false);
			expect(validPathRes).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			invalidPathRes = localValidFile.validateDrivePath(invalidPathString, false);
			expect(invalidPathRes).to.be.false;
		});
		
	});
	
}



function handleFilenameFunction()
{
	var validFileString = "example.txt";
	var invalidFileString = "fi/le.txt";
	
	var validFileRes = false;
	var invalidFileRes = false;
	
	describe("File Name (validateFilename)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(localValidFile.validateFilename);
		});
		
		it("Call - Valid Format", function()
		{
			validFileRes = localValidFile.validateFilename(validFileString, false);
			expect(validFileRes).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			invalidFileRes = localValidFile.validateFilename(invalidFileString, false);
			expect(invalidFileRes).to.be.false;
		});
		
	});
	
}



function handleRioPrefixFunction()
{
	var validPrefixString = "AO-3";
	var invalidPrefixString = "OA-5";
	var negativePrefixString = "DI--1";
	
	var validPrefixRes = false;
	var invalidPrefixRes = false;
	var negativePrefixRes = false;
	
	describe("Remote IO Prefix (validateRioPrefix)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(localValidFile.validateRioPrefix);
		});
		
		it("Call - Valid Format", function()
		{
			validPrefixRes = localValidFile.validateRioPrefix(validPrefixString, false);
			expect(validPrefixRes).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			invalidPrefixRes = localValidFile.validateRioPrefix(invalidPrefixString, false);
			expect(invalidPrefixRes).to.be.false;
		});
		
		it("Call - Negative Index", function()
		{
			negativePrefixRes = localValidFile.validateRioPrefix(negativePrefixString, false);
			expect(negativePrefixRes).to.be.false;
		});
		
	});
	
}



function handleRioTextFunction()
{
	var validString = "Analogue Output 3";
	var invalidString = "Output Analogue 5";
	var negativeString = "Digital Input -1";
	
	var validRes = false;
	var invalidRes = false;
	var negativeRes = false;
	
	describe("Remote IO Text (validateRioText)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(localValidFile.validateRioText);
		});
		
		it("Call - Valid Format", function()
		{
			validRes = localValidFile.validateRioText(validString, false);
			expect(validRes).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			invalidRes = localValidFile.validateRioText(invalidString, false);
			expect(invalidRes).to.be.false;
		});
		
		it("Call - Negative Number", function()
		{
			negativeRes = localValidFile.validateRioText(negativeString, false);
			expect(negativeRes).to.be.false;
		});
	});
	
}


module.exports = testLocalValidSpecific;