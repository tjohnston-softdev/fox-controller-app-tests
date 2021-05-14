const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const os = require('os');
const needle = require("needle");

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequestsFile);

const testReturnFile = require("../sub-modes/test-restart-return");
const delayLength = require("../sub-modes/offline-check-delay");

var currentPlatform = os.platform();
var factoryReturn = null;
var factoryError = null;


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
			
			needle.post(factoryResetUrl, null, {json: true}, function(aError, aResult)
			{
				factoryError = aError;
				factoryReturn = aResult;
			});
			
			done();
		});
		
	});
	
}



function handleFactoryDelay()
{
	describe("Factory Reset Delay", function()
	{
		it("Ten", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayLength)
		});
		
		it("Nine", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayLength)
		});
		
		it("Eight", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayLength)
		});
		
		it("Seven", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayLength)
		});
		
		it("Six", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayLength)
		});
		
		it("Five", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayLength)
		});
		
		it("Four", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayLength)
		});
		
		it("Three", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayLength)
		});
		
		it("Two", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayLength)
		});
		
		it("One", function(done)
		{
			setTimeout(function()
			{
				done();
			}, delayLength)
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
			commonFunctionsFile.testPresent(factoryReturn);
			expect(factoryError).to.be.null;
			done();
		});
		
		it("Results Read", function(done)
		{
			factoryResetRead = apiRequestScript.callReadApiResponseObject(factoryReturn);
			done();
		});
		
		it("Correct Return", function(done)
		{
			testReturnFile.callTestProcessReturnObject(factoryResetRead);
			done();
		});
		
		it("Reply Disposed", function(done)
		{
			factoryError = null;
			factoryReturn = null;
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
			factoryOfflineReturn = httpRequests.defineOutput();
			httpRequests.sendPing(factoryOfflineReturn, done);
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

module.exports =
{
	callTestFactoryReset: testFactoryReset
};