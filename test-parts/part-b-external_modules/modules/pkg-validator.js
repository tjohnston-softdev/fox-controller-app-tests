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
		verifyIpAddressVerFour();
		verifyIpAddressVerSix();
		verifyIpAddressInvalid();
		verifyMacAddressFunction();
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
		});
		
	});
}


function verifyIpAddressVerFour()
{
	var ipSpy = null;
	
	describe("IP Address - Version 4", function()
	{
		it("Spy Established", function(done)
		{
			ipSpy = sinon.spy(validatorModule, 'isIP');
			done();
		});
		
		it("Call - Valid", function()
		{
			validatorModule.isIP(ipStringFile.testString, 4);
			
			expect(ipSpy.calledOnce).to.be.true;
			expect(ipSpy.firstCall.args).to.deep.equal([ipStringFile.testString, 4]);
			expect(ipSpy.firstCall.exception).to.be.undefined;
			
			
			commonFunctionsFile.testPresent(ipSpy.firstCall.returnValue);
			commonFunctionsFile.testType(ipSpy.firstCall.returnValue, 'boolean');
			expect(ipSpy.firstCall.returnValue).to.be.true;
		});
		
		it("Call - Empty", function()
		{
			validatorModule.isIP("", 4);
			
			expect(ipSpy.calledTwice).to.be.true;
			expect(ipSpy.secondCall.args).to.deep.equal(["", 4]);
			expect(ipSpy.secondCall.exception).to.be.undefined;
			
			commonFunctionsFile.testPresent(ipSpy.secondCall.returnValue);
			commonFunctionsFile.testType(ipSpy.secondCall.returnValue, 'boolean');
			expect(ipSpy.secondCall.returnValue).to.be.false;
		});
		
		
		it("Call - Invalid Format", function()
		{
			validatorModule.isIP(ipStringFile.invalidString, 4);
			
			expect(ipSpy.called).to.be.true;
			expect(ipSpy.lastCall.args).to.deep.equal([ipStringFile.invalidString, 4]);
			expect(ipSpy.secondCall.exception).to.be.undefined;
			
			commonFunctionsFile.testPresent(ipSpy.lastCall.returnValue);
			commonFunctionsFile.testType(ipSpy.lastCall.returnValue, 'boolean');
			expect(ipSpy.lastCall.returnValue).to.be.false;
		});
		
		it("Complete", function()
		{
			ipSpy.restore();
		});
		
	});
}



function verifyIpAddressVerSix()
{
	var sixValid = "1234:5678:9ABC:DEF:0000:0000:0000:0001";
	var sixLoop = "::1";
	var sixInvalid = "1234:5678:9101112:13141516:ABCD:EFGH:IJKL:MNOP";
	var ipSpy = null;
	
	describe("IP Address - Version 6", function()
	{
		it("Spy Established", function(done)
		{
			ipSpy = sinon.spy(validatorModule, 'isIP');
			done();
		});
		
		it("Call - Valid", function()
		{
			validatorModule.isIP(sixValid, 6);
			
			expect(ipSpy.calledOnce).to.be.true;
			expect(ipSpy.firstCall.args).to.deep.equal([sixValid, 6]);
			expect(ipSpy.firstCall.exception).to.be.undefined;
			
			commonFunctionsFile.testPresent(ipSpy.firstCall.returnValue);
			commonFunctionsFile.testType(ipSpy.firstCall.returnValue, 'boolean');
			expect(ipSpy.firstCall.returnValue).to.be.true;
			
		});
		
		it("Call - Loopback", function()
		{
			validatorModule.isIP(sixLoop, 6);
			
			expect(ipSpy.calledTwice).to.be.true;
			expect(ipSpy.secondCall.args).to.deep.equal([sixLoop, 6]);
			expect(ipSpy.secondCall.exception).to.be.undefined;
			
			commonFunctionsFile.testPresent(ipSpy.secondCall.returnValue);
			commonFunctionsFile.testType(ipSpy.secondCall.returnValue, 'boolean');
			expect(ipSpy.secondCall.returnValue).to.be.true;
		});
		
		it("Call - Invalid", function()
		{
			validatorModule.isIP(sixInvalid, 6);
			
			expect(ipSpy.called).to.be.true;
			expect(ipSpy.lastCall.args).to.deep.equal([sixInvalid, 6]);
			expect(ipSpy.lastCall.exception).to.be.undefined;
			
			commonFunctionsFile.testPresent(ipSpy.lastCall.returnValue);
			commonFunctionsFile.testType(ipSpy.lastCall.returnValue, 'boolean');
			expect(ipSpy.lastCall.returnValue).to.be.false;
		});
		
		it("Complete", function()
		{
			ipSpy.restore();
		});
		
	});
}


function verifyIpAddressInvalid()
{
	describe("IP Address - Invalid", function()
	{
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
	});
}


function verifyMacAddressFunction()
{
	var macValid = "00-14-22-01-23-45";
	var macInvalid = "Invalid MAC";
	
	describe("MAC Address (isMACAddress)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(validatorModule, 'isMACAddress');
			commonFunctionsFile.testObjectPropertyContent(validatorModule, 'isMACAddress', 'function');
		});
		
		it("Call - Valid Format", function()
		{
			var validResult = validatorModule.isMACAddress(macValid);
			expect(validResult).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			var invalidResult = validatorModule.isMACAddress(macInvalid);
			expect(invalidResult).to.be.false;
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