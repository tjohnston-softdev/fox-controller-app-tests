const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiRequestScript = require(commonPaths.requestApi);
const modelFunctionsFile = require(commonPaths.getModels);

const deviceCommon = require(commonPaths.deviceCommon);
const httpRequests = require(commonPaths.httpRequests);
const testCacheFile = require("../sub/test-device-cache");
const textCommon = require("../sub/common-text");

var deviceCreateUrl = getDeviceCreateUrl();
var modelArray = modelFunctionsFile.getAllModels();


function testNodeAddApis()
{
	describe("Add All Supported Devices", function()
	{
		handlePrepare();
		handleModelsLoop();
		handleModelStorage();
	});
}

function handlePrepare()
{
	describe("Add Preperation", function()
	{
		it("Supported Models Retrieved", function(done)
		{
			expect(modelArray).to.exist;
			arrayFunctions.testPopulated(modelArray);
			arrayFunctions.testAllType(modelArray, 'object');
			
			done();
		});
		
		it("Create Device URL Written", function(done)
		{
			commonFunctions.testString(deviceCreateUrl);
			done();
		});
		
		
	});
}


function handleModelsLoop()
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


function handleModelStorage()
{
	describe("Cache Supported Models", function()
	{
		it("Cache Written", function(done)
		{
			testCacheFile.storeSupportedModels(modelArray);
			done();
		});
		
		it("Local Variables Disposed", function(done)
		{
			deviceCreateUrl = null;
			modelArray = null;
			done();
		});
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
		preparedModel = commonFunctions.cloneObject(commonJsonObjectsFile.testDevice);
		
		preparedModel.maker = baseModel.maker;
		preparedModel.model = baseModel.modelType;
		preparedModel.name = textCommon.writeDeviceHeader(baseModel.maker, baseModel.modelType);
		preparedModel.desc = textCommon.writeDeviceDescription(baseModel.maker, baseModel.modelType)
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
		commonFunctions.testString(addRead.id);
		
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