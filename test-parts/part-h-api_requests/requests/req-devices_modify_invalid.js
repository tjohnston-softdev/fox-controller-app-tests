const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const needle = require("needle");

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiRequestScript = require(commonPaths.requestApi);
const rioCommon = require(commonPaths.rioCommonFile);
const rioCommonInvalid = require(commonPaths.rioCommonInvalidFile);
const deviceCommon = require(commonPaths.deviceCommonFile);

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
			deviceTypeObject = rioCommon.callInvalidDeviceTypeObject(commonJsonObjectsFile.modifiedDevice);
			manufacturerObject = rioCommon.callInvalidManufacturerObject(commonJsonObjectsFile.modifiedDevice);
			modelObject = rioCommon.callInvalidModelObject(commonJsonObjectsFile.modifiedDevice);
			ipAddressObject = rioCommon.callInvalidIPAddressObject(commonJsonObjectsFile.modifiedDevice);
			
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
			needle.get(urlList, function(callbackError, callbackResult)
			{
				listResult = callbackResult;
				listErr = callbackError;
				done();
			});
			
		});
		
		it("List Request Successful", function(done)
		{
			expect(listErr).to.be.null;
			commonFunctionsFile.testPresent(listResult);
			expect(listResult).to.be.an("object");
			apiRequestScript.callValidateApiResponse(listResult);
			currentDeviceList = listResult.body;
			done();
		});
		
		it("Valid Return", function(done)
		{
			rioCommon.callTestDeviceListValidReturnNeutral(currentDeviceList);
			done();
		});
		
	});
	
}


function handleTestAdd()
{
	describe("Add Test Device", function()
	{
		var addObject = null;
		var addResultError = null;
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
			needle.post(urlCreate, addObject, {json: true}, function(callbackError, callbackResult)
			{
				addResultError = callbackError;
				addResultReturn = callbackResult;
				done();
			});
		});
		
		it("Add Request Successful", function(done)
		{
			expect(addResultError).to.be.null;
			commonFunctionsFile.testPresent(addResultReturn);
			expect(addResultReturn).to.be.an("object");
			apiRequestScript.callValidateApiResponse(addResultReturn);
			
			done();
		});
		
		it("Results Read", function(done)
		{
			addResultRead = apiRequestScript.callReadApiResponseObject(addResultReturn);
			done();
		});
		
		it("Device Added", function(done)
		{
			deviceCommon.callTestFrontendAddSuccessful(addResultRead);
			addKey = addResultRead.id;
			deviceCommon.callTestFrontendAddIdValid(addKey);
			done();
		});
		
		
		
		it("Test Object ID Stored", function(done)
		{
			testObjectID = addKey;
			deviceCommon.callTestFrontendAddIdValid(testObjectID);
			done();
		});
		
		
		it("Update URL Written", function(done)
		{
			testObjectLink = deviceCommon.callGetRudUrl(testObjectID);
			
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
			needle.get(testObjectLink, function(callbackError, callbackResult)
			{
				getError = callbackError;
				getReturn = callbackResult;
				done();
			});
		});
		
		it("Get Request Successful", function(done)
		{
			expect(getError).to.be.null;
			commonFunctionsFile.testPresent(getReturn);
			expect(getReturn).to.be.an("object");
			apiRequestScript.callValidateApiResponse(getReturn);
			done();
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
			needle.put(testObjectLink, "null", {json: true}, function(callbackError, callbackResult)
			{
				catchModificationError(callbackError, callbackResult, nullMessage);
				done();
			});
		});
		
		it("Invalid Type", function(done)
		{
			needle.put(testObjectLink, -1, {json: true}, function(callbackError, callbackResult)
			{
				catchModificationError(callbackError, callbackResult, typeMessage);
				done();
			});
		});
		
		
	});
}


