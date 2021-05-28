const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommon);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiRequestScript = require(commonPaths.requestApi);
const rioCommon = require(commonPaths.rioCommon);
const rioInvalid = require(commonPaths.rioInvalid);
const deviceCommon = require(commonPaths.deviceCommon);
const httpRequests = require(commonPaths.httpRequests);

var urlList = null;
var urlCreate = null;

var nullMessage = null;
var typeMessage = null;
var unknownIdMessage = null;
var deviceTypeObject = null;
var manufacturerObject = null;
var modelObject = null;
var ipAddressObject = null;

var currentDeviceList = null;
var testObjectID = null;
var testObjectLink = null;
var testObjectDefinition = null;


function testDeviceModifyInvalidApis()
{
	describe("Device Modify API Invalid Tests", function()
	{
		handlePrepare();
		handleCurrentDeviceList();
		handleTestAdd();
		handleTestGet();
		handleInvalidArgumentTests();
		
		handleUnchangedModifyTest();
		handleUnknownIdModifyTest();
		handleUnknownDeviceTypeModifyTest();
		handleUnknownManufacturerModifyTest();
		handleUnknownModelModifyTest();
		handleBadIpAddressModifyTest();
		
		handleTestDelete();
		handleAfterDeviceList();
		handleDispose();
	});
}

function handlePrepare()
{
	describe("Preperation", function()
	{
		
		it("List Devices URL Written", function(done)
		{
			urlList = apiRequestScript.callWriteApiUrl(apiPaths.devicesApi, apiPaths.rioApiSub);
			
			commonFunctionsFile.testPresent(urlList);
			commonFunctionsFile.testString(urlList);
			
			done();
		});
		
		
		it("Create Device URL Written", function(done)
		{
			urlCreate = apiRequestScript.callWriteApiUrl(apiPaths.devicesApi, apiPaths.rioApiSub);
			
			commonFunctionsFile.testPresent(urlCreate);
			commonFunctionsFile.testString(urlCreate);
			
			done();
		});
		
		it("Error Messages Retrieved", function(done)
		{
			nullMessage = commonErrorStringsFile.writeUnexpectedTokenErrorNull();
			typeMessage = commonErrorStringsFile.writeUnexpectedTokenErrorType();
			unknownIdMessage = commonErrorStringsFile.writeKeyNotFoundError(commonJsonObjectsFile.unknownID);
			deviceTypeObject = rioInvalid.getDeviceType(commonJsonObjectsFile.modifiedDevice);
			manufacturerObject = rioInvalid.getManufacturer(commonJsonObjectsFile.modifiedDevice);
			modelObject = rioInvalid.getModel(commonJsonObjectsFile.modifiedDevice);
			ipAddressObject = rioInvalid.getIpAddress(commonJsonObjectsFile.modifiedDevice);
			
			done();
		});
		
		
	});
}

function handleCurrentDeviceList()
{
	var listErr = null;
	var listResult = null;
	
	describe("Get Original Device List", function()
	{
		it("List Request Sent", function(done)
		{	
			listResult = httpRequests.defineOutput();
			httpRequests.getSuccessful(urlList, listResult, done);
		});
		
		
		it("Results Read", function(done)
		{
			currentDeviceList = listResult.body;
			done();
		});
		
		it("Valid Return", function(done)
		{
			rioCommon.testDeviceListNeutral(currentDeviceList);
			done();
		});
		
	});
	
}


