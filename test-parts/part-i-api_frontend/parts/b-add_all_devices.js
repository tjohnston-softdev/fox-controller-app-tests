const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommon);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiRequestScript = require(commonPaths.requestApi);
const modelFunctionsFile = require(commonPaths.getModels);
const modelArray = modelFunctionsFile.getAllModels();

const deviceCommon = require(commonPaths.deviceCommon);
const httpRequests = require(commonPaths.httpRequests);
const testCacheFile = require("../sub-parts/test-device-cache");
const textCommon = require("../sub-parts/common-text");

const deviceCreateUrl = getDeviceCreateUrl();


function testNodeAddApis()
{
	describe("Add All Supported Devices", function()
	{
		addPrepare();
		addModelsLoop();
	});
}

function addPrepare()
{
	describe("Add Preperation", function()
	{
		it("Supported Models Retrieved", function(done)
		{
			commonFunctionsFile.testPresent(modelArray);
			commonFunctionsFile.testArrayPopulated(modelArray);
			commonFunctionsFile.testAllElements(modelArray, 'object');
			
			done();
		});
		
		it("Create Device URL Written", function(done)
		{
			commonFunctionsFile.testPresent(deviceCreateUrl);
			commonFunctionsFile.testString(deviceCreateUrl);
			done();
		});
		
		
	});
}


function addModelsLoop()
{
	var modelIndex = 0;
	var currentModel = {};
	var currentDesc = "";
	
	
	describe("Supported Devices", function()
	{
		for (modelIndex = 0; modelIndex < modelArray.length; modelIndex = modelIndex + 1)
		{
			currentModel = modelArray[modelIndex];
			currentDesc = currentModel.maker + " - " + currentModel.modelType;
			
			describe(currentDesc, function()
			{
				addCurrentSupportedModel(currentModel);
			});
		}
	});
}


function addCurrentSupportedModel(baseModel)
{
	var preparedModel = null;
	var addReturn = null;
	var addRead = null;
	var newObjectID = null;
	
	it("Model Object Defined", function(done)
	{
		preparedModel = commonFunctionsFile.cloneObject(commonJsonObjectsFile.testDevice);
		
		preparedModel.maker = baseModel.maker;
		preparedModel.model = baseModel.modelType;
		preparedModel.name = textCommon.callWriteDeviceHeader(baseModel.maker, baseModel.modelType);
		preparedModel.desc = textCommon.callWriteDeviceDescription(baseModel.maker, baseModel.modelType)
		preparedModel.ipAddress = apiRequestScript.generateIpAddress();
		
		done();
	});
	
	it("Add Request Sent", function(done)
	{
		addReturn = httpRequests.defineOutput();
		httpRequests.postSuccessful(deviceCreateUrl, preparedModel, addReturn, done);
	});
	
	it("Add Results Read", function(done)
	{
		addRead = apiRequestScript.readResponseObject(addReturn);
		done();
	});
	
	it("Device Added to Database Successfully", function(done)
	{
		deviceCommon.testFrontendAdded(addRead);
		deviceCommon.testFrontendIdValid(addRead.id);
		
		commonFunctionsFile.testPresent(addRead.id);
		commonFunctionsFile.testString(addRead.id);
		
		newObjectID = addRead.id;
		done();
	});
	
	it("Added Device Stored Into Cache", function(done)
	{
		testCacheFile.storeTestDevice(baseModel.maker, baseModel.modelType, preparedModel.ipAddress, newObjectID);
		done();
	});
	
}


function getDeviceCreateUrl()
{
	var res = null;
	
	try
	{
		res = apiRequestScript.writeUrl(apiPaths.devicesApi, apiPaths.rioApiSub);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

module.exports = testNodeAddApis;