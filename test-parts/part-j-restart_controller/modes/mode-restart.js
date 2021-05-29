const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommon);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequests);
const offlineDelay = require("../sub-modes/offline-check-delay");
const testReturnFile = require("../sub-modes/test-restart-return");


function testProcessRestart()
{
	describe("Process Restart (restart/process)", function()
	{
		handleProcessRestart();
		handleProcessWait();
		handleProcessOfflineCheck();
	});
}



function handleProcessRestart()
{
	var processUrl = null;
	var processReturn = null;
	var processRead = null;
	
	
	describe("Process Restart Request", function()
	{
		it("Restart Request Made", function(done)
		{
			processUrl = apiRequestScript.writeUrl(apiPaths.adminApi, "restart/process");
			processReturn = httpRequests.defineOutput();
			httpRequests.postSuccessful(processUrl, null, processReturn, done);
		});
		
		
		it("Results Read", function(done)
		{
			processRead = apiRequestScript.readResponseObject(processReturn);
			done();
		});
		
		it("Correct Return", function(done)
		{
			testReturnFile.testProcessReturn(processRead);
			done();
		});
	});
}


function handleProcessWait()
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



function handleProcessOfflineCheck()
{
	var pingReturn = null;
	
	describe("Offline Check", function()
	{
		
		it("Offline Check Sent", function(done)
		{
			pingReturn = httpRequests.defineOutput();
			httpRequests.ping(pingReturn, done);
		});
		
		
		it("Controller Offline", function(done)
		{
			testReturnFile.testOfflineCheckResult(pingReturn);
			done();
		});
	});
}

module.exports = testProcessRestart;