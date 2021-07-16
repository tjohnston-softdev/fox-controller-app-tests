const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommon);
const rioCommon = require(commonPaths.rioCommon);

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
			commonFunctionsFile.testArrayPopulated(listTest);
			commonFunctionsFile.testAllElements(listTest, 'object');
			rioCommon.testDeviceArray(listTest);
			
			done();
		});
		
		it("Cache Has Devices", function(done)
		{
			var addCount = retrieveCountFromCache();
			
			commonFunctionsFile.testPresent(addCount);
			expect(addCount).to.be.a("number");
			expect(addCount).to.be.above(0);
			
			done();
		});
		
		
	});
}


function handleCheckDevicesLoop()
{
	var dbDeviceList = retrieveListFromCache();
	var cacheCount = retrieveCountFromCache();
	
	var loopIndex = 0;
	var currentElement = null;
	var currentDesc = null;
	
	describe("Cache Devices Added", function()
	{
		for (loopIndex = 0; loopIndex < cacheCount; loopIndex = loopIndex + 1)
		{
			currentElement = testCacheFile.getTestDevice(loopIndex);
			currentDesc = textCommon.writeDeviceCacheHeader(currentElement);
			
			it(currentDesc, function(done)
			{
				var cacheDeviceListed = rioCommon.testIdListed(dbDeviceList, currentElement.key);
				expect(cacheDeviceListed).to.be.true;
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

module.exports = testNodeCheckListApi;