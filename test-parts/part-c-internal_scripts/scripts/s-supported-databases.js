const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const supportedDatabaseDefinitionFile = getSupportedFile();


function testSupportedDatabases()
{
	describe("Supported Database Definitions", function()
	{
		checkSupportFileExists();
		checkMarginNumber();
		checkDefinitionObject();
	});
}

function checkSupportFileExists()
{
	describe("File", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(supportedDatabaseDefinitionFile);
			commonFunctionsFile.testType(supportedDatabaseDefinitionFile, 'object');
		});
	});
}


function checkMarginNumber()
{
	describe("Folder Error Margin (folderErrorMargin)", function()
	{
		it("Property Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(supportedDatabaseDefinitionFile, 'folderErrorMargin');
		});
		
		it("Valid Number", function()
		{
			commonFunctionsFile.testObjectPropertyContent(supportedDatabaseDefinitionFile, 'folderErrorMargin', 'number');
			commonFunctionsFile.testZeroLeast(supportedDatabaseDefinitionFile.folderErrorMargin);
		});
		
	});
}


function checkDefinitionObject()
{
	var definitionArrayObject = null;
	
	describe("Get Supported Definition Array (getSupportedDatabases)", function()
	{
		it("Function Exists", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(supportedDatabaseDefinitionFile, 'getSupportedDatabases');
			commonFunctionsFile.testObjectPropertyContent(supportedDatabaseDefinitionFile, 'getSupportedDatabases', 'function');
			done();
		});
		
		it("Function Works", function(done)
		{
			definitionArrayObject = supportedDatabaseDefinitionFile.getSupportedDatabases();
			commonFunctionsFile.testPresent(definitionArrayObject);
			done();
		});
		
		it("Correct Return Structure", function()
		{
			commonFunctionsFile.testArray(definitionArrayObject);
			commonFunctionsFile.testAllElements(definitionArrayObject, 'object');
		});
		
		it("Correct Properties", function()
		{
			commonFunctionsFile.testPropertyDefinitions(definitionArrayObject, 'dbName');
			commonFunctionsFile.testPropertyDefinitions(definitionArrayObject, 'folder');
			commonFunctionsFile.testPropertyDefinitions(definitionArrayObject, 'cleanSize');
		});
		
		it("Correct Contents", function()
		{
			commonFunctionsFile.testPropertyContents(definitionArrayObject, 'dbName', 'string');
			commonFunctionsFile.testPropertyContents(definitionArrayObject, 'folder', 'boolean');
			commonFunctionsFile.testPropertyContents(definitionArrayObject, 'cleanSize', 'number');
			
			testDefinitionNames(definitionArrayObject);
			testDefinitionSizes(definitionArrayObject);
		});
		
	});
}




function testDefinitionNames(dArray)
{
	var tIndex = 0;
	var tElement = null;
	
	for (tIndex = 0; tIndex < dArray.length; tIndex = tIndex + 1)
	{
		tElement = dArray[tIndex];
		commonFunctionsFile.testString(tElement.dbName);
	}
}

function testDefinitionSizes(dArray)
{
	var tIndex = 0;
	var tElement = null;
	
	for (tIndex = 0; tIndex < dArray.length; tIndex = tIndex + 1)
	{
		tElement = dArray[tIndex];
		commonFunctionsFile.testZeroLeast(tElement.cleanSize);
	}
}



function getSupportedFile()
{
	var fileRes = null;
	
	try
	{
		fileRes = require(commonPaths.supportedDatabasesPath);
	}
	catch(e)
	{
		fileRes = null;
	}
	
	return fileRes;
}

exports.callTestSupportedDatabases = testSupportedDatabases;