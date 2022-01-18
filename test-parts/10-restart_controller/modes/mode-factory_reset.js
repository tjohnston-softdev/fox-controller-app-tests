const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequests);
const sysPlatform = require(commonPaths.sysPlatform);

const testReturnFile = require("../sub/test-restart-return");
const offlineDelay = require("../sub/offline-check-delay");

var factoryOutput = {};
var dummyPlatformUsed = sysPlatform.getDummy();


function testFactoryReset()
{
	describe("Factory Reset (factory-reset)", function()
	{
		handleFactoryReset();
		handleFactoryDelay();
		handleFactoryResult();
		
		if (dummyPlatformUsed === true)
		{
			handleFactoryOfflineCheck();
		}
		else
		{
			handleFactoryPlaceholder();
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
			httpRequests.factoryReset(factoryOutput, done);
		});
		
	});
	
}



function handleFactoryDelay()
{
	describe("Factory Reset Delay", function()
	{
		it("Ten", function(done)
		{
			offlineDelay(done);
		});
		
		it("Nine", function(done)
		{
			offlineDelay(done);
		});
		
		it("Eight", function(done)
		{
			offlineDelay(done);
		});
		
		it("Seven", function(done)
		{
			offlineDelay(done);
		});
		
		it("Six", function(done)
		{
			offlineDelay(done);
		});
		
		it("Five", function(done)
		{
			offlineDelay(done);
		});
		
		it("Four", function(done)
		{
			offlineDelay(done);
		});
		
		it("Three", function(done)
		{
			offlineDelay(done);
		});
		
		it("Two", function(done)
		{
			offlineDelay(done);
		});
		
		it("One", function(done)
		{
			offlineDelay(done);
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
			httpRequests.checkFactoryReset(factoryOutput);
			done();
		});
		
		it("Results Read", function(done)
		{
			factoryResetRead = apiRequestScript.readResponseObject(factoryOutput.reply);
			done();
		});
		
		it("Correct Return", function(done)
		{
			testReturnFile.testProcessReturn(factoryResetRead);
			done();
		});
		
		it("Reply Disposed", function(done)
		{
			factoryOutput = null;
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
			httpRequests.ping(factoryOfflineReturn, done);
		});
		
		it("Controller Reset", function(done)
		{
			testReturnFile.testOfflineCheckResult(factoryOfflineReturn);
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
			commonFunctions.testPlaceholder();
			done();
		});
	});
}

module.exports = testFactoryReset;