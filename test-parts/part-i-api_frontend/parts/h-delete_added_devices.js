const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);
const rioCommon = require(commonPaths.rioCommonFile);
const httpRequests = require(commonPaths.httpRequestsFile);

const deviceCommon = require(commonPaths.deviceCommonFile);
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
	var deviceCount = getAddedDeviceCountFromCache();
	
	var deviceIndex = 0;
	var currentDevice = null;
	var currentDesc = "";
	
	describe("Cached Devices", function()
	{
		for (deviceIndex = 0; deviceIndex < deviceCount; deviceIndex = deviceIndex + 1)
		{
			currentDevice = testCacheFile.getTestDevice(deviceIndex);
			currentDesc = textCommon.callWriteDeviceCacheHeader(currentDevice);
			
			describe(currentDesc, function()
			{
				deleteCurrentDevice(currentDevice.key);
			});
			
		}
	});
	
}

function deleteCurrentDevice(currentID)
{
	var deleteURL = null;
	var deleteReturn = null;
	
	it("Request Made", function(done)
	{
		deleteURL = deviceCommon.callGetRudUrl(currentID);
		deleteReturn = httpRequests.defineOutput();
		httpRequests.deleteSuccessful(deleteURL, true, deleteReturn, done);
	});
	
	it("Device Successfully Deleted", function(done)
	{
		httpRequests.checkDeleteResult(deleteReturn);
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


module.exports =
{
	callTestNodeDeleteAddedDevicesApi: testNodeDeleteAddedDevicesApi
};