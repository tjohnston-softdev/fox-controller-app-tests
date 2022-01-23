const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
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
	
	var syntaxError = "regObj.test is not a function";
	
	describe("Example (validateExampleTest)", function()
	{
		it("Function Exists", function()
		{
			commonFunctions.testFunction(localValidFile.validateExampleTest);
		});
		
		it("Call - Valid String", function()
		{
			callExampleValid(exampleValid, exampleSyntax, false);
		});
		
		it("Call - Valid Empty", function()
		{
			callExampleValid("", exampleSyntax, true);
		});
		
		
		it("Call - Invalid String", function()
		{
			callExampleInvalid(exampleInvalid, exampleSyntax, false, "Invalid Example string.");
		});
		
		it("Call - Invalid Empty", function()
		{
			callExampleInvalid("", exampleSyntax, false, "Example string cannot be empty.");
		});
		
		it("Call - Null", function()
		{
			callExampleInvalid(null, exampleSyntax, false, "Input must be a valid string.");
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


function callExampleValid(eString, eSyntax, eEmpty)
{
	var exampleRes = localValidFile.validateExampleTest(eString, eSyntax, eEmpty);
	expect(exampleRes).to.be.true;
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
	catch(errorObject)
	{
		callComplete = false;
		thrownError = errorObject.message;
	}
	
	var callRes = commonFunctions.prepareInvalidResult(callComplete, thrownError);
	commonFunctions.testInvalidResult(callRes, eErrorText);
}



module.exports = testLocalValidGeneral;