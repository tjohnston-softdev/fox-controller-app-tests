const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const defineFile = require(commonPaths.defineApi);

function testDefine()
{
	describe("Manufacturer Array", function()
	{
		it("Array Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(defineFile, 'definitions');
			commonFunctionsFile.testArrayPopulated(defineFile.definitions);
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
	
	for (loopIndex = 0; loopIndex < defineFile.definitions.length; loopIndex = loopIndex + 1)
	{
		currentElement = defineFile.definitions[loopIndex];
		commonFunctionsFile.testString(currentElement);
	}
}


module.exports = testDefine;