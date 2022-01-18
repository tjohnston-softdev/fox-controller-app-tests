const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const objectFunctions = require(commonPaths.testObject);
const apiDefinitionObject = require(commonPaths.defineApi).definitions;

const nodeCommonFile = require("../sub/common-nodes");
const testCacheFile = require("../sub/test-device-cache");
var nodeCacheObject = null;


function testNodeArrayCheckApi()
{
	describe("Check Cached Node Array", function()
	{
		handleStructure();
		handleManufacturerProperties();
		handleDeviceCount();
		handleCacheDisposal();
	});
}

function handleStructure()
{
	describe("Array Structure", function()
	{
		it("Node Array Retrieved From Cache", function(done)
		{
			nodeCacheObject = callNodeCache();
			expect(nodeCacheObject).to.exist;
			done();
		});
		
		it("Correct Array Structure", function(done)
		{
			expect(nodeCacheObject).to.be.an("object");
			nodeCommonFile.testStorageObject(nodeCacheObject);
			done();
		});
		
	});
}

function handleManufacturerProperties()
{
	describe("Manufacturer Storage", function()
	{
		var manufacturersArray = null;
		
		it("Manufacturer Property List Retrieved From Cache", function(done)
		{
			manufacturersArray = objectFunctions.getProps(nodeCacheObject);
			arrayFunctions.testPopulated(manufacturersArray);
			done();
		});
		
		it("Manufacturer Property List Valid", function(done)
		{
			arrayFunctions.testAllType(manufacturersArray, 'string');
			nodeCommonFile.testManufacturerArray(manufacturersArray);
			done();
		});
		
		it("All Manufacturers Stored", function(done)
		{
			expect(manufacturersArray).to.deep.equal(apiDefinitionObject);
			done();
		});
		
	});
}

function handleDeviceCount()
{
	describe("Total Nodes Stored", function()
	{
		var retrievedCount = -1;
		
		it("Nodes Counted", function(done)
		{
			retrievedCount = nodeCommonFile.testStoreCount(nodeCacheObject);
			done();
		});
		
		it("Nodes Present", function(done)
		{
			expect(retrievedCount).to.be.at.least(1);
			done();
		});
		
	});
}


function handleCacheDisposal()
{
	describe("Local Cache Variable", function()
	{
		it("Disposed", function(done)
		{
			nodeCacheObject = null;
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

module.exports = testNodeArrayCheckApi;