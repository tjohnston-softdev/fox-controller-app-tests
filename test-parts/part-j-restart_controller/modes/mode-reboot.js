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



function testFoxRestart()
{
	describe("FOX Restart (restart/fox)", function()
	{
		handleFoxRestart();
		
		if (currentPlatform === 'linux')
		{
			handleFoxOfflinePlaceholder();
		}
		else
		{
			
			handleFoxWait();
			handleFoxOfflineCheck();
		}
		
	});
}



function handleFoxRestart()
{
	var foxRestartUrl = null;
	var foxRestartReturn = null;
	var foxRestartError = null;
	var foxRestartRead = null;
	
	
	describe("FOX Restart Request", function()
	{
		
		it("Restart Request Made", function(done)
		{
			foxRestartUrl = apiRequestScript.callWriteApiUrl(apiPaths.adminApi, "restart/fox");
			
			reqModule.post(foxRestartUrl, function(aError, aResult)
			{
				foxRestartError = aError;
				foxRestartReturn = aResult;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testNull(foxRestartError);
			commonFunctionsFile.testPresent(foxRestartReturn);
			done();
		});
		
		it("Results Read", function(done)
		{
			foxRestartRead = apiRequestScript.callReadApiResponseObject(foxRestartReturn);
			done();
		});
		
		it("Correct Return", function(done)
		{
			testReturnFile.callTestProcessReturnObject(foxRestartRead);
			done();
		})
	});
	
}



function handleFoxWait()
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



function handleFoxOfflineCheck()
{
	var foxOfflineReturn = null;
	
	describe("Offline Check", function()
	{
		
		it("Offline Check Sent", function(done)
		{
			reqModule(apiRequestScript.hostUrl, function(chkError, chkReturn)
			{
				foxOfflineReturn = chkReturn;
				done();
			});
		});
		
		it("Controller Offline", function(done)
		{
			testReturnFile.callTestOfflineCheckResult(foxOfflineReturn);
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

exports.callTestFoxRestart = testFoxRestart;