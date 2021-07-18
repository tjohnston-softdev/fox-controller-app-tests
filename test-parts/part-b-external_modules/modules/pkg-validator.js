const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const ipStrings = require("../sub-modules/ip-strings");
const isIP = require(commonPaths.validatorIP);
const isMACAddress = require(commonPaths.validatorMAC);

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
			commonFunctions.testPresent(isIP);
			expect(isIP).to.be.a("function");
		});
		
		it("MAC Address (isMACAddress)", function()
		{
			commonFunctions.testPresent(isMACAddress);
			expect(isMACAddress).to.be.a("function");
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
			validResult = isIP(ipStrings.testString, 4);
			expect(validResult).to.be.true;
		});
		
		it("Empty", function()
		{
			emptyResult = isIP("", 4);
			expect(emptyResult).to.be.false;
		});
		
		
		it("Invalid Format", function()
		{
			invalidResult = isIP(ipStrings.invalidString, 4);
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
			validResult = isIP(validString, 6);
			expect(validResult).to.be.true;
		});
		
		it("Loopback", function()
		{
			loopbackResult = isIP(loopbackString, 6);
			expect(loopbackResult).to.be.true;
		});
		
		it("Empty", function()
		{
			emptyResult = isIP("", 6);
			expect(emptyResult).to.be.false;
		});
		
		
		it("Invalid Format", function()
		{
			invalidResult = isIP(invalidString, 6);
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
			var validResult = isMACAddress(macValid);
			expect(validResult).to.be.true;
		});
		
		it("Empty", function()
		{
			var emptyResult = isMACAddress("");
			expect(emptyResult).to.be.false;
		});
		
		
		it("Invalid Format", function()
		{
			var invalidResult = isMACAddress(macInvalid);
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
			commonFunctions.testInvalidResult(invalidTypeRes, "Expected a string but received a number");
		});
		
		it("Null", function()
		{
			var nullRes = handleInvalidCall(null);
			commonFunctions.testInvalidResult(nullRes, "Expected a string but received a null");
		});
	});
}



function handleInvalidCall(invalidArg)
{
	var validationComplete = false;
	var validationMessage = "";
	
	try
	{
		isIP(invalidArg);
		validationComplete = true;
	}
	catch(e)
	{
		validationComplete = false;
		validationMessage = e.message;
	}
	
	var res = commonFunctions.prepareInvalidResult(validationComplete, validationMessage);
	return res;
}


module.exports = testValidatorDependency;