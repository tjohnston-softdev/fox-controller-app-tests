const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);

function testLocalValid()
{
	describe("Local Validation - Obsolete", function()
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

module.exports = testLocalValid;