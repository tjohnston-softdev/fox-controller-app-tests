const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const ipStrings = require("../sub-modules/ip-strings");
const validator = require("validator");

function testValidatorDependency()
{
	describe("Validator", function()
	{
		verifyFunctionsExist();
		verifyIpAddressVerFour();
		verifyIpAddressVerSix();
		verifyMacAddressFunction();
		verifyExceptions();
	});
	
	
}



function verifyFunctionsExist()
{
	describe("Functions Exist", function()
	{
		it("IP Address (isIP)", function()
		{
			objectFunctions.testPropExists(validator, 'isIP');
			objectFunctions.testPropType(validator, 'isIP', 'function');
		});
		
		it("MAC Address (isMACAddress)", function()
		{
			objectFunctions.testPropExists(validator, 'isMACAddress');
			objectFunctions.testPropType(validator, 'isMACAddress', 'function');
		});
		
	});
}


function verifyIpAddressVerFour()
{
	var validResult = false;
	var emptyResult = false;
	var invalidResult = false;
	
	describe("IP Address - Version 4", function()
	{
		
		it("Valid Format", function()
		{
			validResult = validator.isIP(ipStrings.testString, 4);
			expect(validResult).to.be.true;
		});
		
		it("Empty", function()
		{
			emptyResult = validator.isIP("", 4);
			expect(emptyResult).to.be.false;
		});
		
		
		it("Invalid Format", function()
		{
			invalidResult = validator.isIP(ipStrings.invalidString, 4);
			expect(invalidResult).to.be.false;
		});
		
	});
}



function verifyIpAddressVerSix()
{
	var validString = "1234:5678:9ABC:DEF:0000:0000:0000:0001";
	var loopbackString = "::1";
	var invalidString = "1234:5678:9101112:13141516:ABCD:EFGH:IJKL:MNOP";
	
	var validResult = false;
	var loopbackResult = false;
	var emptyResult = false;
	var invalidResult = false;
	
	describe("IP Address - Version 6", function()
	{	
		it("Valid Format", function()
		{
			validResult = validator.isIP(validString, 6);
			expect(validResult).to.be.true;
		});
		
		it("Loopback", function()
		{
			loopbackResult = validator.isIP(loopbackString, 6);
			expect(loopbackResult).to.be.true;
		});
		
		it("Empty", function()
		{
			emptyResult = validator.isIP("", 6);
			expect(emptyResult).to.be.false;
		});
		
		
		it("Invalid Format", function()
		{
			invalidResult = validator.isIP(invalidString, 6);
			expect(invalidResult).to.be.false;
		});
		
	});
}


function verifyMacAddressFunction()
{
	var macValid = "00-14-22-01-23-45";
	var macInvalid = "Invalid MAC";
	
	describe("MAC Address", function()
	{
		it("Valid Format", function()
		{
			var validResult = validator.isMACAddress(macValid);
			expect(validResult).to.be.true;
		});
		
		it("Empty", function()
		{
			var emptyResult = validator.isMACAddress("");
			expect(emptyResult).to.be.false;
		});
		
		
		it("Invalid Format", function()
		{
			var invalidResult = validator.isMACAddress(macInvalid);
			expect(invalidResult).to.be.false;
		});
		
		
	});
}



function verifyExceptions()
{
	describe("Exceptions", function()
	{
		it("Invalid Type", function()
		{
			var invalidTypeRes = handleInvalidCall(-1);
			commonFunctionsFile.testInvalidResult(invalidTypeRes, "Expected a string but received a number");
		});
		
		it("Null", function()
		{
			var nullRes = handleInvalidCall(null);
			commonFunctionsFile.testInvalidResult(nullRes, "Expected a string but received a null");
		});
	});
}



function handleInvalidCall(invalidArg)
{
	var validationComplete = false;
	var validationMessage = "";
	
	try
	{
		validator.isIP(invalidArg);
		validationComplete = true;
	}
	catch(e)
	{
		validationComplete = false;
		validationMessage = e.message;
	}
	
	var res = commonFunctionsFile.prepareInvalidResult(validationComplete, validationMessage);
	return res;
}


module.exports = testValidatorDependency;