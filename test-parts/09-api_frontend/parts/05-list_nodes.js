const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctions = require(commonPaths.testCommon);
const apiDefinitionObject = require(commonPaths.defineApi);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequests);

const nodeCommonFile = require("../sub/common-nodes");
const testCacheFile = require("../sub/test-device-cache");



function testNodeListAvaliableApi()
{
	describe("List Available Devices (nodes/manufacturer)", function()
	{	
		listDevicesLoop();
	});
}



function listDevicesLoop()
{
	var manufacturerIndex = 0;
	var currentName = "";
	
	describe("Supported Manufacturers", function()
	{
		for (manufacturerIndex = 0; manufacturerIndex < apiDefinitionObject.length; manufacturerIndex = manufacturerIndex + 1)
		{
			currentName = apiDefinitionObject[manufacturerIndex];
			
			describe(currentName, function()
			{
				testCurrentManufacturerApi(currentName);
			});
		}
		
	});
	
}


function testCurrentManufacturerApi(mName)
{
	var searchURL = null;
	var searchReturn = null;
	var searchRead = null;
	
	it("Request Made", function(done)
	{
		searchURL = apiRequestScript.writeUrl(apiPaths.nodesApi, mName);
		searchReturn = httpRequests.defineOutput();
		httpRequests.getSuccessful(searchURL, searchReturn, done);
	});
	
	it("Results Read", function(done)
	{
		searchRead = searchReturn.body;
		done();
	});
	
	it("Correct Array Structure", function(done)
	{
		nodeCommonFile.testArrayStructure(searchRead);
		done();
	});
	
	
	it("Correct Contents", function(done)
	{
		nodeCommonFile.testArrayContents(searchRead);
		done();
	});
	
	it("Nodes Stored Into Cache", function(done)
	{
		testCacheFile.storeNodeArray(mName, searchRead);
		done();
	});
	
}

module.exports = testNodeListAvaliableApi;