const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');
const testCacheFile = require("../sub-parts/test-device-cache");


function testNodeClearCacheApi()
{
	describe("Clear Test Device Cache", function()
	{
		handleClearCache();
		handleDatatabaseListCheck();
	});
}

function handleClearCache()
{
	describe("Clear Cache", function()
	{
		var clearResult = false;
		
		it("Clear Function Run", function(done)
		{
			clearResult = testCacheFile.clearTestCache();
			done();
		});
		
		it("Cache Cleared Successfully", function(done)
		{
			commonFunctionsFile.testPresent(clearResult);
			commonFunctionsFile.testType(clearResult, 'boolean');
			commonFunctionsFile.testTrue(clearResult);
			
			done();
		});
		
		
	});
}


function handleDatatabaseListCheck()
{
	describe("Check Device List Empty", function()
	{
		var dbLink = null;
		var dbError = null;
		var dbReturn = null;
		var dbRead = null;
		
		it("List Request Sent", function(done)
		{
			dbLink = apiRequestScript.callWriteApiUrl(apiPaths.devicesApi, apiPaths.rioApiSub);
			
			reqModule(dbLink, function(dCallbackError, dCallbackReturn)
			{
				dbError = dCallbackError;
				dbReturn = dCallbackReturn;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testNull(dbError);
			commonFunctionsFile.testPresent(dbReturn);
			done();
		});
		
		it("Results Read", function(done)
		{
			dbRead = apiRequestScript.callReadApiResponseArray(dbReturn);
			done();
		});
		
		it("Device List Empty", function(done)
		{
			commonFunctionsFile.testArrayEmpty(dbRead);
			done();
		});
		
		
	});
}


exports.callTestNodeClearCacheApi = testNodeClearCacheApi;