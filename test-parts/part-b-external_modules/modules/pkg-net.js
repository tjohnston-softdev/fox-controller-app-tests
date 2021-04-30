const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const requireFunctionFile = require("../sub-modules/require-node-module");
const ipStringFile = require("../sub-modules/ip-strings");
const netModule = requireFunctionFile.requireModuleSafe('net');

var ipSpy = null;



function testNetDependency()
{
	describe("Net", function()
	{
		verifyNetExists();
		verifyNetIpFunction();
	});
}

function verifyNetExists()
{
	describe("Library", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(netModule);
			expect(netModule).to.be.an("object");
		});
	});
}

function verifyNetIpFunction()
{
	
	describe("IP Address (isIPv4)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(netModule, 'isIPv4');
			commonFunctionsFile.testObjectPropertyContent(netModule, 'isIPv4', 'function');
			ipSpy = sinon.spy(netModule, 'isIPv4');
		});
		
		
		it("Call - Valid", function()
		{
			netModule.isIPv4(ipStringFile.testString);
			
			expect(ipSpy.calledOnce).to.be.true;
			commonFunctionsFile.testPresent(ipSpy.firstCall);
			
			expect(ipSpy.firstCall.args).to.deep.equal([ipStringFile.testString]);
			expect(ipSpy.firstCall.exception).to.be.undefined;
			
			commonFunctionsFile.testPresent(ipSpy.firstCall.returnValue);
			expect(ipSpy.firstCall.returnValue).to.be.true;
		});
		
		it("Call - Invalid Format", function()
		{
			callInvalidIP(ipStringFile.invalidString);
		});
		
		it("Call - Invalid Type", function()
		{
			callInvalidIP(-1);
		});
		
		it("Call - Null", function()
		{
			callInvalidIP(null);
		});
		
		it("Complete", function()
		{
			ipSpy.restore();
		});
		
		
	});
}


function callInvalidIP(a)
{
	netModule.isIPv4(a);
	expect(ipSpy.called).to.be.true;
	expect(ipSpy.lastCall.args).to.deep.equal([a]);
	commonFunctionsFile.testPresent(ipSpy.lastCall.returnValue);
	expect(ipSpy.lastCall.returnValue).to.be.false;
}

exports.callTestNetDependency = testNetDependency;