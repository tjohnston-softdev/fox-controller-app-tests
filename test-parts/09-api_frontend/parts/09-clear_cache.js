const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequests);
const testCacheFile = require("../sub/test-device-cache");


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
			commonFunctions.testPresent(clearResult);
			expect(clearResult).to.be.true;
			done();
		});
	});
}


function handleDatatabaseListCheck()
{
	describe("Check Device List Empty", function()
	{
		var listURL = null;
		var listReturn = null;
		var listRead = null;
		
		it("List Request Sent", function(done)
		{
			listURL = apiRequestScript.writeUrl(apiPaths.devicesApi, apiPaths.rioApiSub);
			listReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(listURL, listReturn, done);
		});
		
		it("Results Read", function(done)
		{
			listRead = listReturn.body;
			done();
		});
		
		it("Device List Empty", function(done)
		{
			arrayFunctions.testEmpty(listRead);
			done();
		});
		
		
	});
}


module.exports = testNodeClearCacheApi;