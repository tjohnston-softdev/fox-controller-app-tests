const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');
const modelFunctionsFile = require(commonPaths.getModelsFile);
const modelArray = modelFunctionsFile.retrieveAllSupportedModels();

const deviceCommon = require(commonPaths.deviceCommonFile);
const rioCommon = require(commonPaths.rioCommonFile);
var retrievedDatabaseList = null;

function testNodeDatabaseEmptyApi()
{
	describe("Check Device List Empty", function()
	{
		handleDatabaseRetrieve();
		handleDatabaseCheck();
	});
}

function handleDatabaseRetrieve()
{
	describe("Retrieve Device List From Database", function()
	{
		var listUrl = null;
		var listError = null;
		var listReturn = null;
		
		it("Request Sent", function(done)
		{
			listUrl = apiRequestScript.callWriteApiUrl(apiPaths.devicesApi, apiPaths.rioApiSub);
			
			reqModule(listUrl, function(cError, cResult)
			{
				listReturn = cResult;
				listError = cError;
				done();
			});
			
		});
		
		it("Request Successful", function(done)
		{
			expect(listError).to.be.null;
			commonFunctionsFile.testPresent(listReturn);
			done();
		});
		
		it("Results Read", function(done)
		{
			retrievedDatabaseList = apiRequestScript.callReadApiResponseArray(listReturn);
			done();
		});
		
	});
}

function handleDatabaseCheck()
{
	describe("Check Device List", function()
	{
		it("Device List Exists", function(done)
		{
			commonFunctionsFile.testPresent(retrievedDatabaseList);
			expect(retrievedDatabaseList).to.be.an("array");
			done();
		});
		
		it("Valid Array Structure", function(done)
		{
			commonFunctionsFile.testAllElements(retrievedDatabaseList, 'object');
			rioCommon.callTestDeviceArrayStructure(retrievedDatabaseList);
			done();
		});
		
		it("Device List Empty", function(done)
		{
			commonFunctionsFile.testArrayEmpty(retrievedDatabaseList);
			done();
		});
		
		it("Local Copy Disposed", function(done)
		{
			retrievedDatabaseList = null;
			done();
		});
		
		
	});
}

exports.callTestNodeDatabaseEmptyApi = testNodeDatabaseEmptyApi;
