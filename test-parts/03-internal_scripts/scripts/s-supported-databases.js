const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const objectFunctions = require(commonPaths.testObject);
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
			objectFunctions.testPropExists(databaseFile, 'folderErrorMargin');
		});
		
		it("Valid Number", function()
		{
			objectFunctions.testPropType(databaseFile, 'folderErrorMargin', 'number');
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
			objectFunctions.testPropExists(databaseFile, 'getSupportedDatabases');
			objectFunctions.testPropType(databaseFile, 'getSupportedDatabases', 'function');
		});
		
		it("Function Works", function()
		{
			definitionArray = databaseFile.getSupportedDatabases();
			commonFunctions.testPresent(definitionArray);
		});
		
		it("Correct Return Structure", function()
		{
			arrayFunctions.testPopulated(definitionArray);
			arrayFunctions.testAllType(definitionArray, 'object');
		});
		
		it("Correct Properties", function()
		{
			arrayFunctions.testAllPropExists(definitionArray, 'dbName');
			arrayFunctions.testAllPropExists(definitionArray, 'folder');
			arrayFunctions.testAllPropExists(definitionArray, 'cleanSize');
		});
		
		it("Correct Contents", function()
		{
			arrayFunctions.testAllPropType(definitionArray, 'dbName', 'string');
			arrayFunctions.testAllPropType(definitionArray, 'folder', 'boolean');
			arrayFunctions.testAllPropType(definitionArray, 'cleanSize', 'number');
			
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
		commonFunctions.testString(currentObject.dbName);
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