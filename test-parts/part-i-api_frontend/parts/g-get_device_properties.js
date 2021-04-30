const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const subCommonPath = require(commonPaths.subCommonRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiDefinitionObject = require(commonPaths.defineApi).definitions;
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');

const nodeCommonFile = require("../sub-parts/common-nodes");
const nodeTextFile = require("../sub-parts/common-text");
const testCacheFile = require("../sub-parts/test-device-cache");
const nodeManufacturerArray = callNodeManufacturerPropertyList();



function testNodeDevicePropertiesApi()
{
	describe("Get Device Properties (nodes/manufacturer/id)", function()
	{
		getPropertiesLoop();
	});
}



function getPropertiesLoop()
{
	var currentManufacturerIndex = 0;
	var currentManufacturerName = "";
	var currentManufacturerArray = null;
	
	describe("Cached Manufacturers", function()
	{
		
		for (currentManufacturerIndex = 0; currentManufacturerIndex < nodeManufacturerArray.length; currentManufacturerIndex = currentManufacturerIndex + 1)
		{
			currentManufacturerName = nodeManufacturerArray[currentManufacturerIndex];
			currentManufacturerArray = testCacheFile.retrieveNodeManufacturer(currentManufacturerName);
			
			describe(currentManufacturerName, function()
			{
				loopCurrentManufacturerStatus(currentManufacturerName, currentManufacturerArray);
			});
		}
	});
}



function loopCurrentManufacturerStatus(manufacturerName, deviceArray)
{
	var currentDeviceIndex = 0;
	var currentDeviceObject = null;
	var currentDeviceName = null;
	var currentDeviceID = null;
	var currentDeviceDesc = null;
	
	
	while (currentDeviceIndex >= 0 && currentDeviceIndex < deviceArray.length && deviceArray !== null)
	{
		currentDeviceObject = deviceArray[currentDeviceIndex];
		currentDeviceName = currentDeviceObject.name;
		currentDeviceID = currentDeviceObject.value;
		currentDeviceDesc = nodeTextFile.callWriteNodeCacheHeader(currentDeviceObject.text, currentDeviceID);
		
		describe(currentDeviceDesc, function()
		{
			testCurrentDeviceStatus(manufacturerName, currentDeviceName, currentDeviceID);
		});
		
		currentDeviceIndex = currentDeviceIndex + 1;
	}
	
}



function testCurrentDeviceStatus(mName, dName, id)
{
	var urlPart = null;
	
	var dRequestUrl = null;
	var dRequestError = null;
	var dRequestReturn = null;
	var dRequestRead = null;
	
	it("Request Made", function(done)
	{
		dRequestUrl = apiRequestScript.callWriteApiUrl(apiPaths.nodesApi, mName);
		dRequestUrl = dRequestUrl + "/" + id;
				
		reqModule(dRequestUrl, function(aError, aResult)
		{
			dRequestError = aError;
			dRequestReturn = aResult;
			done();
		});
				
	});
	
	it("Request Successful", function(done)
	{
		expect(dRequestError).to.be.null;
		commonFunctionsFile.testPresent(dRequestReturn);
		done();
	});
	
	it("Results Read", function(done)
	{
		dRequestRead = apiRequestScript.callReadApiResponseObject(dRequestReturn);
		done();
	});
	
	it("Object Returned", function(done)
	{
		commonFunctionsFile.testPresent(dRequestRead);
		expect(dRequestRead).to.be.an("object");
		
		done();
	});
	
	it("Correct Properties", function(done)
	{
		commonFunctionsFile.testObjectPropertyDefinition(dRequestRead, 'name');
		commonFunctionsFile.testObjectPropertyDefinition(dRequestRead, 'STATUS');
		commonFunctionsFile.testObjectPropertyDefinition(dRequestRead, 'CONTROL');
		
		done();
	});
	
	it("Correct Node Name", function(done)
	{
		commonFunctionsFile.testObjectPropertyContent(dRequestRead, 'name', 'string');
		commonFunctionsFile.testString(dRequestRead.name);
		expect(dRequestRead.name).to.equal(dName);
		
		done();
	});
	
	it("Correct Status Array", function(done)
	{
		commonFunctionsFile.testArrayPopulated(dRequestRead.STATUS);
		validateStatusControlArray(dRequestRead.STATUS);
		done();
	});
	
	it("Correct Control Array", function(done)
	{
		commonFunctionsFile.testArrayPopulated(dRequestRead.CONTROL);
		validateStatusControlArray(dRequestRead.CONTROL);
		done();
	});
		
}




function validateStatusControlArray(scArray)
{
	nodeCommonFile.callTestStatusControlStructure(scArray);
	commonFunctionsFile.testPropertyStringRequiredArray(scArray, 'value');
	commonFunctionsFile.testPropertyStringRequiredArray(scArray, 'text');
	
	nodeCommonFile.callTestStatusControlSyntax(scArray);
	nodeCommonFile.callTestStatusControlIntegrity(scArray);
	
}

function callNodeManufacturerPropertyList()
{
	var mplRes = null;
	
	try
	{
		mplRes = testCacheFile.readNodePropertyList();
	}
	catch(e)
	{
		mplRes = null;
	}
	
	return mplRes;
}

exports.callTestNodeDevicePropertiesApi = testNodeDevicePropertiesApi;