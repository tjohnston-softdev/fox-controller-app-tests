const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommon);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequests);
const sysPlatform = require(commonPaths.sysPlatform);

const offlineDelay = require("../sub-modes/offline-check-delay");
const testReturnFile = require("../sub-modes/test-restart-return");

var dummyPlatformUsed = sysPlatform.getDummy();

function testFoxRestart()
{
	describe("FOX Restart (restart/fox)", function()
	{
		handleFoxRestart();
		
		if (dummyPlatformUsed === true)
		{
			handleFoxWait();
			handleFoxOfflineCheck();
		}
		else
		{
			handleFoxOfflinePlaceholder();
		}
		
	});
}



function handleFoxRestart()
{
	var foxRestartUrl = null;
	var foxRestartReturn = null;
	var foxRestartRead = null;
	
	
	describe("FOX Restart Request", function()
	{
		
		it("Restart Request Made", function(done)
		{
			foxRestartUrl = apiRequestScript.writeUrl(apiPaths.adminApi, "restart/fox");
			foxRestartReturn = httpRequests.defineOutput();
			httpRequests.postSuccessful(foxRestartUrl, null, foxRestartReturn, done);
		});
		
		it("Results Read", function(done)
		{
			foxRestartRead = apiRequestScript.readResponseObject(foxRestartReturn);
			done();
		});
		
		it("Correct Return", function(done)
		{
			testReturnFile.testProcessReturn(foxRestartRead);
			done();
		})
	});
	
}



function handleFoxWait()
{
	describe("Restart Delay", function()
	{
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



function handleFoxOfflineCheck()
{
	var foxOfflineReturn = null;
	
	describe("Offline Check", function()
	{
		
		it("Offline Check Sent", function(done)
		{
			foxOfflineReturn = httpRequests.defineOutput();
			httpRequests.ping(foxOfflineReturn, done);
		});
		
		it("Controller Offline", function(done)
		{
			testReturnFile.testOfflineCheckResult(foxOfflineReturn);
			done();
		});
		
	});
	
}



function handleFoxOfflinePlaceholder()
{
	describe("Reboot Request Complete", function()
	{
		it("True", function(done)
		{
			commonFunctionsFile.testPlaceholder();
			done();
		});
	});
}


module.exports = testFoxRestart;