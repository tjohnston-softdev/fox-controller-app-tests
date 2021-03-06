const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const requestFile = require(commonPaths.requestApi);
const commonRequestFunctions = require("../sub/common-request");
const requestInvalid = require("../sub/request-invalid");
const isIP = require(commonPaths.validatorIP);

function testRequestOther()
{
	describe("API Request - Other", function()
	{
		checkRandomIpAddress();
		checkDeleteOptionsObject();
	});
}


function checkRandomIpAddress()
{
	describe("Generate Random IP (generateIpAddress)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(requestFile.generateIpAddress);
		});
		
		it("Generation Successful", function()
		{
			var randIP = requestFile.generateIpAddress();
			var ipValid = false;
			commonFunctions.testString(randIP);
			ipValid = isIP(randIP, 4);
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
			commonFunctions.testFunction(requestFile.getDeleteOptions);
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