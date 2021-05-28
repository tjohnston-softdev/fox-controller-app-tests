const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommon);
const apiRequestScript = require(commonPaths.requestApi);
const modelFunctionsFile = require(commonPaths.getModels);
const modelIntegrityFile = require(commonPaths.checkModelIntegrity);
const rioCommon = require(commonPaths.rioCommon);
const deviceCommon = require(commonPaths.deviceCommon);
const httpRequests = require(commonPaths.httpRequests);
const testCacheFile = require("../sub-parts/test-device-cache");

const modelReferenceArray = modelFunctionsFile.retrieveAllSupportedModels();
var resultList = null;


function testNodeGetListApi()
{
	describe("Get Device List", function()
	{
		handleRetrieve();
		handleStore();
	});
}


function handleRetrieve()
{
	describe("Retrieve Device List From Database", function()
	{
		var retrieveUrl = null;
		var retrieveReturn = null;
		
		it("List Request Sent", function(done)
		{
			retrieveUrl = apiRequestScript.callWriteApiUrl(apiPaths.devicesApi, apiPaths.rioApiSub);
			retrieveReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(retrieveUrl, retrieveReturn, done);
		});
		
		it("List Read", function(done)
		{
			resultList = retrieveReturn.body;
			done();
		});
		
		it("Valid Return", function(done)
		{
			rioCommon.callTestDeviceListValidReturnPopulated(resultList);
			done();
		});
		
		it("Supported Models Retrieved", function(done)
		{
			commonFunctionsFile.testPresent(modelReferenceArray);
			commonFunctionsFile.testArrayPopulated(modelReferenceArray);
			commonFunctionsFile.testAllElements(modelReferenceArray, 'object');
			
			done();
		});
		
		
		it("Referental Integrity", function(done)
		{
			modelIntegrityFile.checkIntegrity(resultList, modelReferenceArray);
			done();
		});
		
		
	});
}


function handleStore()
{
	describe("Store Device List Into Cache", function()
	{
		it("Cache Written", function(done)
		{
			testCacheFile.storeList(resultList);
			done();
		});
		
		it("Local Copy Disposed", function(done)
		{
			resultList = null;
			done();
		});
		
	});
}


module.exports = testNodeGetListApi;