const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');

const testReturnFile = require("../sub-modes/test-restart-return");
const delayFile = require("../sub-modes/offline-check-delay");


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
	var processRestartError = null;
	var processRestartReturn = null;
	var processRestartRead = null;
	
	
	describe("Process Restart Request", function()
	{
		
		it("Restart Request Made", function(done)
		{
			processUrl = apiRequestScript.callWriteApiUrl(apiPaths.adminApi, "restart/process");
			
			reqModule.post(processUrl, function(aError, aResult)
			{
				processRestartError = aError;
				processRestartReturn = aResult;
				done();
			});
		});
		
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testNull(processRestartError);
			commonFunctionsFile.testPresent(processRestartReturn);
			done();
		});
		
		it("Results Read", function(done)
		{
			processRestartRead = apiRequestScript.callReadApiResponseObject(processRestartReturn);
			done();
		});
		
		it("Correct Return", function(done)
		{
			testReturnFile.callTestProcessReturnObject(processRestartRead);
			done();
		});
	});
}


function handleProcessWait()
{	
	describe("Restart Delay", function()
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
		
		
	});
	
}



function handleProcessOfflineCheck()
{
	var processOfflineReturn = null;
	
	describe("Offline Check", function()
	{
		
		it("Offline Check Sent", function(done)
		{
			reqModule(apiRequestScript.hostUrl, function(chkError, chkReturn)
			{
				processOfflineReturn = chkReturn;
				done();
			});
		});
		
		it("Controller Offline", function(done)
		{
			testReturnFile.callTestOfflineCheckResult(processOfflineReturn);
			done();
		});
		
		
	});
}



exports.callTestProcessRestart = testProcessRestart;