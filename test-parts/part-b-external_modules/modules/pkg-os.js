const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const requireFunctionFile = require("../sub-modules/require-node-module");
const osStringFile = require("../sub-modules/os-strings");
const osModule = requireFunctionFile.requireModuleSafe('os');

function testOsDependency()
{
	describe("Operating System", function()
	{
		verifyOsExists();
		verifyPlatformFunction();
	});
}


function verifyOsExists()
{
	describe("Library", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(osModule);
			commonFunctionsFile.testType(osModule, 'object');
		});
	});
}

function verifyPlatformFunction()
{
	var platformSpy = null;
	
	
	describe("Platform (platform)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(osModule, 'platform');
			commonFunctionsFile.testObjectPropertyContent(osModule, 'platform', 'function');
			platformSpy = sinon.spy(osModule, 'platform');
		});
		
		it("Function Works", function()
		{
			osModule.platform();
			
			commonFunctionsFile.testTrue(platformSpy.calledOnce);
			commonFunctionsFile.testPresent(platformSpy.firstCall);
			
			expect(platformSpy.firstCall.args).to.deep.equal([]);
			expect(platformSpy.firstCall.exception).to.be.undefined;
			
			commonFunctionsFile.testPresent(platformSpy.firstCall.returnValue);
			commonFunctionsFile.testString(platformSpy.firstCall.returnValue);
		});
		
		it("Supported Operating System", function()
		{
			var supportFlag = osStringFile.checkOsSupported(platformSpy.firstCall.returnValue);
			
			commonFunctionsFile.testPresent(supportFlag);
			commonFunctionsFile.testType(supportFlag, 'boolean');
			commonFunctionsFile.testTrue(supportFlag);
		});
		
		it("Complete", function()
		{
			platformSpy.restore();
		});
		
		
		
	});
	
}

exports.callTestOsDependency = testOsDependency;