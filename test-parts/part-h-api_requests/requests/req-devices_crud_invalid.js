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

const crudUnknownID = commonJsonObjectsFile.unknownID;
const crudInvalidID = "-1";
const crudNullID = null;


var urlCreate = null;
var urlRudUnknown = null;
var urlRudInvalid = null;
var urlRudBlank = null;
var urlStatusUnknown = null;
var urlStatusInvalid = null;
var urlStatusBlank = null;


function testDeviceCrudInvalidApis()
{
	describe("Device CRUD API Invalid Tests (devices)", function()
	{
		handleUrlWrite();
		handleCreateInvalid();
		handleReadInvalid();
		handleStatusInvalid();
		handleDeleteInvalid();
		handleUrlDispose();
	});
}


function handleUrlWrite()
{
	describe("Write API Links", function()
	{
		it("Create", function(done)
		{
			urlCreate = apiRequestScript.callWriteApiUrl(deviceFolder, deviceRio);
			done();
		});
		
		it("Read, Delete", function(done)
		{
			urlRudUnknown = deviceCommon.callGetRudUrl(crudUnknownID);
			urlRudInvalid = deviceCommon.callGetRudUrl(crudInvalidID);
			urlRudBlank = deviceCommon.callGetRudUrl(crudNullID);
			
			done();
		});
		
		it("Status", function(done)
		{
			urlStatusUnknown = deviceCommon.callGetStatusUrl(crudUnknownID);
			urlStatusInvalid = deviceCommon.callGetStatusUrl(crudInvalidID);
			urlStatusBlank = deviceCommon.callGetStatusUrl(crudNullID);
			
			done();
		});
		
		
	});
}



