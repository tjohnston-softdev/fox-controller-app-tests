const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');
const osModule = require('os');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');

const testReturnFile = require("../sub-modes/test-restart-return");
const delayFile = require("../sub-modes/offline-check-delay");

var currentPlatform = osModule.platform();
var factoryResetRequestReturn = null;
var factoryResetRequestError = null;


function testFactoryReset()
{
	describe("Factory Reset (factory-reset)", function()
	{
		handleFactoryReset();
		handleFactoryDelay();
		handleFactoryResult();
		
		if (currentPlatform === 'linux')
		{
			handleFactoryPlaceholder();
		}
		else
		{
			handleFactoryOfflineCheck();
		}
		
	});
}


function handleFactoryReset()
{
	var factoryResetUrl = null;
	
	describe("Factory Reset Request", function()
	{
		it("Request Made", function(done)
		{
			factoryResetUrl = apiRequestScript.callWriteApiUrl(apiPaths.adminApi, "factory-reset");
			
			reqModule.post(factoryResetUrl, function(aError, aResult)
			{
				factoryResetRequestError = aError;
				factoryResetRequestReturn = aResult;
			});
			
			done();
		});
		
	});
	
}



function handleFactoryDelay()
{
	describe("Factory Reset Delay", function()
	{
		it("First", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayFile.delayValue)
		});
		
		it("Second", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayFile.delayValue)
		});
		
		it("Third", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayFile.delayValue)
		});
		
		it("Fourth", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayFile.delayValue)
		});
		
		it("Fifth", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayFile.delayValue)
		});
		
		it("Sixth", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayFile.delayValue)
		});
		
		it("Seventh", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayFile.delayValue)
		});
		
		it("Eighth", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayFile.delayValue)
		});
		
		it("Ninth", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayFile.delayValue)
		});
		
		it("Tenth", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayFile.delayValue)
		});
		
	});
}


function handleFactoryResult()
{
	describe("Factory Reset Result", function()
	{
		var factoryResetRead = null;
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(factoryResetRequestReturn);
			expect(factoryResetRequestError).to.be.null;
			done();
		});
		
		it("Results Read", function(done)
		{
			factoryResetRead = apiRequestScript.callReadApiResponseObject(factoryResetRequestReturn);
			done();
		});
		
		it("Correct Return", function(done)
		{
			testReturnFile.callTestProcessReturnObject(factoryResetRead);
			done();
		});
		
		it("Reply Disposed", function(done)
		{
			factoryResetRequestError = null;
			factoryResetRequestReturn = null;
			done();
		});
		
		
	});
}



function handleFactoryOfflineCheck()
{
	describe("Offline Check", function()
	{
		var factoryOfflineReturn = null;
		
		it("Offline Check Sent", function(done)
		{
			reqModule(apiRequestScript.hostUrl, function(chkError, chkReturn)
			{
				factoryOfflineReturn = chkReturn;
				done();
			});
		});
		
		it("Controller Reset", function(done)
		{
			testReturnFile.callTestOfflineCheckResult(factoryOfflineReturn);
			done();
		});
		
	});
}


function handleFactoryPlaceholder()
{
	describe("Factory Reset Initiated", function()
	{
		it("True", function(done)
		{
			commonFunctionsFile.testPlaceholder();
			done();
		});
	});
}

exports.callTestFactoryReset = testFactoryReset;