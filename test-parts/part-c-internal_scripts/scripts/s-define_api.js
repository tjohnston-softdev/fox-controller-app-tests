const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const defineFile = getDefinitionFile();

function testDefine()
{
	describe("Device API Definitions", function()
	{
		fileTest();
		arrayTest();
	});
}


function fileTest()
{
	describe("Definitions File", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(defineFile);
			commonFunctionsFile.testType(defineFile, 'object');
		});
		
	});
}


function arrayTest()
{
	describe("Manufacturer Array", function()
	{
		it("Property Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(defineFile, 'definitions');
		});
		
		it("Array Type", function()
		{
			commonFunctionsFile.testArray(defineFile.definitions);
		});
		
		it("Valid Contents", function()
		{
			commonFunctionsFile.testAllElements(defineFile.definitions, 'string');
			manufacturerArrayLoop();
		});
		
		
	});
}


function manufacturerArrayLoop()
{
	var mIndex = 0;
	var mString = null;
	
	for (mIndex = 0; mIndex < defineFile.definitions.length; mIndex = mIndex + 1)
	{
		mString = defineFile.definitions[mIndex];
		commonFunctionsFile.testString(mString);
	}
}



function getDefinitionFile()
{
	var dRes = null;
	
	try
	{
		dRes = require(commonPaths.defineApi);
	}
	catch(e)
	{
		console.log(e.message);
		dRes = null;
	}
	
	return dRes;
}

exports.callTestDefine = testDefine;