function handleUnchangedModifyTest()
{
	describe("Unchanged Device", function()
	{
		var updateReqErr = null;
		var updateReqReturn = null;
		var updateReqRead = null;
		
		it("Modification Called", function(done)
		{	
			needle.put(testObjectLink, testObjectDefinition, {json: true}, function(callbackError, callbackResult)
			{
				updateReqReturn = callbackResult;
				updateReqErr = callbackError;
				done();
			});
		});
		
		it("Modification Passed", function(done)
		{
			expect(updateReqErr).to.be.null;
			commonFunctionsFile.testPresent(updateReqReturn);
			expect(updateReqReturn).to.be.an("object");
			apiRequestScript.callValidateApiResponse(updateReqReturn);
			
			ucUpdateRead = apiRequestScript.callReadApiResponseObject(updateReqReturn);
			
			deviceCommon.callTestAddModifyReturnProperties(ucUpdateRead);
			deviceCommon.callTestAddModifyReturnContents(ucUpdateRead);
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
		
		it("Modification Called", function(done)
		{
			needle.put(testObjectLink, invalidEntry, {json: true}, function(callbackError, callbackResult)
			{
				updateReqReturn = callbackResult;
				updateReqErr = callbackError;
				done();
			});
		});
		
		it("Error Flagged", function(done)
		{
			catchModificationError(updateReqErr, updateReqReturn, unknownIdMessage);
			done();
		});
		
	});
}


function handleUnknownDeviceTypeModifyTest()
{
	describe("Unknown Device Type (deviceType)", function()
	{
		var invalidEntry = null;
		var updateReqErr = null;
		var updateReqReturn = null;
		
		it("Modification Defined", function(done)
		{
			invalidEntry = cloneAddedDevice();
			invalidEntry.deviceType = deviceTypeObject.oValue.jsonObject.deviceType;
			done();
		});
		
		it("Modification Called", function(done)
		{
			needle.put(testObjectLink, invalidEntry, {json: true}, function(callbackError, callbackResult)
			{
				updateReqReturn = callbackResult;
				updateReqErr = callbackError;
				done();
			});
		});
		
		it("Error Flagged", function(done)
		{
			catchModificationError(updateReqErr, updateReqReturn, deviceTypeObject.oValue.errorMessage);
			done();
		});
	});
}

function handleUnknownManufacturerModifyTest()
{
	describe("Unknown Manufacturer (maker)", function()
	{
		var invalidEntry = null;
		var updateReqErr = null;
		var updateReqReturn = null;
		
		it("Modification Defined", function(done)
		{
			invalidEntry = cloneAddedDevice();
			invalidEntry.maker = manufacturerObject.oValue.jsonObject.maker;
			done();
		});
		
		it("Modification Called", function(done)
		{
			needle.put(testObjectLink, invalidEntry, {json: true}, function(callbackError, callbackResult)
			{
				updateReqReturn = callbackResult;
				updateReqErr = callbackError;
				done();
			});
		});
		
		it("Error Flagged", function(done)
		{
			catchModificationError(updateReqErr, updateReqReturn, manufacturerObject.oValue.errorMessage);
			done();
		});
		
		
		
	});
}


function handleUnknownModelModifyTest()
{
	describe("Unknown Model (model)", function()
	{
		var invalidEntry = null;
		var updateReqErr = null;
		var updateReqReturn = null;
		
		it("Modification Defined", function(done)
		{
			invalidEntry = cloneAddedDevice();
			invalidEntry.model = modelObject.oValue.jsonObject.model;
			done();
		});
		
		it("Modification Called", function(done)
		{
			needle.put(testObjectLink, invalidEntry, {json: true}, function(callbackError, callbackResult)
			{
				updateReqReturn = callbackResult;
				updateReqErr = callbackError;
				done();
			});
		});
		
		it("Error Flagged", function(done)
		{
			catchModificationError(updateReqErr, updateReqReturn, modelObject.oValue.errorMessage);
			done();
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
			ipObject.ipAddress = ipAddressObject.oFormat.jsonObject.ipAddress;
			done();
		});
		
		it("Modification Called", function(done)
		{
			needle.put(testObjectLink, ipObject, {json: true}, function(callbackError, callbackResult)
			{
				ipUpdateReturn = callbackResult;
				ipUpdateError = callbackError;
				done();
			});
		});
		
		it("Error Flagged", function(done)
		{
			catchModificationError(ipUpdateError, ipUpdateReturn, ipAddressObject.oFormat.errorMessage);
			done();
		});
		
	});
}



function handleTestDelete()
{
	describe("Delete Test Device", function()
	{
		var delOptions = null;
		var delError = null;
		var delReturn = null;
		
		it("Delete Called", function(done)
		{
			delOptions = apiRequestScript.getDeleteOptions(testObjectLink, true);
			
			needle.delete(testObjectLink, null, delOptions.headers, function(callbackError, callbackResult)
			{
				delError = callbackError;
				delReturn = callbackResult;
				done();
			});
		});
		
		it("Delete Successful", function(done)
		{
			checkModifyTestObjectDeleted(delError, delReturn);
			done();
		});
		
		
	});
}


function handleAfterDeviceList()
{
	describe("Check Device List Intact", function()
	{
		var afterListError = null;
		var afterListReturn = null;
		var afterListRead = null;
		
		it("List Request Sent", function(done)
		{
			needle.get(urlList, function(afterErr, afterRes)
			{
				afterListError = afterErr;
				afterListReturn = afterRes;
				done();
			});
		});
		
		it("List Request Successful", function(done)
		{
			expect(afterListError).to.be.null;
			commonFunctionsFile.testPresent(afterListReturn);
			expect(afterListReturn).to.be.an("object");
			apiRequestScript.callValidateApiResponse(afterListReturn);
			afterListRead = afterListReturn.body;
			done();
		});
		
		it("Valid Return", function(done)
		{
			rioCommon.callTestDeviceListValidReturnNeutral(afterListRead);
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



function catchModificationError(modifyErrorObject, modifyReturnObject, targetErrorString)
{
	var extractedMessage = null;
	
	expect(modifyErrorObject).to.be.null;
	commonFunctionsFile.testPresent(modifyReturnObject);
	expect(modifyReturnObject).to.be.an("object");
	
	extractedMessage = apiRequestScript.callReadApiResponseError(modifyReturnObject);
	expect(extractedMessage).to.equal(targetErrorString);
}


function checkModifyTestObjectGet(gResultObject, gTargetID, gOriginalObject)
{
	rioCommon.callTestDeviceObjectStructure(gResultObject);
	expect(gResultObject.id).to.equal(gTargetID);
	rioCommon.callCompareGetDeviceToOriginal(gResultObject, gOriginalObject);
}

function checkModifyTestObjectDeleted(mdError, mdResult)
{
	var returnedObject = null;
	
	expect(mdError).to.be.null;
	commonFunctionsFile.testPresent(mdResult);
	
	returnedObject = apiRequestScript.callReadApiResponseObject(mdResult);
	deviceCommon.callTestFrontendDeleteSuccessful(returnedObject);
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


module.exports =
{
	callTestDeviceModifyInvalidApis: testDeviceModifyInvalidApis
};