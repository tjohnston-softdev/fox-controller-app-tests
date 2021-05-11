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
				sendCreateRequest("null", objectNullError, done);
			});
			
			
			it("Invalid Object Type", function(done)
			{	
				sendCreateRequest(-1, objectTypeError, done);
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
				var postBody = deviceTypeErrors.oValue.jsonObject;
				var postErrMsg = deviceTypeErrors.oValue.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
				
			});
			
			it("Invalid Type", function(done)
			{
				var postBody = deviceTypeErrors.oType.jsonObject;
				var postErrMsg = deviceTypeErrors.oType.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
			});
			
			it("Missing Property", function(done)
			{
				var postBody = deviceTypeErrors.oProp.jsonObject;
				var postErrMsg = deviceTypeErrors.oProp.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
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
				var postBody = manufacturerErrors.oValue.jsonObject;
				var postErrMsg = manufacturerErrors.oValue.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
			});
			
			it("Invalid Value Type", function(done)
			{
				var postBody = manufacturerErrors.oType.jsonObject;
				var postErrMsg = manufacturerErrors.oType.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
			});
			
			
			it("Missing Property", function(done)
			{
				var postBody = manufacturerErrors.oProp.jsonObject;
				var postErrMsg = manufacturerErrors.oProp.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
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
				var postBody = modelErrors.oValue.jsonObject;
				var postErrMsg = modelErrors.oValue.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
			});
			
			it("Invalid Value Type", function(done)
			{
				var postBody = modelErrors.oType.jsonObject;
				var postErrMsg = modelErrors.oType.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
			});
			
			it("Missing Property", function(done)
			{
				var postBody = modelErrors.oProp.jsonObject;
				var postErrMsg = modelErrors.oProp.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
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
				var postBody = ipErrors.oFormat.jsonObject;
				var postErrMsg = ipErrors.oFormat.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
			});
			
			it("Invalid String Value", function(done)
			{
				var postBody = ipErrors.oValue.jsonObject;
				var postErrMsg = ipErrors.oValue.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
			});
			
			it("Invalid Value Type", function(done)
			{
				var postBody = ipErrors.oType.jsonObject;
				var postErrMsg = ipErrors.oType.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
			});
			
			it("Missing Property", function(done)
			{
				var postBody = ipErrors.oProp.jsonObject;
				var postErrMsg = ipErrors.oProp.errorMessage;
				sendCreateRequest(postBody, postErrMsg, done);
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
				sendReadRequest(urlRudUnknown, unknownErrStr, done);
			});
			
			it("Invalid ID", function(done)
			{
				var invalidErrStr = commonErrorStringsFile.writeKeyNotFoundError(crudInvalidID);
				sendReadRequest(urlRudInvalid, invalidErrStr, done);
			});
			
			it("Blank ID", function(done)
			{
				var nullErrStr = commonErrorStringsFile.writeKeyNotFoundError(null);
				sendReadRequest(urlRudBlank, nullErrStr, done);
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
				sendStatusRequest(urlStatusUnknown, crudUnknownID, done);
			});
			
			it("Invalid ID", function(done)
			{
				sendStatusRequest(urlStatusInvalid, crudInvalidID, done);
			});
			
			it("Blank ID", function(done)
			{
				sendStatusRequest(urlStatusBlank, "null", done);
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
				sendDeleteRequest(urlRudUnknown, done);	
			});
			
			it("Invalid ID", function(done)
			{
				sendDeleteRequest(urlRudInvalid, done);
			});
			
			it("Blank ID", function(done)
			{
				sendDeleteRequest(urlRudBlank, done);
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


function sendCreateRequest(invalidEntry, invalidMsg, createDone)
{
	needle.post(urlCreate, invalidEntry, {json: true}, function(createReqErr, createReqRes)
	{
		readInvalidResults(createReqErr, createReqRes, invalidMsg);
		createDone();
	});
}


function sendReadRequest(readURL, invalidMsg, readDone)
{
	needle.get(readURL, function(readReqErr, readReqRes)
	{
		readInvalidResults(readReqErr, readReqRes, invalidMsg);
		readDone();
	});
}


function sendStatusRequest(statusURL, invalidEntry, statusDone)
{
	var extractedObject = null;
	
	needle.get(statusURL, function(statusReqErr, statusReqRes)
	{
		expect(statusReqErr).to.be.null;
		commonFunctionsFile.testPresent(statusReqRes);
		expect(statusReqRes).to.be.an("object");
		extractedObject = apiRequestScript.callReadApiResponseObject(statusReqRes);
		rioCommonInvalid.callValidateStatusInvalid(extractedObject, invalidEntry);
		
		statusDone();
	});
}


function sendDeleteRequest(deleteURL, deleteDone)
{
	var delOpts = apiRequestScript.getDeleteOptions(false);
	var extractedObject = null;
	
	needle.delete(deleteURL, null, delOpts, function(deleteReqErr, deleteReqRes)
	{
		expect(deleteReqErr).to.be.null;
		commonFunctionsFile.testPresent(deleteReqRes);
		expect(deleteReqRes).to.be.an("object");
		extractedObject = apiRequestScript.callReadApiResponseObject(deleteReqRes);
		deviceCommon.callTestFrontendDeleteSuccessful(extractedObject);
		
		deleteDone();
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



module.exports =
{
	callTestDeviceCrudInvalidApis: testDeviceCrudInvalidApis
};