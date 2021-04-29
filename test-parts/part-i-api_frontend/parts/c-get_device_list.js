const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const subCommonPath = require(commonPaths.subCommonRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');
const modelFunctionsFile = require(subCommonPath.getModelsFile);
const modelIntegrityFile = require(subCommonPath.checkModelIntegrityFile);
const rioCommon = require(subCommonPath.rioCommonFile);

const deviceCommon = require(subCommonPath.deviceCommonFile);
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
		var retrieveError = null;
		var retrieveReturn = null;
		
		it("List Request Sent", function(done)
		{
			retrieveUrl = apiRequestScript.callWriteApiUrl(apiPaths.devicesApi, apiPaths.rioApiSub);
			
			reqModule(retrieveUrl, function(callbackError, callbackResult)
			{
				retrieveReturn = callbackResult;
				retrieveError = callbackError;
				done();
			});
			
		});
		
		it("List Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(retrieveReturn);
			commonFunctionsFile.testNull(retrieveError);
			done();
		});
		
		it("List Read", function(done)
		{
			resultList = apiRequestScript.callReadApiResponseArray(retrieveReturn);
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
			commonFunctionsFile.testArray(modelReferenceArray);
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


exports.callTestNodeGetListApi = testNodeGetListApi;