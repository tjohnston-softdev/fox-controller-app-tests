const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const requireFunctionFile = require("../sub-modules/require-node-module");
const ipStringFile = require("../sub-modules/ip-strings");
const validatorModule = requireFunctionFile.requireModuleSafe('validator');

function testValidatorDependency()
{
	describe("Validator", function()
	{
		verifyValidatorExists();
		verifyIpFunction();
	});
	
	
}

function verifyValidatorExists()
{
	describe("Library", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(validatorModule);
			commonFunctionsFile.testType(validatorModule, 'object');
		});
	});
}

function verifyIpFunction()
{
	var ipSpy = null;
	
	describe("IP Address (isIP)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(validatorModule, 'isIP');
			commonFunctionsFile.testObjectPropertyContent(validatorModule, 'isIP', 'function');
			ipSpy = sinon.spy(validatorModule, 'isIP');
		});
		
		it("Call - Valid", function()
		{
			validatorModule.isIP(ipStringFile.testString);
			
			commonFunctionsFile.testTrue(ipSpy.calledOnce);
			expect(ipSpy.firstCall.args).to.deep.equal([ipStringFile.testString]);
			expect(ipSpy.firstCall.exception).to.be.undefined;
			
			
			commonFunctionsFile.testPresent(ipSpy.firstCall.returnValue);
			commonFunctionsFile.testType(ipSpy.firstCall.returnValue, 'boolean');
			commonFunctionsFile.testTrue(ipSpy.firstCall.returnValue);
		});
		
		
		it("Call - Empty", function()
		{
			validatorModule.isIP("");
			
			commonFunctionsFile.testTrue(ipSpy.calledTwice);
			expect(ipSpy.secondCall.args).to.deep.equal([""]);
			expect(ipSpy.secondCall.exception).to.be.undefined;
			
			commonFunctionsFile.testPresent(ipSpy.secondCall.returnValue);
			commonFunctionsFile.testType(ipSpy.secondCall.returnValue, 'boolean');
			commonFunctionsFile.testFalse(ipSpy.secondCall.returnValue);
		});
		
		
		it("Call - Invalid Format", function()
		{
			validatorModule.isIP(ipStringFile.invalidString);
			
			commonFunctionsFile.testTrue(ipSpy.called);
			expect(ipSpy.lastCall.args).to.deep.equal([ipStringFile.invalidString]);
			expect(ipSpy.secondCall.exception).to.be.undefined;
			
			commonFunctionsFile.testPresent(ipSpy.lastCall.returnValue);
			commonFunctionsFile.testType(ipSpy.lastCall.returnValue, 'boolean');
			commonFunctionsFile.testFalse(ipSpy.lastCall.returnValue);
		});
		
		it("Call - Invalid Type", function()
		{
			var iRes = ipInvalidCall(-1);
			commonFunctionsFile.testInvalidFunctionResult(iRes, "Expected a string but received a number");
		});
		
		it("Call - Null", function()
		{
			var nRes = ipInvalidCall(null);
			commonFunctionsFile.testInvalidFunctionResult(nRes, "Expected a string but received a null");
		});
		
		it("Complete", function()
		{
			ipSpy.restore();
		});
	});
}

function ipInvalidCall(ipArg)
{
	var funcRes = null;
	var validationComplete = false;
	var validationMessage = "";
	
	try
	{
		funcRes = validatorModule.isIP(ipArg);
		validationComplete = true;
	}
	catch(e)
	{
		validationComplete = false;
		validationMessage = e.message;
	}
	
	var res = [validationComplete, validationMessage];
	return res;
}

exports.callTestValidatorDependency = testValidatorDependency;