function handleCreateInvalid()
{
	describe("Create Invalid (devices/remote-io)", function()
	{
		
		describe("Object", function()
		{
			
			var objectNullError = null;
			var objectTypeError = null;
			
			
			it("Errors Defined", function(done)
			{
				objectNullError = commonErrorStringsFile.writeUnexpectedTokenErrorNull();
				objectTypeError = commonErrorStringsFile.writeUnexpectedTokenErrorType();
				done();
			});
			
			it("Null", function(done)
			{
				var nullOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', null);
			
				reqModule.post(nullOptions, function(aNullError, aNullResult)
				{
					readInvalidResults(aNullError, aNullResult, objectNullError);
					done();
				});
			});
			
			
			it("Invalid Object Type", function(done)
			{
				var typeErrorOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', -1);
			
				reqModule.post(typeErrorOptions, function(aNullError, aNullResult)
				{
					readInvalidResults(aNullError, aNullResult, objectTypeError);
					done();
				});
			});
			
			
			
		});
		
		describe("Invalid Device Type (deviceType)", function()
		{
			var deviceTypeErrors = null;
			
			it("Errors Defined", function(done)
			{
				deviceTypeErrors = rioCommon.callInvalidDeviceTypeObject(commonJsonObjectsFile.crudDevice);
				done();
			});
			
			it("Invalid Value", function(done)
			{
				var dtValueOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', deviceTypeErrors.oValue.jsonObject);
				
				reqModule.post(dtValueOptions, function(aDeviceError, aDeviceResult)
				{
					readInvalidResults(aDeviceError, aDeviceResult, deviceTypeErrors.oValue.errorMessage);
					done();
				});
				
			});
			
			it("Invalid Type", function(done)
			{
				var dtTypeOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', deviceTypeErrors.oType.jsonObject);
				
				reqModule.post(dtTypeOptions, function(aDeviceError, aDeviceResult)
				{
					readInvalidResults(aDeviceError, aDeviceResult, deviceTypeErrors.oType.errorMessage);
					done();
				});
			});
			
			it("Missing Property", function(done)
			{
				var dtPropOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', deviceTypeErrors.oProp.jsonObject);
				
				reqModule.post(dtPropOptions, function(aDeviceError, aDeviceResult)
				{
					readInvalidResults(aDeviceError, aDeviceResult, deviceTypeErrors.oProp.errorMessage);
					done();
				});
			});
			
		});
		
		describe("Invalid Manufacturer (maker)", function(done)
		{
			var manufacturerErrors = null;
			
			it("Errors Defined", function(done)
			{
				manufacturerErrors = rioCommon.callInvalidManufacturerObject(commonJsonObjectsFile.crudDevice, true);
				done();
			});
			
			
			it("Unknown Manufacturer", function(done)
			{
				var maValueOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', manufacturerErrors.oValue.jsonObject);
				
				reqModule.post(maValueOptions, function(aManufacturerError, aManufacturerResult)
				{
					readInvalidResults(aManufacturerError, aManufacturerResult, manufacturerErrors.oValue.errorMessage);
					done();
				});
			});
			
			it("Invalid Value Type", function(done)
			{
				var maTypeOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', manufacturerErrors.oType.jsonObject);
				
				reqModule.post(maTypeOptions, function(aManufacturerError, aManufacturerResult)
				{
					readInvalidResults(aManufacturerError, aManufacturerResult, manufacturerErrors.oType.errorMessage);
					done();
				});
				
			});
			
			
			it("Missing Property", function(done)
			{
				var maPropOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', manufacturerErrors.oProp.jsonObject);
				
				reqModule.post(maPropOptions, function(aManufacturerError, aManufacturerResult)
				{
					readInvalidResults(aManufacturerError, aManufacturerResult, manufacturerErrors.oProp.errorMessage);
					done();
				});
			});
			
			
			
		});
		
		describe("Invalid Model (model)", function()
		{
			var modelErrors = null;
			
			it("Errors Defined", function(done)
			{
				modelErrors = rioCommon.callInvalidModelObject(commonJsonObjectsFile.crudDevice);
				done();
			});
			
			it("Unknown Model", function(done)
			{
				var moValueOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', modelErrors.oValue.jsonObject);
				
				reqModule.post(moValueOptions, function(aModelError, aModelResult)
				{
					readInvalidResults(aModelError, aModelResult, modelErrors.oValue.errorMessage);
					done();
				});
				
			});
			
			it("Invalid Value Type", function(done)
			{
				var moTypeOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', modelErrors.oType.jsonObject);
				
				reqModule.post(moTypeOptions, function(aModelError, aModelResult)
				{
					readInvalidResults(aModelError, aModelResult, modelErrors.oType.errorMessage);
					done();
				});
				
			});
			
			it("Missing Property", function(done)
			{
				var moPropOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', modelErrors.oProp.jsonObject);
				
				reqModule.post(moPropOptions, function(aModelError, aModelResult)
				{
					readInvalidResults(aModelError, aModelResult, modelErrors.oProp.errorMessage);
					done();
				});
				
			});
			
			
			
			
		});
		
		describe("Invalid IP Address (ipAddress)", function()
		{
			var ipErrors = null;
			
			it("Errors Defined", function(done)
			{
				ipErrors = rioCommon.callInvalidIPAddressObject(commonJsonObjectsFile.crudDevice);
				done();
			});
			
			it("Invalid IP Format", function(done)
			{
				var ipFormatOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', ipErrors.oFormat.jsonObject);
				
				reqModule.post(ipFormatOptions, function(aAddressError, aAddressResult)
				{
					readInvalidResults(aAddressError, aAddressResult, ipErrors.oFormat.errorMessage);
					done();
				});
			});
			
			it("Invalid String Value", function(done)
			{
				var ipValueOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', ipErrors.oValue.jsonObject);
				
				reqModule.post(ipValueOptions, function(aAddressError, aAddressResult)
				{
					readInvalidResults(aAddressError, aAddressResult, ipErrors.oValue.errorMessage);
					done();
				});
				
			});
			
			it("Invalid Value Type", function(done)
			{
				var ipTypeOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', ipErrors.oType.jsonObject);
				
				reqModule.post(ipTypeOptions, function(aAddressError, aAddressResult)
				{
					readInvalidResults(aAddressError, aAddressResult, ipErrors.oType.errorMessage);
					done();
				});
			});
			
			it("Missing Property", function(done)
			{
				var ipPropOptions = apiRequestScript.getRequestOptions(urlCreate, 'POST', ipErrors.oProp.jsonObject);
				
				reqModule.post(ipPropOptions, function(aAddressError, aAddressResult)
				{
					readInvalidResults(aAddressError, aAddressResult, ipErrors.oProp.errorMessage);
					done();
				});
			});
			
			
			
			
			
		});
		
	});
}


function handleReadInvalid()
{
	
	describe("Read Invalid (devices/remote-io/testID)", function()
	{
		
		describe("ID", function()
		{
			it("Unknown ID", function(done)
			{
				var getUnknownDeviceErrorString = commonErrorStringsFile.writeKeyNotFoundError(crudUnknownID);
			
				reqModule(urlRudUnknown, function(rUnknownError, rUnknownResult)
				{
					readInvalidResults(rUnknownError, rUnknownResult, getUnknownDeviceErrorString);
					done();
				});
			
			});
			
			it("Invalid ID", function(done)
			{
				var getInvalidIdErrorString = commonErrorStringsFile.writeKeyNotFoundError(crudInvalidID);
			
				reqModule(urlRudInvalid, function(rInvalidError, rInvalidResult)
				{
					readInvalidResults(rInvalidError, rInvalidResult, getInvalidIdErrorString);
					done();
				});
			});
			
			it("Blank ID", function(done)
			{
				var getNullIdErrorString = commonErrorStringsFile.writeKeyNotFoundError(crudNullID);
			
				reqModule(urlRudBlank, function(rBlankError, rBlankResult)
				{
					readInvalidResults(rBlankError, rBlankResult, getNullIdErrorString);
					done();
				});
			});
		
		
		
		});
		
		
	});
}

