const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const databaseFile = require(commonPaths.supportedDatabases);

chai.use(chaiThings);

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
			expect(databaseFile.folderErrorMargin).to.exist;
		});
		
		it("Valid Number", function()
		{
			commonFunctions.testNumber(databaseFile.folderErrorMargin);
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
			commonFunctions.testFunction(databaseFile.getSupportedDatabases);
		});
		
		it("Function Works", function()
		{
			definitionArray = databaseFile.getSupportedDatabases();
		});
		
		it("Correct Return Structure", function()
		{
			arrayFunctions.testPopulated(definitionArray);
			arrayFunctions.testAllType(definitionArray, 'object');
		});
		
		it("Correct Properties", function()
		{
			expect(definitionArray).to.all.have.keys("dbName", "folder", "cleanSize");
		});
		
		it("Correct Contents", function()
		{
			testDefinitionContents(definitionArray);
		});
		
	});
}



function testDefinitionContents(defArray)
{
	var loopIndex = 0;
	var currentObject = null;
	
	for (loopIndex = 0; loopIndex < defArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = defArray[loopIndex];
		
		commonFunctions.testString(currentObject.dbName);
		commonFunctions.testBoolean(currentObject.folder);
		commonFunctions.testNumber(currentObject.cleanSize);
		expect(currentObject.cleanSize).to.be.at.least(0);
	}
}


module.exports = testSupportedDatabases;