function handleTestAdd()
{
	describe("Add Test Device", function()
	{
		var addObject = null;
		var addResultReturn = null;
		var addResultRead = null;
		var addKey = null;
		
		it("Test Object Defined", function(done)
		{
			addObject = cloneBaseDefinition();
			done();
		});
		
		it("Add Request Called", function(done)
		{
			addResultReturn = httpRequests.defineOutput();
			httpRequests.postSuccessful(urlCreate, addObject, addResultReturn, done);
		});
		
		it("Results Read", function(done)
		{
			addResultRead = apiRequestScript.callReadApiResponseObject(addResultReturn);
			done();
		});
		
		it("Device Added", function(done)
		{
			deviceCommon.testFrontendAdded(addResultRead);
			addKey = addResultRead.id;
			deviceCommon.testFrontendIdValid(addKey);
			done();
		});
		
		
		it("Test Object ID Stored", function(done)
		{
			testObjectID = addKey;
			deviceCommon.testFrontendIdValid(testObjectID);
			done();
		});
		
		
		it("Update URL Written", function(done)
		{
			testObjectLink = deviceCommon.getRudUrl(testObjectID);
			
			commonFunctionsFile.testPresent(testObjectLink);
			commonFunctionsFile.testString(testObjectLink);
			
			done();
		});
		
	});
}


function handleTestGet()
{
	describe("Get Test Device", function()
	{
		var getOriginal = null;
		var getError = null;
		var getReturn = null;
		var getRead = null;
		
		it("Test Object Defined", function(done)
		{
			getOriginal = cloneBaseDefinition();
			done();
		});
		
		
		it("Get Request Called", function(done)
		{
			getReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(testObjectLink, getReturn, done);
		});
		
		it("Results Read", function(done)
		{
			getRead = apiRequestScript.callReadApiResponseObject(getReturn);
			done();
		});
		
		it("Retrieved Object Valid", function(done)
		{
			checkModifyTestObjectGet(getRead, testObjectID, getOriginal);
			done();
		});
		
		it("Database Object Stored", function(done)
		{
			testObjectDefinition = getRead;
			checkModifyTestObjectGet(testObjectDefinition, testObjectID, getOriginal);
			done();
		});
		
	});
}


function handleInvalidArgumentTests()
{
	describe("Arguments", function()
	{
		it("Null", function(done)
		{
			httpRequests.putInvalid(testObjectLink, "null", nullMessage, done);
		});
		
		it("Invalid Type", function(done)
		{	
			httpRequests.putInvalid(testObjectLink, -1, typeMessage, done);
		});
		
		
	});
}


function handleUnchangedModifyTest()
{
	describe("Unchanged Device", function()
	{
		var updateReqReturn = null;
		
		it("Modification Called", function(done)
		{
			updateReqReturn = httpRequests.defineOutput();
			httpRequests.putSuccessful(testObjectLink, testObjectDefinition, updateReqReturn, done);
		});
		
		it("Modification Passed", function(done)
		{
			ucUpdateRead = apiRequestScript.callReadApiResponseObject(updateReqReturn);
			
			deviceCommon.testAddModifyResultProperties(ucUpdateRead);
			deviceCommon.testAddModifyResultContents(ucUpdateRead);
			expect(ucUpdateRead.id).to.equal(testObjectID);
			
			done();
		});
		
	});
}

function handleUnknownIdModifyTest()
{
	describe("Unknown ID (id)", function()
	{
		var invalidEntry = null;
		var updateReqErr = null;
		var updateReqReturn = null;
		
		it("Modification Defined", function(done)
		{
			invalidEntry = cloneAddedDevice();
			invalidEntry.id = commonJsonObjectsFile.unknownID;
			done();
		});
		
		it("Error Flagged", function(done)
		{
			httpRequests.putInvalid(testObjectLink, invalidEntry, unknownIdMessage, done);
		});
		
	});
}


function handleUnknownDeviceTypeModifyTest()
{
	describe("Unknown Device Type (deviceType)", function()
	{
		var invalidEntry = null;
		
		it("Modification Defined", function(done)
		{
			invalidEntry = cloneAddedDevice();
			invalidEntry.deviceType = deviceTypeObject.valueCase.jsonObject.deviceType;
			done();
		});
		
		it("Error Flagged", function(done)
		{
			httpRequests.putInvalid(testObjectLink, invalidEntry, deviceTypeObject.valueCase.errorMessage, done);
		});
	});
}

