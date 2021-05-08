const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiDefinitionObject = require(commonPaths.defineApi).definitions;
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');

const nodeCommonFile = require("../sub-parts/common-nodes");
const testCacheFile = require("../sub-parts/test-device-cache");
const nodeCacheObject = callNodeCache();

function testNodeArrayCheckApi()
{
	describe("Check Cached Node Array", function()
	{
		handleStructure();
		handleManufacturerProperties();
		handleDeviceCount();
	});
}

function handleStructure()
{
	describe("Array Structure", function()
	{
		it("Node Array Retrieved From Cache", function(done)
		{
			commonFunctionsFile.testPresent(nodeCacheObject);
			done();
		});
		
		it("Correct Array Structure", function(done)
		{
			expect(nodeCacheObject).to.be.an("object");
			nodeCommonFile.callTestNodeStorageObject(nodeCacheObject);
			done();
		});
		
	});
}

function handleManufacturerProperties()
{
	describe("Manufacturer Storage", function()
	{
		var mList = null;
		
		it("Manufacturer Property List Retrieved From Cache", function(done)
		{
			mList = commonFunctionsFile.getObjectProperties(nodeCacheObject);
			
			commonFunctionsFile.testPresent(mList);
			commonFunctionsFile.testArrayPopulated(mList);
			
			done();
		});
		
		it("Manufacturer Property List Valid", function(done)
		{
			commonFunctionsFile.testAllElements(mList, 'string');
			nodeCommonFile.callTestNodeManufacturerArray(mList);
			done();
		});
		
		it("All Manufacturers Stored", function(done)
		{
			expect(mList).to.deep.equal(apiDefinitionObject);
			done();
		});
		
		
	});
}

function handleDeviceCount()
{
	describe("Total Nodes Stored", function()
	{
		var nCount = null;
		
		it("Nodes Counted", function(done)
		{
			nCount = nodeCommonFile.callTestNodeStoreCount(nodeCacheObject);
			done();
		});
		
		it("Nodes Present", function(done)
		{
			expect(nCount).to.be.at.least(1);
			done();
		});
		
	});
}


function callNodeCache()
{
	var res = null;
	
	try
	{
		res = testCacheFile.retrieveNodeArrayStructure();
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestNodeArrayCheckApi = testNodeArrayCheckApi;