const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = getCommonFunctionFile();
const listFile = getListFile();

var commonFunctionsList = null;

function testCommonFunctions()
{
	describe("Testing Functions", function()
	{
		verifyTestCommonFileExists();
		verifyListFileExists();
		verifyTestCommonDefinitionsExist();
		verifyTestCommonDefinitionsValid();
		verifyFunctionsValid();
	});
}

function verifyTestCommonFileExists()
{
	it("Function File Exists (test-common)", function()
	{
		expect(commonFunctionsFile).to.not.be.undefined;
		expect(commonFunctionsFile).to.not.be.null;
		expect(commonFunctionsFile).to.be.an('object');
	});
}

function verifyListFileExists()
{
	it("List File Exists", function()
	{
		expect(listFile).to.not.be.undefined;
		expect(listFile).to.not.be.null;
		expect(listFile).to.be.an('object');
	});
}

function verifyTestCommonDefinitionsExist()
{	
	it("Name definitions exist", function()
	{
		commonFunctionsList = listFile.getCommonFunctionsList();
		expect(commonFunctionsList).to.not.be.undefined;
		expect(commonFunctionsList).to.not.be.null;
		expect(commonFunctionsList).to.be.an('array').that.is.not.empty;
	});
}


function verifyTestCommonDefinitionsValid()
{
	it("Name definitions valid", function()
	{
		var dInd = 0;
		var dVal = null;
		
		while (dInd >= 0 && dInd < commonFunctionsList.length && commonFunctionsList !== null)
		{
			dVal = null;
			
			expect(commonFunctionsList[dInd]).to.not.be.undefined;
			expect(commonFunctionsList[dInd]).to.not.be.null;
			dVal = commonFunctionsList[dInd];
			
			expect(dVal).to.not.be.null;
			expect(dVal).to.be.a('string');
			expect(dVal.length).to.be.at.least(1);
			
			dInd = dInd + 1;
		}
	});
}

function verifyFunctionsValid()
{
	it("Test functions valid", function()
	{
		var dInd = 0;
		var dName = "";
		var dQuote = "";
		var exportType = "";
		var exportExists = false;
		var canContinue = true;
		
		while (dInd >= 0 && dInd < commonFunctionsList.length && canContinue === true)
		{
			dName = commonFunctionsList[dInd];
			dQuote = "'" + dName + "'";
			exportType = typeof commonFunctionsFile[dName];
			exportExists = false;
			
			if (commonFunctionsFile[dName] !== null && exportType !== 'undefined' && exportType === 'function')
			{
				exportExists = true;
			}
			else if (commonFunctionsFile[dName] !== null && exportType !== 'undefined')
			{
				exportExists = false;
				throw new Error(dQuote + " is not a function");
			}
			else
			{
				exportExists = false;
				throw new Error(dQuote + " does not exist");
			}
			
			if (exportExists !== true)
			{
				canContinue = false;
			}
			
			dInd = dInd + 1;
		}
		
		commonFunctionsList = null;
		expect(canContinue).to.be.true;
	});
}


function getCommonFunctionFile()
{
	var funcFile = null;
	
	try
	{
		funcFile = require(commonPaths.testCommonFull);
	}
	catch(e)
	{
		funcFile = null;
	}
	
	return funcFile;
}

function getListFile()
{
	var f = null;
	
	try
	{
		f = require("../sub-items/test-common-functions");
	}
	catch(e)
	{
		f = null;
	}
	
	return f;
}

exports.callTestCommonFunctions = testCommonFunctions;