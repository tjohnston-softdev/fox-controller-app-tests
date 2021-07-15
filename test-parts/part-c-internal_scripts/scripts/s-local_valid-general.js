const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const localValidFile = require(commonPaths.localValid);


function testLocalValidGeneral()
{
	describe("Local Validation - General", function()
	{
		handleExampleFunction();
	});
}


function handleExampleFunction()
{
	var exampleSyntax = /^hello$/i;
	var exampleValid = "Hello";
	var exampleInvalid = "Invalid";
	
	var nullError = "Cannot read property 'length' of null";
	var syntaxError = "subjectSyntax.test is not a function";
	
	describe("Example (validateExampleTest)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(localValidFile, 'validateExampleTest');
			commonFunctionsFile.testObjectPropertyContent(localValidFile, 'validateExampleTest', 'function');
		});
		
		it("Call - Valid String", function()
		{
			callExampleValid(exampleValid, exampleSyntax, false, true);
		});
		
		it("Call - Valid Empty", function()
		{
			callExampleValid("", exampleSyntax, true, true);
		});
		
		
		it("Call - Invalid String", function()
		{
			callExampleValid(exampleInvalid, exampleSyntax, false, false);
		});
		
		it("Call - Invalid Empty", function()
		{
			callExampleValid("", exampleSyntax, false, false);
		});
		
		it("Call - Null", function()
		{
			callExampleInvalid(null, exampleSyntax, false, nullError);
			callExampleInvalid(exampleValid, null, false, "Cannot read property 'test' of null");
			callExampleInvalid(null, null, null, nullError);
		});
		
		it("Call - Empty Syntax", function()
		{
			callExampleInvalid(exampleValid, "", false, syntaxError);
		});
		
		it("Call - Invalid Type", function()
		{
			callExampleInvalid(exampleValid, -1, false, syntaxError);
		});
		
	});
}


function callExampleValid(eString, eSyntax, eEmpty, eTarget)
{
	var exampleRes = localValidFile.validateExampleTest(eString, eSyntax, eEmpty);
	
	if (eTarget === true)
	{
		expect(exampleRes).to.be.true;
	}
	else
	{
		expect(exampleRes).to.be.false;
	}
}

function callExampleInvalid(eString, eSyntax, eEmpty, eErrorText)
{
	var callComplete = false;
	var thrownError = "";
	
	try
	{
		localValidFile.validateExampleTest(eString, eSyntax, eEmpty);
		callComplete = true;
	}
	catch(e)
	{
		callComplete = false;
		thrownError = e.message;
	}
	
	var callRes = commonFunctionsFile.prepareInvalidResult(callComplete, thrownError);
	commonFunctionsFile.testInvalidFunctionResult(callRes, eErrorText);
}



module.exports = testLocalValidGeneral;