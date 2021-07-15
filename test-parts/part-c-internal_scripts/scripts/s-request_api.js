const chai = require("chai");
const expect = require("chai").expect;
const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);

function testRequest()
{
	describe("API Request", function()
	{
		handlePlaceholder();
	});
}


function handlePlaceholder()
{
	describe("Placeholder", function()
	{
		it("Pass", function()
		{
			commonFunctionsFile.testPlaceholder();
		});
	});
}


module.exports = testRequest;