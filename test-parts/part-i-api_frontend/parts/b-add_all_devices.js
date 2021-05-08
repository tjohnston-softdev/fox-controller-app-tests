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
	var supportedModelIndex = 0;
	var supportedModelElement = null;
	var supportedModelDesc = null;
	
	
	describe("Supported Devices", function()
	{
		while (supportedModelIndex >= 0 && supportedModelIndex < modelArray.length && modelArray !== null)
		{
			supportedModelElement = modelArray[supportedModelIndex];
			supportedModelDesc = supportedModelElement.maker + " - " + supportedModelElement.modelType;
			
			describe(supportedModelDesc, function()
			{
				addCurrentSupportedModel(supportedModelElement);
			});
			
			supportedModelIndex = supportedModelIndex + 1;
		}
	});
}


function addCurrentSupportedModel(dModel)
{
	var addObject = null;
	var addOptions = null;
	var addError = null;
	var addReturn = null;
	var addRead = null;
	var addID = null;
	
	it("Model Object Defined", function(done)
	{
		addObject = commonFunctionsFile.cloneObject(commonJsonObjectsFile.testDevice);
		
		addObject.maker = dModel.maker;
		addObject.model = dModel.modelType;
		addObject.name = textCommon.callWriteDeviceHeader(dModel.maker, dModel.modelType);
		addObject.desc = textCommon.callWriteDeviceDescription(dModel.maker, dModel.modelType)
		addObject.ipAddress = apiRequestScript.generateIpAddress();
		
		done();
	});
	
	it("Add Request Sent", function(done)
	{
		addOptions = apiRequestScript.getRequestOptions(deviceCreateUrl, 'POST', addObject);
		
		reqModule.post(addOptions, function(callbackError, callbackResult)
		{
			addError = callbackError;
			addReturn = callbackResult;
			done();
		});
	});
	
	it("Add Request Successful", function(done)
	{
		commonFunctionsFile.testPresent(addReturn);
		expect(addError).to.be.null;
		done();
	});
	
	it("Add Results Read", function(done)
	{
		addRead = apiRequestScript.callReadApiResponseObject(addReturn);
		done();
	});
	
	it("Device Added to Database Successfully", function(done)
	{
		deviceCommon.callTestFrontendAddSuccessful(addRead);
		deviceCommon.callTestFrontendAddIdValid(addRead.id);
		
		commonFunctionsFile.testPresent(addRead.id);
		commonFunctionsFile.testString(addRead.id);
		
		addID = addRead.id;
		done();
	});
	
	it("Added Device Stored Into Cache", function(done)
	{
		testCacheFile.storeTestDevice(dModel.maker, dModel.modelType, addObject.ipAddress, addID);
		done();
	});
	
}


function getDeviceCreateUrl()
{
	var res = null;
	
	try
	{
		res = apiRequestScript.callWriteApiUrl(apiPaths.devicesApi, apiPaths.rioApiSub);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestNodeAddApis = testNodeAddApis;