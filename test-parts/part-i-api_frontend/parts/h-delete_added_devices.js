const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const subCommonPath = require(commonPaths.subCommonFile);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjectFile);
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');
const rioCommon = require(subCommonPath.rioCommonFile);

const deviceCommon = require(subCommonPath.deviceCommonFile);
const testCacheFile = require("../sub-parts/test-device-cache");
const textCommon = require("../sub-parts/common-text");


function testNodeDeleteAddedDevicesApi()
{
	describe("Delete Added Devices", function()
	{
		deleteDevicesLoop();
	});
}

function deleteDevicesLoop()
{
	var addedDeviceCount = getAddedDeviceCountFromCache();
	
	var addedDeviceIndex = 0;
	var currentAddedDevice = null;
	var currentAddedDescription = "";
	
	describe("Cached Devices", function()
	{
		for (addedDeviceIndex = 0; addedDeviceIndex < addedDeviceCount; addedDeviceIndex = addedDeviceIndex + 1)
		{
			currentAddedDevice = testCacheFile.getTestDevice(addedDeviceIndex);
			currentAddedDescription = textCommon.callWriteDeviceCacheHeader(currentAddedDevice);
			
			describe(currentAddedDescription, function()
			{
				deleteCurrentDevice(currentAddedDevice.key);
			});
			
		}
	});
	
}

function deleteCurrentDevice(currentID)
{
	var deviceDeleteUrl = null;
	var deviceDeleteOptions = null;
	var deviceDeleteError = null;
	var deviceDeleteReturn = null;
	var deviceDeleteRead = null;
	
	it("Request Made", function(done)
	{
		deviceDeleteUrl = deviceCommon.callGetRudUrl(currentID);
		deviceDeleteOptions = apiRequestScript.getDeleteOptions(deviceDeleteUrl, true);
		
		reqModule.delete(deviceDeleteOptions, function(delCallbackError, delCallbackResult)
		{
			deviceDeleteError = delCallbackError;
			deviceDeleteReturn = delCallbackResult;
			done();
		});
	});
	
	it("Request Successful", function(done)
	{
		commonFunctionsFile.testNull(deviceDeleteError);
		commonFunctionsFile.testPresent(deviceDeleteReturn);
		done();
	});
	
	it("Results Read", function(done)
	{
		deviceDeleteRead = apiRequestScript.callReadApiResponseObject(deviceDeleteReturn);
		done();
	});
	
	it("Device Successfully Deleted", function(done)
	{
		deviceCommon.callTestFrontendDeleteSuccessful(deviceDeleteRead);
		done();
	});
	
}

function getAddedDeviceCountFromCache()
{
	var addRes = null;
	
	try
	{
		addRes = testCacheFile.countTestDevices();
	}
	catch(e)
	{
		addRes = null;
	}
	
	return addRes;
}

exports.callTestNodeDeleteAddedDevicesApi = testNodeDeleteAddedDevicesApi;