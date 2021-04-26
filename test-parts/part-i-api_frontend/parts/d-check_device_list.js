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

function testNodeCheckListApi()
{
	describe("Check Device List", function()
	{
		handleCheckPrepare();
		handleCheckDevicesLoop();
	});
}


function handleCheckPrepare()
{
	describe("Check Preperation", function()
	{
		var listTest = null;
		
		it("Device List Retrieved From Cache", function(done)
		{
			listTest = retrieveListFromCache();
			commonFunctionsFile.testPresent(listTest);
			done();
		});
		
		it("Device List Valid", function(done)
		{
			commonFunctionsFile.testArray(listTest);
			commonFunctionsFile.testAllElements(listTest, 'object');
			rioCommon.callTestDeviceArrayStructure(listTest);
			
			done();
		});
		
		it("Cache Has Devices", function(done)
		{
			var addCount = retrieveCountFromCache();
			
			commonFunctionsFile.testPresent(addCount);
			commonFunctionsFile.testType(addCount, 'number');
			commonFunctionsFile.testPositive(addCount);
			
			done();
		});
		
		
	});
}


function handleCheckDevicesLoop()
{
	var dbDeviceList = retrieveListFromCache();
	var cacheCount = retrieveCountFromCache();
	
	var cacheDeviceIndex = 0;
	var cacheDeviceElement = null;
	var cacheDeviceDescription = null;
	
	describe("Cache Devices Added", function()
	{
		for (cacheDeviceIndex = 0; cacheDeviceIndex < cacheCount; cacheDeviceIndex = cacheDeviceIndex + 1)
		{
			cacheDeviceElement = testCacheFile.getTestDevice(cacheDeviceIndex);
			cacheDeviceDescription = textCommon.callWriteDeviceCacheHeader(cacheDeviceElement);
			
			it(cacheDeviceDescription, function(done)
			{
				var cacheDeviceListed = rioCommon.callTestIdListed(dbDeviceList, cacheDeviceElement.key);
				commonFunctionsFile.testTrue(cacheDeviceListed);
				done();
			});
		}
	});
}




function retrieveListFromCache()
{
	
	var res = null;
	
	try
	{
		res = testCacheFile.retrieveList();
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

function retrieveCountFromCache()
{
	var res = null;
	
	try
	{
		res = testCacheFile.countTestDevices();
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}


exports.callTestNodeCheckListApi = testNodeCheckListApi;