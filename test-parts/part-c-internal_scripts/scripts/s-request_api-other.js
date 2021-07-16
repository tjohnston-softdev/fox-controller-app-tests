const chai = require("chai");
const expect = require("chai").expect;
const validator = require("validator");

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const requestFile = require(commonPaths.requestApi);
const commonRequestFunctions = require("../sub-scripts/common-request");
const requestInvalid = require("../sub-scripts/request-invalid");

function testRequestOther()
{
	describe("API Request - Other", function()
	{
		checkRandomIp();
		checkDeleteOptionsObject();
	});
}


function checkRandomIp()
{
	describe("Generate Random IP (generateIpAddress)", function()
	{
		it("Function Exists", function()
		{
			objectFunctions.testPropExists(requestFile, 'generateIpAddress');
			objectFunctions.testPropType(requestFile, 'generateIpAddress', 'function');
		});
		
		it("Generation Successful", function()
		{
			var randIP = requestFile.generateIpAddress();
			var ipValid = false;
			commonFunctionsFile.testString(randIP);
			ipValid = validator.isIP(randIP, 4);
			expect(ipValid).to.be.true;
		});
		
	});
}


function checkDeleteOptionsObject()
{
	describe("Get Delete Request Options Object (getDeleteOptions)", function()
	{	
		var trueRes = null;
		var falseRes = null;
		
		it("Function Exists", function()
		{
			objectFunctions.testPropExists(requestFile, 'getDeleteOptions');
			objectFunctions.testPropType(requestFile, 'getDeleteOptions', 'function');
		});
		
		it("Call - True", function()
		{
			trueRes = requestFile.getDeleteOptions(true);
			commonRequestFunctions.validateDeleteOptions(trueRes, true);
		});
		
		it("Call - False", function()
		{
			falseRes = requestFile.getDeleteOptions(false);
			commonRequestFunctions.validateDeleteOptions(falseRes, false);
		});
		
		it("Call - Invalid", function()
		{
			requestInvalid.runOptions(null, "Invalid permanant flag. Must be True or False");
		});
		
		
		
	});
}

module.exports = testRequestOther;