function handleStatusInvalid()
{
	
	describe("Get Device Status Invalid (devices/status/remote-io/testID)", function()
	{
		
		describe("ID", function()
		{
			
			it("Unknown ID", function(done)
			{
				reqModule(urlStatusUnknown, function(sUnknownError, sUnknownResult)
				{
					readInvalidStatus(sUnknownError, sUnknownResult, crudUnknownID);
					done();
				});
			});
			
			it("Invalid ID", function(done)
			{
				reqModule(urlStatusInvalid, function(sInvalidError, sInvalidResult)
				{
					readInvalidStatus(sInvalidError, sInvalidResult, crudInvalidID);
					done();
				});
			});
			
			it("Blank ID", function(done)
			{
				reqModule(urlStatusBlank, function(sBlankError, sBlankResult)
				{
					readInvalidStatus(sBlankError, sBlankResult, "null");
					done();
				});
			});
			
		});
		
	});
}


function handleDeleteInvalid()
{
	describe("Delete Invalid (devices/remote-io/testID)", function()
	{
		describe("ID", function()
		{
			it("Unknown ID", function(done)
			{
				var unknownDeleteOptions = apiRequestScript.getDeleteOptions(urlRudUnknown, false);
				
				reqModule.delete(unknownDeleteOptions, function(dUnknownError, dUnknownResult)
				{
					readInvalidDelete(dUnknownError, dUnknownResult);
					done();
				});
				
			});
			
			it("Invalid ID", function(done)
			{
				var invalidDeleteOptions = apiRequestScript.getDeleteOptions(urlRudInvalid, false);
				
				reqModule.delete(invalidDeleteOptions, function(dInvalidError, dInvalidResult)
				{
					readInvalidDelete(dInvalidError, dInvalidResult);
					done();
				});
			});
			
			it("Blank ID", function(done)
			{
				var blankDeleteOptions = apiRequestScript.getDeleteOptions(urlRudBlank, false);
				
				reqModule.delete(blankDeleteOptions, function(dBlankError, dBlankResult)
				{
					readInvalidDelete(dBlankError, dBlankResult);
					done();
				});
			});
			
		});
	});
}

function handleUrlDispose()
{
	describe("Dispose API Links", function()
	{
		it("Create", function(done)
		{
			urlCreate = null;
			done();
		});
		
		it("Read, Delete", function(done)
		{
			urlRudUnknown = null;
			urlRudInvalid = null;
			urlRudBlank = null;
			
			done();
		});
		
		it("Status", function(done)
		{
			urlStatusUnknown = null;
			urlStatusInvalid = null;
			urlStatusBlank = null;
			
			done();
		});
		
		
	});
}



function readInvalidResults(iCallbackError, iCallbackObject, expectedError)
{
	var extractedMessage = null;
	
	expect(iCallbackError).to.be.null;
	commonFunctionsFile.testPresent(iCallbackObject);
	
	extractedMessage = apiRequestScript.callReadApiResponseError(iCallbackObject);
	rioCommonInvalid.callValidateGeneralInvalid(extractedMessage, expectedError);
}


function readInvalidStatus(sCallbackError, sCallbackObject, sArgument)
{
	var extractedObject = null;
	
	expect(sCallbackError).to.be.null;
	commonFunctionsFile.testPresent(sCallbackObject);
	
	extractedObject = apiRequestScript.callReadApiResponseObject(sCallbackObject);
	rioCommonInvalid.callValidateStatusInvalid(extractedObject, sArgument);
}

function readInvalidDelete(dCallbackError, dCallbackResult)
{
	var extractedObject = null;
	
	expect(dCallbackError).to.be.null;
	commonFunctionsFile.testPresent(dCallbackResult);
	
	extractedObject = apiRequestScript.callReadApiResponseObject(dCallbackResult);
	deviceCommon.callTestFrontendDeleteSuccessful(extractedObject);
}


exports.callTestDeviceCrudInvalidApis = testDeviceCrudInvalidApis;