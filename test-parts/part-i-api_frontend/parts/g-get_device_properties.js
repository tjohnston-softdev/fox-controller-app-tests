const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const objectFunctions = require(commonPaths.testObject);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequests);

const nodeCommonFile = require("../sub-parts/common-nodes");
const nodeTextFile = require("../sub-parts/common-text");
const testCacheFile = require("../sub-parts/test-device-cache");



function testNodeDevicePropertiesApi()
{
	describe("Get Device Properties (nodes/manufacturer/id)", function()
	{
		getPropertiesLoop();
	});
}


function getPropertiesLoop()
{
	var nodeManufacturerArray = callNodeManufacturerPropertyList();
	var loopIndex = 0;
	var currentName = "";
	var currentArray = [];
	
	describe("Cached Manufacturers", function()
	{
		for (loopIndex = 0; loopIndex < nodeManufacturerArray.length; loopIndex = loopIndex + 1)
		{
			currentName = nodeManufacturerArray[loopIndex];
			currentArray = testCacheFile.retrieveNodeManufacturer(currentName);
			
			describe(currentName, function()
			{
				loopCurrentManufacturerStatus(currentName, currentArray);
			});
		}
	});
}



function loopCurrentManufacturerStatus(manufacturerName, deviceArray)
{
	var deviceIndex = 0;
	var currentObject = {};
	var currentName = "";
	var currentID = -1;
	var currentDesc = "";
	
	for (deviceIndex = 0; deviceIndex < deviceArray.length; deviceIndex = deviceIndex + 1)
	{
		currentObject = deviceArray[deviceIndex];
		currentName = currentObject.name;
		currentID = currentObject.value;
		currentDesc = nodeTextFile.writeNodeCacheHeader(currentObject.text, currentID);
		
		describe(currentDesc, function()
		{
			testCurrentDeviceStatus(manufacturerName, currentName, currentID);
		});
	}
	
}



function testCurrentDeviceStatus(deviceManufacturer, deviceName, deviceID)
{
	var deviceURL = null;
	var deviceReturn = null;
	var deviceRead = null;
	
	it("Request Made", function(done)
	{
		deviceURL = apiRequestScript.writeUrl(apiPaths.nodesApi, deviceManufacturer);
		deviceURL = deviceURL + "/" + deviceID;
		deviceReturn = httpRequests.defineOutput();
		
		httpRequests.getSuccessful(deviceURL, deviceReturn, done);
	});
	
	it("Results Read", function(done)
	{
		deviceRead = apiRequestScript.readResponseObject(deviceReturn);
		done();
	});
	
	it("Object Returned", function(done)
	{
		commonFunctionsFile.testPresent(deviceRead);
		expect(deviceRead).to.be.an("object");
		
		done();
	});
	
	it("Correct Properties", function(done)
	{
		objectFunctions.testPropExists(deviceRead, 'name');
		objectFunctions.testPropExists(deviceRead, 'STATUS');
		objectFunctions.testPropExists(deviceRead, 'CONTROL');
		
		done();
	});
	
	it("Correct Node Name", function(done)
	{
		expect(deviceRead.name).to.equal(deviceName);
		done();
	});
	
	it("Correct Status Array", function(done)
	{
		arrayFunctions.testPopulated(deviceRead.STATUS);
		validateStatusControlArray(deviceRead.STATUS);
		done();
	});
	
	it("Correct Control Array", function(done)
	{
		arrayFunctions.testPopulated(deviceRead.CONTROL);
		validateStatusControlArray(deviceRead.CONTROL);
		done();
	});
		
}




function validateStatusControlArray(scArray)
{
	nodeCommonFile.testStatusControlStructure(scArray);
	commonFunctionsFile.testPropertyStringRequiredArray(scArray, 'value');
	commonFunctionsFile.testPropertyStringRequiredArray(scArray, 'text');
	
	nodeCommonFile.testStatusControlSyntax(scArray);
	nodeCommonFile.testStatusControlIntegrity(scArray);
	
}

function callNodeManufacturerPropertyList()
{
	var listRes = null;
	
	try
	{
		listRes = testCacheFile.readNodePropertyList();
	}
	catch(e)
	{
		listRes = null;
	}
	
	return listRes;
}

module.exports = testNodeDevicePropertiesApi;