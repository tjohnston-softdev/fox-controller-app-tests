const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const apiRequestScript = require(commonPaths.requestApi);
const modelFunctionsFile = require(commonPaths.getModels);
const modelIntegrityFile = require(commonPaths.checkModelIntegrity);
const rioCommon = require(commonPaths.rioCommon);
const deviceCommon = require(commonPaths.deviceCommon);
const httpRequests = require(commonPaths.httpRequests);
const testCacheFile = require("../sub/test-device-cache");

var modelReferenceArray = null;
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
			retrieveUrl = apiRequestScript.writeUrl(apiPaths.devicesApi, apiPaths.rioApiSub);
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
			rioCommon.testDeviceListPopulated(resultList);
			done();
		});
		
		it("Supported Models Retrieved", function(done)
		{
			modelReferenceArray = testCacheFile.getSupportedModels();
			expect(modelReferenceArray).to.exist;
			arrayFunctions.testPopulated(modelReferenceArray);
			arrayFunctions.testAllType(modelReferenceArray, 'object');
			
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
	describe("Cache Device List", function()
	{
		it("Cache Written", function(done)
		{
			testCacheFile.storeList(resultList);
			done();
		});
		
		it("Local Variables Disposed", function(done)
		{
			modelReferenceArray = null;
			resultList = null;
			done();
		});
		
	});
}


module.exports = testNodeGetListApi;