function handleUnknownManufacturerModifyTest()
{
	describe("Unknown Manufacturer (maker)", function()
	{
		var invalidEntry = null;
		
		it("Modification Defined", function(done)
		{
			invalidEntry = cloneAddedDevice();
			invalidEntry.maker = manufacturerObject.valueCase.jsonObject.maker;
			done();
		});
		
		it("Error Flagged", function(done)
		{
			httpRequests.putInvalid(testObjectLink, invalidEntry, manufacturerObject.valueCase.errorMessage, done);
		});
		
	});
}


function handleUnknownModelModifyTest()
{
	describe("Unknown Model (model)", function()
	{
		var invalidEntry = null;
		
		it("Modification Defined", function(done)
		{
			invalidEntry = cloneAddedDevice();
			invalidEntry.model = modelObject.valueCase.jsonObject.model;
			done();
		});
		
		it("Error Flagged", function(done)
		{
			httpRequests.putInvalid(testObjectLink, invalidEntry, modelObject.valueCase.errorMessage, done);
		});
		
	});
}


function handleBadIpAddressModifyTest()
{
	describe("Invalid IP Address (ipAddress)", function()
	{
		var ipObject = null;
		var ipUpdateError = null;
		var ipUpdateReturn = null;
		
		it("Modification Defined", function(done)
		{
			ipObject = cloneAddedDevice();
			ipObject.ipAddress = ipAddressObject.formatCase.jsonObject.ipAddress;
			done();
		});
		
		it("Error Flagged", function(done)
		{
			httpRequests.putInvalid(testObjectLink, ipObject, ipAddressObject.formatCase.errorMessage, done);
		});
		
	});
}



function handleTestDelete()
{
	describe("Delete Test Device", function()
	{
		var delReturn = null;
		
		it("Delete Called", function(done)
		{
			delReturn = httpRequests.defineOutput();
			httpRequests.deleteSuccessful(testObjectLink, true, delReturn, done);
		});
		
		it("Delete Successful", function(done)
		{
			httpRequests.checkDeleteResult(delReturn);
			done();
		});
		
		
	});
}


function handleAfterDeviceList()
{
	describe("Check Device List Intact", function()
	{
		var afterListReturn = null;
		var afterListRead = null;
		
		it("List Request Sent", function(done)
		{			
			afterListReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(urlList, afterListReturn, done);
		});
		
		it("Results Read", function(done)
		{
			afterListRead = afterListReturn.body;
			done();
		});
		
		
		it("Valid Return", function(done)
		{
			rioCommon.testDeviceListNeutral(afterListRead);
			done();
		});
		
		it("Device List Intact", function(done)
		{
			expect(afterListRead).to.deep.equal(currentDeviceList);
			done();
		});
		
	});
}


function handleDispose()
{
	describe("Dispose Variables", function()
	{
		it("Request URLs", function(done)
		{
			urlList = null;
			urlCreate = null;
			done();
		});
		
		it("Error Messages", function(done)
		{
			nullMessage = null;
			typeMessage = null;
			unknownIdMessage = null;
			deviceTypeObject = null;
			manufacturerObject = null;
			modelObject = null;
			ipAddressObject = null;
			
			done();
		});
		
		it("Original Device List", function(done)
		{
			currentDeviceList = null;
			done();
		});
		
		it("Test Object", function(done)
		{
			testObjectLink = null;
			testObjectID = null;
			testObjectDefinition = null;
			done();
		});
		
	});
}


function checkModifyTestObjectGet(gResultObject, gTargetID, gOriginalObject)
{
	rioCommon.testDeviceObject(gResultObject);
	expect(gResultObject.id).to.equal(gTargetID);
	rioCommon.compareToOriginal(gResultObject, gOriginalObject);
}


function cloneBaseDefinition()
{
	var res = commonFunctionsFile.cloneObject(commonJsonObjectsFile.modifiedDevice);
	return res;
}

function cloneAddedDevice()
{
	var res = commonFunctionsFile.cloneObject(testObjectDefinition);
	return res;
}


module.exports = testDeviceModifyInvalidApis;