const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const subCommonPath = require(commonPaths.subCommonRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiDefinitionObject = require(commonPaths.defineApi).definitions;
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');

const nodeCommonFile = require("../sub-parts/common-nodes");
const testCacheFile = require("../sub-parts/test-device-cache");

function testNodeListAvaliableApi()
{
	describe("List Avaliable Devices (nodes/manufacturer)", function()
	{	
		listDevicesLoop();
	});
}






function listDevicesLoop()
{
	var currentManufacturerIndex = 0;
	var currentManufacturerName = null;
	
	
	describe("Supported Manufacturers", function()
	{
		
		while (currentManufacturerIndex >= 0 && currentManufacturerIndex < apiDefinitionObject.length && apiDefinitionObject !== null)
		{
			currentManufacturerName = apiDefinitionObject[currentManufacturerIndex];
			
			describe(currentManufacturerName, function()
			{
				testCurrentManufacturerApi(currentManufacturerName);
			});
			
			currentManufacturerIndex = currentManufacturerIndex + 1;
		}
		
	});
	
}


function testCurrentManufacturerApi(mName)
{
	var apiRequestUrl = null;
	var apiRequestError = null;
	var apiRequestReturn = null;
	var apiRequestRead = null;
	
	it("Request Made", function(done)
	{
		apiRequestUrl = apiRequestScript.callWriteApiUrl(apiPaths.nodesApi, mName);
				
		reqModule(apiRequestUrl, function(aError, aResult)
		{
			apiRequestError = aError;
			apiRequestReturn = aResult;
			done();
		});
				
	});
	
	it("Request Successful", function(done)
	{
		commonFunctionsFile.testNull(apiRequestError);
		commonFunctionsFile.testPresent(apiRequestReturn);
		done();
	});
	
	it("Results Read", function(done)
	{
		apiRequestRead = apiRequestScript.callReadApiResponseArray(apiRequestReturn);
		done();
	});
	
	it("Correct Array Structure", function(done)
	{
		nodeCommonFile.callTestNodeObjectArrayStructure(apiRequestRead);
		done();
	});
	
	
	it("Correct Properties", function(done)
	{
		nodeCommonFile.callTestNodeObjectArrayProperties(apiRequestRead);
		done();
	});
	
	it("Correct Contents", function(done)
	{
		nodeCommonFile.callTestNodeObjectArrayContents(apiRequestRead);
		done();
	});
	
	it("Nodes Stored Into Cache", function(done)
	{
		testCacheFile.storeNodeArray(mName, apiRequestRead);
		done();
	});
	
}


exports.callTestNodeListAvaliableApi = testNodeListAvaliableApi;