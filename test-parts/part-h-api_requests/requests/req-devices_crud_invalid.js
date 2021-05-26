const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiRequestScript = require(commonPaths.requestApi);
const rioInvalid = require(commonPaths.rioCommonInvalidFile);
const httpRequests = require(commonPaths.httpRequestsFile);

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
				httpRequests.postInvalid(urlCreate, "null", objectNullError, done);
			});
			
			
			it("Invalid Object Type", function(done)
			{	
				httpRequests.postInvalid(urlCreate, -1, objectTypeError, done);
			});
			
		});
		
		describe("Invalid Device Type (deviceType)", function()
		{
			var deviceTypeErrors = null;
			
			it("Errors Defined", function(done)
			{
				deviceTypeErrors = rioInvalid.getDeviceType(commonJsonObjectsFile.crudDevice);
				done();
			});
			
			it("Invalid Value", function(done)
			{
				var invalidBody = deviceTypeErrors.valueCase.jsonObject;
				var postErrMsg = deviceTypeErrors.valueCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
			});
			
			it("Invalid Type", function(done)
			{
				var invalidBody = deviceTypeErrors.typeCase.jsonObject;
				var postErrMsg = deviceTypeErrors.typeCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
			});
			
			it("Missing Property", function(done)
			{
				var invalidBody = deviceTypeErrors.propCase.jsonObject;
				var postErrMsg = deviceTypeErrors.propCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
			});
			
		});
		
		describe("Invalid Manufacturer (maker)", function(done)
		{
			var manufacturerErrors = null;
			
			it("Errors Defined", function(done)
			{
				manufacturerErrors = rioInvalid.getManufacturer(commonJsonObjectsFile.crudDevice, true);
				done();
			});
			
			
			it("Unknown Manufacturer", function(done)
			{
				var invalidBody = manufacturerErrors.valueCase.jsonObject;
				var postErrMsg = manufacturerErrors.valueCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
			});
			
			it("Invalid Value Type", function(done)
			{
				var invalidBody = manufacturerErrors.typeCase.jsonObject;
				var postErrMsg = manufacturerErrors.typeCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
			});
			
			
			it("Missing Property", function(done)
			{
				var invalidBody = manufacturerErrors.propCase.jsonObject;
				var postErrMsg = manufacturerErrors.propCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
			});
			
		});
		
		describe("Invalid Model (model)", function()
		{
			var modelErrors = null;
			
			it("Errors Defined", function(done)
			{
				modelErrors = rioInvalid.getModel(commonJsonObjectsFile.crudDevice);
				done();
			});
			
			it("Unknown Model", function(done)
			{
				var invalidBody = modelErrors.valueCase.jsonObject;
				var postErrMsg = modelErrors.valueCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
			});
			
			it("Invalid Value Type", function(done)
			{
				var invalidBody = modelErrors.typeCase.jsonObject;
				var postErrMsg = modelErrors.typeCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
			});
			
			it("Missing Property", function(done)
			{
				var invalidBody = modelErrors.propCase.jsonObject;
				var postErrMsg = modelErrors.propCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
			});
		});
		
		
		describe("Invalid IP Address (ipAddress)", function()
		{
			var ipErrors = null;
			
			it("Errors Defined", function(done)
			{
				ipErrors = rioInvalid.getIpAddress(commonJsonObjectsFile.crudDevice);
				done();
			});
			
			it("Invalid IP Format", function(done)
			{
				var invalidBody = ipErrors.formatCase.jsonObject;
				var postErrMsg = ipErrors.formatCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
			});
			
			it("Invalid String Value", function(done)
			{
				var invalidBody = ipErrors.valueCase.jsonObject;
				var postErrMsg = ipErrors.valueCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
			});
			
			it("Invalid Value Type", function(done)
			{
				var invalidBody = ipErrors.typeCase.jsonObject;
				var postErrMsg = ipErrors.typeCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
			});
			
			it("Missing Property", function(done)
			{
				var invalidBody = ipErrors.propCase.jsonObject;
				var postErrMsg = ipErrors.propCase.errorMessage;
				httpRequests.postInvalid(urlCreate, invalidBody, postErrMsg, done);
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
				httpRequests.getInvalid(urlRudUnknown, unknownErrStr, done);
			});
			
			it("Invalid ID", function(done)
			{
				var invalidErrStr = commonErrorStringsFile.writeKeyNotFoundError(crudInvalidID);
				httpRequests.getInvalid(urlRudInvalid, invalidErrStr, done);
			});
			
			it("Blank ID", function(done)
			{
				var nullErrStr = commonErrorStringsFile.writeKeyNotFoundError(null);
				httpRequests.getInvalid(urlRudBlank, nullErrStr, done);
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
				httpRequests.statusInvalid(urlStatusUnknown, crudUnknownID, done);
			});
			
			it("Invalid ID", function(done)
			{
				httpRequests.statusInvalid(urlStatusInvalid, crudInvalidID, done);
			});
			
			it("Blank ID", function(done)
			{
				httpRequests.statusInvalid(urlStatusBlank, "null", done);
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
				httpRequests.deleteInvalid(urlRudUnknown, done);
			});
			
			it("Invalid ID", function(done)
			{
				httpRequests.deleteInvalid(urlRudInvalid, done);
			});
			
			it("Blank ID", function(done)
			{
				httpRequests.deleteInvalid(urlRudBlank, done);
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


module.exports = testDeviceCrudInvalidApis;