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

const apiCommonFile = require("../sub-requests/common-api");
const deviceCommon = require(commonPaths.deviceCommonFile);
const deviceFolder = apiPaths.devicesApi;
const deviceRio = apiPaths.rioApiSub;

const crudUnknownID = commonJsonObjectsFile.unknownID;
const crudInvalidID = "-1";

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
			urlRudBlank = deviceCommon.callGetRudUrl(null);
			
			done();
		});
		
		it("Status", function(done)
		{
			urlStatusUnknown = deviceCommon.callGetStatusUrl(crudUnknownID);
			urlStatusInvalid = deviceCommon.callGetStatusUrl(crudInvalidID);
			urlStatusBlank = deviceCommon.callGetStatusUrl(null);
			
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
				needle.post(urlCreate, "null", {json: true}, function(aNullError, aNullResult)
				{
					console.log(objectNullError);
					readInvalidResults(aNullError, aNullResult, objectNullError);
					done();
				});
			});
			
			
			it("Invalid Object Type", function(done)
			{
				needle.post(urlCreate, -1, {json: true}, function(aNullError, aNullResult)
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
				var invalidEntry = deviceTypeErrors.oValue.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aDeviceError, aDeviceResult)
				{
					readInvalidResults(aDeviceError, aDeviceResult, deviceTypeErrors.oValue.errorMessage);
					done();
				});
				
			});
			
			it("Invalid Type", function(done)
			{
				var invalidEntry = deviceTypeErrors.oType.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aDeviceError, aDeviceResult)
				{
					readInvalidResults(aDeviceError, aDeviceResult, deviceTypeErrors.oType.errorMessage);
					done();
				});
			});
			
			it("Missing Property", function(done)
			{
				var invalidEntry = deviceTypeErrors.oProp.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aDeviceError, aDeviceResult)
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
				var invalidEntry = manufacturerErrors.oValue.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aManufacturerError, aManufacturerResult)
				{
					readInvalidResults(aManufacturerError, aManufacturerResult, manufacturerErrors.oValue.errorMessage);
					done();
				});
			});
			
			it("Invalid Value Type", function(done)
			{
				var invalidEntry = manufacturerErrors.oType.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aManufacturerError, aManufacturerResult)
				{
					readInvalidResults(aManufacturerError, aManufacturerResult, manufacturerErrors.oType.errorMessage);
					done();
				});
				
			});
			
			
			it("Missing Property", function(done)
			{
				var invalidEntry = manufacturerErrors.oProp.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aManufacturerError, aManufacturerResult)
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
				var invalidEntry = modelErrors.oValue.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aModelError, aModelResult)
				{
					readInvalidResults(aModelError, aModelResult, modelErrors.oValue.errorMessage);
					done();
				});
				
			});
			
			it("Invalid Value Type", function(done)
			{
				var invalidEntry = modelErrors.oType.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aModelError, aModelResult)
				{
					readInvalidResults(aModelError, aModelResult, modelErrors.oType.errorMessage);
					done();
				});
				
			});
			
			it("Missing Property", function(done)
			{
				var invalidEntry = modelErrors.oProp.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aModelError, aModelResult)
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
				var invalidEntry = ipErrors.oFormat.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aAddressError, aAddressResult)
				{
					readInvalidResults(aAddressError, aAddressResult, ipErrors.oFormat.errorMessage);
					done();
				});
			});
			
			it("Invalid String Value", function(done)
			{
				var invalidEntry = ipErrors.oValue.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aAddressError, aAddressResult)
				{
					readInvalidResults(aAddressError, aAddressResult, ipErrors.oValue.errorMessage);
					done();
				});
				
			});
			
			it("Invalid Value Type", function(done)
			{
				var invalidEntry = ipErrors.oType.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aAddressError, aAddressResult)
				{
					readInvalidResults(aAddressError, aAddressResult, ipErrors.oType.errorMessage);
					done();
				});
			});
			
			it("Missing Property", function(done)
			{
				var invalidEntry = ipErrors.oProp.jsonObject;
				
				needle.post(urlCreate, invalidEntry, {json: true}, function(aAddressError, aAddressResult)
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
				var unknownErrStr = commonErrorStringsFile.writeKeyNotFoundError(crudUnknownID);
			
				needle.get(urlRudUnknown, function(rUnknownError, rUnknownResult)
				{
					readInvalidResults(rUnknownError, rUnknownResult, unknownErrStr);
					done();
				});
			
			});
			
			it("Invalid ID", function(done)
			{
				var invalidErrStr = commonErrorStringsFile.writeKeyNotFoundError(crudInvalidID);
			
				needle.get(urlRudInvalid, function(rInvalidError, rInvalidResult)
				{
					readInvalidResults(rInvalidError, rInvalidResult, invalidErrStr);
					done();
				});
			});
			
			it("Blank ID", function(done)
			{
				var nullErrStr = commonErrorStringsFile.writeKeyNotFoundError(null);
			
				needle.get(urlRudBlank, function(rBlankError, rBlankResult)
				{
					readInvalidResults(rBlankError, rBlankResult, nullErrStr);
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
				needle.get(urlStatusUnknown, function(sUnknownError, sUnknownResult)
				{
					readInvalidStatus(sUnknownError, sUnknownResult, crudUnknownID);
					done();
				});
			});
			
			it("Invalid ID", function(done)
			{
				needle.get(urlStatusInvalid, function(sInvalidError, sInvalidResult)
				{
					readInvalidStatus(sInvalidError, sInvalidResult, crudInvalidID);
					done();
				});
			});
			
			it("Blank ID", function(done)
			{
				needle.get(urlStatusBlank, function(sBlankError, sBlankResult)
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
				var unknownOpts = apiRequestScript.getDeleteOptions(urlRudUnknown, false);
				
				needle.delete(urlRudUnknown, null, unknownOpts.headers, function(unknownErr, unknownRes)
				{
					readInvalidDelete(unknownErr, unknownRes);
					done();
				});
				
			});
			
			it("Invalid ID", function(done)
			{
				var invalidOpts = apiRequestScript.getDeleteOptions(urlRudInvalid, false);
				
				needle.delete(urlRudInvalid, null, invalidOpts.headers, function(invalidErr, invalidRes)
				{
					readInvalidDelete(invalidErr, invalidRes);
					done();
				});
			});
			
			it("Blank ID", function(done)
			{
				var blankOpts = apiRequestScript.getDeleteOptions(urlRudBlank, false);
				
				needle.delete(urlRudBlank, null, blankOpts.headers, function(blankErr, blankRes)
				{
					readInvalidDelete(blankErr, blankRes);
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


function readInvalidResults(callbackErr, callbackObject, expectedError)
{
	var extractedMessage = null;
	
	expect(callbackErr).to.be.null;
	commonFunctionsFile.testPresent(callbackObject);
	expect(callbackObject).to.be.an("object");
	
	extractedMessage = apiRequestScript.callReadApiResponseError(callbackObject);
	rioCommonInvalid.callValidateGeneralInvalid(extractedMessage, expectedError);
}


function readInvalidStatus(callbackErr, callbackObject, sArgument)
{
	var extractedObject = null;
	
	expect(callbackErr).to.be.null;
	commonFunctionsFile.testPresent(callbackObject);
	expect(callbackObject).to.be.an("object");
	
	extractedObject = apiRequestScript.callReadApiResponseObject(callbackObject);
	rioCommonInvalid.callValidateStatusInvalid(extractedObject, sArgument);
}

function readInvalidDelete(callbackErr, callbackObject)
{
	var extractedObject = null;
	
	expect(callbackErr).to.be.null;
	commonFunctionsFile.testPresent(callbackObject);
	expect(callbackObject).to.be.an("object");
	
	extractedObject = apiRequestScript.callReadApiResponseObject(callbackObject);
	deviceCommon.callTestFrontendDeleteSuccessful(extractedObject);
}

module.exports =
{
	callTestDeviceCrudInvalidApis: testDeviceCrudInvalidApis
};