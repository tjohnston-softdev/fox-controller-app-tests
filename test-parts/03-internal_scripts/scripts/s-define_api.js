const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const definitions = require(commonPaths.defineApi);

function testDefine()
{
	describe("Manufacturer Array", function()
	{
		it("Array Exists", function()
		{
			arrayFunctions.testPopulated(definitions);
		});
		
		it("Valid Contents", function()
		{
			manufacturerArrayLoop();
		});
		
	});
}


function manufacturerArrayLoop()
{
	var loopIndex = 0;
	var currentElement = null;
	
	for (loopIndex = 0; loopIndex < definitions.length; loopIndex = loopIndex + 1)
	{
		currentElement = definitions[loopIndex];
		commonFunctions.testString(currentElement);
	}
}


module.exports = testDefine;