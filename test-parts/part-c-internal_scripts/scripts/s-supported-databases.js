const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const databaseFile = require(commonPaths.supportedDatabases);


function testSupportedDatabases()
{
	describe("Supported Database Definitions", function()
	{
		checkMarginNumber();
		checkDefinitionObject();
	});
}


function checkMarginNumber()
{
	describe("Folder Error Margin (folderErrorMargin)", function()
	{
		it("Property Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(databaseFile, 'folderErrorMargin');
		});
		
		it("Valid Number", function()
		{
			commonFunctionsFile.testObjectPropertyContent(databaseFile, 'folderErrorMargin', 'number');
			expect(databaseFile.folderErrorMargin).to.be.at.least(0);
		});
		
	});
}


function checkDefinitionObject()
{
	var definitionArray = null;
	
	describe("Get Supported Definition Array (getSupportedDatabases)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(databaseFile, 'getSupportedDatabases');
			commonFunctionsFile.testObjectPropertyContent(databaseFile, 'getSupportedDatabases', 'function');
		});
		
		it("Function Works", function()
		{
			definitionArray = databaseFile.getSupportedDatabases();
			commonFunctionsFile.testPresent(definitionArray);
		});
		
		it("Correct Return Structure", function()
		{
			commonFunctionsFile.testArrayPopulated(definitionArray);
			commonFunctionsFile.testAllElements(definitionArray, 'object');
		});
		
		it("Correct Properties", function()
		{
			commonFunctionsFile.testPropertyDefinitions(definitionArray, 'dbName');
			commonFunctionsFile.testPropertyDefinitions(definitionArray, 'folder');
			commonFunctionsFile.testPropertyDefinitions(definitionArray, 'cleanSize');
		});
		
		it("Correct Contents", function()
		{
			commonFunctionsFile.testPropertyContents(definitionArray, 'dbName', 'string');
			commonFunctionsFile.testPropertyContents(definitionArray, 'folder', 'boolean');
			commonFunctionsFile.testPropertyContents(definitionArray, 'cleanSize', 'number');
			
			testDefinitionNames(definitionArray);
			testDefinitionSizes(definitionArray);
		});
		
	});
}




function testDefinitionNames(dArray)
{
	var loopIndex = 0;
	var currentObject = null;
	
	for (loopIndex = 0; loopIndex < dArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = dArray[loopIndex];
		commonFunctionsFile.testString(currentObject.dbName);
	}
}

function testDefinitionSizes(dArray)
{
	var loopIndex = 0;
	var currentObject = null;
	
	for (loopIndex = 0; loopIndex < dArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = dArray[loopIndex];
		expect(currentObject.cleanSize).to.be.at.least(0);
	}
}


module.exports = testSupportedDatabases;