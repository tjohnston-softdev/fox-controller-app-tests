const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const subCommonPath = require(commonPaths.subCommonRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');
const rioCommon = require(subCommonPath.rioCommonFile);
const rioCommonInvalid = require(subCommonPath.rioCommonInvalidFile);

const apiCommonFile = require("../sub-requests/common-api");
const deviceCommon = require(subCommonPath.deviceCommonFile);
const deviceFolder = apiPaths.devicesApi;
const deviceRio = apiPaths.rioApiSub;

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
		
		handleNullModifyTest();
		handleInvalidArgumentModifyTest();
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
			urlCreate = apiRequestScript.callWriteApiUrl(deviceFolder, deviceRio);
			
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
	var currentListError = null;
	var currentListResult = null;
	
	describe("Get Original Device List", function()
	{
		it("List Request Sent", function(done)
		{	
			reqModule(urlList, function(callbackError, callbackResult)
			{
				currentListResult = callbackResult;
				currentListError = callbackError;
				done();
			});
			
		});
		
		it("List Request Successful", function(done)
		{
			commonFunctionsFile.testNull(currentListError);
			commonFunctionsFile.testPresent(currentListResult);
			done();
		});
		
		it("List Read", function(done)
		{
			currentDeviceList = apiRequestScript.callReadApiResponseArray(currentListResult);
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
		var addOptions = null;
		var addResultError = null;
		var addResultReturn = null;
		var addResultRead = null;
		var addKey = null;
		
		it("Test Object Defined", function(done)
		{
			addObject = cloneBaseDefinition();
			done();
		});
		
		it("Add Called", function(done)
		{
			addOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', addObject);
			
			reqModule(addOptions, function(cCallbackError, cCallbackResult)
			{
				addResultError = cCallbackError;
				addResultReturn = cCallbackResult;
				done();
			});
		});
		
		it("Add Successful", function(done)
		{
			commonFunctionsFile.testNull(addResultError);
			commonFunctionsFile.testPresent(addResultReturn);
			
			addResultRead = apiRequestScript.callReadApiResponseObject(addResultReturn);
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
		
		it("Get Called", function(done)
		{
			getOriginal = cloneBaseDefinition();
			
			reqModule(testObjectLink, function(gCallbackError, gCallbackResult)
			{
				getError = gCallbackError;
				getReturn = gCallbackResult;
				done();
			});
		});
		
		it("Get Successful", function(done)
		{
			commonFunctionsFile.testNull(getError);
			commonFunctionsFile.testPresent(getReturn);
			
			getRead = apiRequestScript.callReadApiResponseObject(getReturn);
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


function handleNullModifyTest()
{
	describe("Null", function()
	{
		var nullUpdateOptions = null;
		var nullUpdateError = null;
		var nullUpdateReturn = null;
		
		it("Modification Called", function(done)
		{
			nullUpdateOptions = getUpdateRequestOptions(null);
			
			reqModule(nullUpdateOptions, function(mCallbackError, mCallbackResult)
			{
				nullUpdateError = mCallbackError;
				nullUpdateReturn = mCallbackResult;
				done();
			});
		});
		
		it("Error Flagged", function(done)
		{
			catchModificationError(nullUpdateError, nullUpdateReturn, nullMessage);
			done();
		});
		
	});
}


function handleInvalidArgumentModifyTest()
{
	describe("Invalid Argument Type", function()
	{
		var argUpdateOptions = null;
		var argUpdateError = null;
		var argUpdateReturn = null;
		
		it("Modification Called", function(done)
		{
			argUpdateOptions = getUpdateRequestOptions(-1);
			
			reqModule(argUpdateOptions, function(mCallbackError, mCallbackResult)
			{
				argUpdateError = mCallbackError;
				argUpdateReturn = mCallbackResult;
				done();
			});
		});
		
		it("Error Flagged", function(done)
		{
			catchModificationError(argUpdateError, argUpdateReturn, typeMessage);
			done();
		});
		
	});
}

function handleUnchangedModifyTest()
{
	describe("Unchanged Device", function()
	{
		var ucUpdateOptions = null;
		var ucUpdateError = null;
		var ucUpdateReturn = null;
		var ucUpdateRead = null;
		
		it("Modification Called", function(done)
		{
			ucUpdateOptions = getUpdateRequestOptions(testObjectDefinition);
			
			reqModule(ucUpdateOptions, function(mCallbackError, mCallbackResult)
			{
				ucUpdateError = mCallbackError;
				ucUpdateReturn = mCallbackResult;
				done();
			});
		});
		
		it("Modification Passed", function(done)
		{
			commonFunctionsFile.testNull(ucUpdateError);
			commonFunctionsFile.testPresent(ucUpdateReturn);
			
			ucUpdateRead = apiRequestScript.callReadApiResponseObject(ucUpdateReturn);
			
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
		var unknownIdObject = null;
		var unknownIdUpdateOptions = null;
		var unknownIdUpdateError = null;
		var unknownIdUpdateReturn = null;
		
		it("Modification Defined", function(done)
		{
			unknownIdObject = cloneAddedDevice();
			unknownIdObject.id = commonJsonObjectsFile.unknownID;
			
			done();
		});
		
		it("Modification Called", function(done)
		{
			unknownIdUpdateOptions = getUpdateRequestOptions(unknownIdObject);
			
			reqModule(unknownIdUpdateOptions, function(mCallbackError, mCallbackResult)
			{
				unknownIdUpdateError = mCallbackError;
				unknownIdUpdateReturn = mCallbackResult;
				done();
			});
			
		});
		
		it("Error Flagged", function(done)
		{
			catchModificationError(unknownIdUpdateError, unknownIdUpdateReturn, unknownIdMessage);
			done();
		});
		
		
		
	});
}


function handleUnknownDeviceTypeModifyTest()
{
	describe("Unknown Device Type (deviceType)", function()
	{
		var unknownTypeObject = null;
		var unknownTypeUpdateOptions = null;
		var unknownTypeUpdateError = null;
		var unknownTypeUpdateReturn = null;
		
		it("Modification Defined", function(done)
		{
			unknownTypeObject = cloneAddedDevice();
			unknownTypeObject.deviceType = deviceTypeObject.oValue.jsonObject.deviceType;
			
			done();
		});
		
		it("Modification Called", function(done)
		{
			unknownTypeUpdateOptions = getUpdateRequestOptions(unknownTypeObject);
			
			reqModule(unknownTypeUpdateOptions, function(mCallbackError, mCallbackResult)
			{
				unknownTypeUpdateError = mCallbackError;
				unknownTypeUpdateReturn = mCallbackResult;
				done();
			});
		});
		
		it("Error Flagged", function(done)
		{
			catchModificationError(unknownTypeUpdateError, unknownTypeUpdateReturn, deviceTypeObject.oValue.errorMessage);
			done();
		});
		
		
		
	});
}

function handleUnknownManufacturerModifyTest()
{
	describe("Unknown Manufacturer (maker)", function()
	{
		var unknownManufacturerObject = null;
		var unknownManufacturerUpdateOptions = null;
		var unknownManufacturerUpdateError = null;
		var unknownManufacturerUpdateReturn = null;
		
		it("Modification Defined", function(done)
		{
			unknownManufacturerObject = cloneAddedDevice();
			unknownManufacturerObject.maker = manufacturerObject.oValue.jsonObject.maker;
			
			done();
		});
		
		it("Modification Called", function(done)
		{
			unknownManufacturerUpdateOptions = getUpdateRequestOptions(unknownManufacturerObject);
			
			reqModule(unknownManufacturerUpdateOptions, function(mCallbackError, mCallbackResult)
			{
				unknownManufacturerUpdateError = mCallbackError;
				unknownManufacturerUpdateReturn = mCallbackResult;
				done();
			});
			
		});
		
		it("Error Flagged", function(done)
		{
			catchModificationError(unknownManufacturerUpdateError, unknownManufacturerUpdateReturn, manufacturerObject.oValue.errorMessage);
			done();
		});
		
		
		
	});
}


function handleUnknownModelModifyTest()
{
	describe("Unknown Model (model)", function()
	{
		var unknownModelObject = null;
		var unknownModelUpdateOptions = null;
		var unknownModelUpdateError = null;
		var unknownModelUpdateReturn = null;
		
		it("Modification Defined", function(done)
		{
			unknownModelObject = cloneAddedDevice();
			unknownModelObject.model = modelObject.oValue.jsonObject.model;
			
			done();
		});
		
		it("Modification Called", function(done)
		{
			unknownModelUpdateOptions = getUpdateRequestOptions(unknownModelObject);
			
			reqModule(unknownModelUpdateOptions, function(mCallbackError, mCallbackResult)
			{
				unknownModelUpdateError = mCallbackError;
				unknownModelUpdateReturn = mCallbackResult;
				done();
			});
			
		});
		
		it("Error Flagged", function(done)
		{
			catchModificationError(unknownModelUpdateError, unknownModelUpdateReturn, modelObject.oValue.errorMessage);
			done();
		});
		
	});
}


function handleBadIpAddressModifyTest()
{
	describe("Invalid IP Address (ipAddress)", function()
	{
		var ipObject = null;
		var ipUpdateOptions = null;
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
			ipUpdateOptions = getUpdateRequestOptions(ipObject);
			
			reqModule(ipUpdateOptions, function(mCallbackError, mCallbackResult)
			{
				ipUpdateError = mCallbackError;
				ipUpdateReturn = mCallbackResult;
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
			
			reqModule.delete(delOptions, function(dCallbackError, dCallbackResult)
			{
				delError = dCallbackError;
				delReturn = dCallbackResult;
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
			reqModule(urlList, function(afterListCallbackError, afterListCallbackReturn)
			{
				afterListError = afterListCallbackError;
				afterListReturn = afterListCallbackReturn;
				done();
			});
		});
		
		it("List Request Successful", function(done)
		{
			commonFunctionsFile.testNull(afterListError);
			commonFunctionsFile.testPresent(afterListReturn);
			done();
		});
		
		it("List Read", function(done)
		{
			afterListRead = apiRequestScript.callReadApiResponseArray(afterListReturn);
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






function catchModificationError(modifyErrorObject, modifyFunctionReturn, targetErrorString)
{
	var extractedMessage = null;
	
	commonFunctionsFile.testNull(modifyErrorObject);
	commonFunctionsFile.testPresent(modifyFunctionReturn);
	
	extractedMessage = apiRequestScript.callReadApiResponseError(modifyFunctionReturn);
	
	commonFunctionsFile.testPresent(extractedMessage);
	commonFunctionsFile.testString(extractedMessage);
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
	
	commonFunctionsFile.testNull(mdError);
	commonFunctionsFile.testPresent(mdResult);
	
	returnedObject = apiRequestScript.callReadApiResponseObject(mdResult);
	deviceCommon.callTestFrontendDeleteSuccessful(returnedObject);
}


function getUpdateRequestOptions(upContent)
{
	var updateOptionsRes = apiRequestScript.getRequestOptions(testObjectLink, 'PUT', upContent);
	return updateOptionsRes;
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


exports.callTestDeviceModifyInvalidApis = testDeviceModifyInvalidApis;