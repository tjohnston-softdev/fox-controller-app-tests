const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const subCommonPath = require(commonPaths.subCommonFile);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrorsFile);
const commonJsonObjectsFile = require(commonPaths.commonObjectFile);
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');

const apiCommonFile = require("../sub-requests/common-api");
const deviceFolder = apiPaths.devicesApi;
const deviceRio = apiPaths.rioApiSub;

const modelFunctionsFile = require(subCommonPath.getModelsFile);
const modelIntegrityFile = require(subCommonPath.checkModelIntegrityFile);
const rioCommon = require(subCommonPath.rioCommonFile);
const deviceCommon = require(subCommonPath.deviceCommonFile);

const modelObjectArray = modelFunctionsFile.retrieveAllSupportedModels();


var rioList = null;
var testID = null;
var localModify = null;


function testDeviceCrudApis()
{
	describe("Device CRUD APIs (devices)", function()
	{
		handleSupportedModels();
		handleDeviceDefaultValues();
		handleBeforeListTest();
		handleCreateDeviceTest();
		handleUpdateAddTest();
		handleReadDeviceTest();
		handleDeviceStatusTest();
		handleUpdateDeviceTest();
		handleUpdateReviewTest();
		handleDeleteFlagTest();
		handleDeleteObjectTest();
		handleUpdateDeleteTest();
		handleVariableDispose();
	});
}

function handleSupportedModels()
{
	describe("Supported Models", function()
	{
		it("Retrieve Function Called", function(done)
		{
			expect(modelObjectArray).to.not.be.undefined;
			done();
		});
		
		it("Retrieve Successful", function(done)
		{
			commonFunctionsFile.testPresent(modelObjectArray);
			commonFunctionsFile.testArray(modelObjectArray);
			done();
		});
		
	});
}



function handleDeviceDefaultValues()
{
	describe("Device Defaults (devices/defaults)", function()
	{
		var deviceArrayLists = null;
		
		var defaultsUrl = null;
		var defaultsError = null;
		var defaultsReturn = null;
		var defaultsRead = null;
		
		it("Manufacturer Model Lists Retrieved", function(done)
		{
			deviceArrayLists = modelFunctionsFile.retrieveManufacturerModels(modelObjectArray);
			done();
		});
		
		
		it("Request Made", function(done)
		{
			defaultsUrl = apiRequestScript.callWriteApiUrl(deviceFolder, "defaults");
			
			reqModule(defaultsUrl, function(dError, dResult)
			{
				defaultsReturn = dResult;
				defaultsError = dError;
				done();
			});
			
			
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(defaultsReturn);
			commonFunctionsFile.testNull(defaultsError);
			done();
		});
		
		it("Results Read", function(done)
		{
			defaultsRead = apiRequestScript.callReadApiResponseObject(defaultsReturn);
			done();
		});
		
		
		it("Object Returned", function(done)
		{
			commonFunctionsFile.testPresent(defaultsRead);
			commonFunctionsFile.testType(defaultsRead, 'object');
			done();
		});
		
		it("Supported Device Types (deviceTypes)", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(defaultsRead, 'deviceTypes');
			commonFunctionsFile.testArray(defaultsRead.deviceTypes);
			commonFunctionsFile.testAllElements(defaultsRead.deviceTypes, 'string');
			expect(defaultsRead.deviceTypes).to.deep.equal(["Remote IO","Motor Drive"]);
			
			done();
		});
		
		
		it("Manufacturers (rioMakers)", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(defaultsRead, 'rioMakers');
			commonFunctionsFile.testArray(defaultsRead.rioMakers);
			commonFunctionsFile.testAllElements(defaultsRead.rioMakers, 'string');
			expect(defaultsRead.rioMakers).to.deep.equal(deviceArrayLists.manufacturers);
			
			done();
		});
		
		it("Models (rioModelTypes)", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(defaultsRead, 'rioModelTypes');
			commonFunctionsFile.testArray(defaultsRead.rioModelTypes);
			commonFunctionsFile.testAllElements(defaultsRead.rioModelTypes, 'string');
			expect(defaultsRead.rioModelTypes).to.deep.equal(deviceArrayLists.models);
			
			done();
		});
		
	});
}



function handleBeforeListTest()
{
	describe("List Remote IO Devices (devices/remote-io)", function()
	{
		var beforeListUrl = null;
		var beforeListReturn = null;
		var beforeListError = null;
		
		it("Request Made", function(done)
		{
			beforeListUrl = apiRequestScript.callWriteApiUrl(deviceFolder, deviceRio);
			
			reqModule(beforeListUrl, function(listError, listResult)
			{
				beforeListReturn = listResult;
				beforeListError = listError;
				done();
			});
			
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(beforeListReturn);
			commonFunctionsFile.testNull(beforeListError);
			done();
		});
		
		it("Results Read", function(done)
		{
			rioList = apiRequestScript.callReadApiResponseArray(beforeListReturn);
			done();
		});
		
		it("Device Array Returned", function(done)
		{
			commonFunctionsFile.testArrayDynamic(rioList, -1);
			done();
		});
		
		it("All Elements Objects", function(done)
		{
			commonFunctionsFile.testAllElements(rioList, 'object');
			done();
		});
		
		it("Object Structures Valid", function(done)
		{
			rioCommon.callTestDeviceArrayStructure(rioList);
			done();
		});
		
		it("Referental Integrity", function(done)
		{
			modelIntegrityFile.checkRefIntegrity(rioList, modelObjectArray);
			done();
		});
		
		
	});
}


function handleCreateDeviceTest()
{
	describe("Create Remote IO Device (devices/remote-io)", function()
	{
		
		describe("Valid Device Object", function()
		{
			var createUrl = null;
			var createOptions = null;
			var createError = null;
			var createReturn = null;
			var createRead = null;
			
			it("Request Made", function(done)
			{
				createUrl = apiRequestScript.callWriteApiUrl(deviceFolder, deviceRio);
				createOptions = apiRequestScript.getRequestOptions(createUrl, 'POST', commonJsonObjectsFile.crudDevice);
				
				reqModule.post(createOptions, function(addError, addResult)
				{
					createError = addError;
					createReturn = addResult;
					done();
				});
			});
			
			it("Request Successful", function(done)
			{
				commonFunctionsFile.testPresent(createReturn);
				commonFunctionsFile.testNull(createError);
				done();
			});
			
			it("Results Read", function(done)
			{
				createRead = apiRequestScript.callReadApiResponseObject(createReturn);
				done();
			});
			
			it("Object Returned", function(done)
			{
				commonFunctionsFile.testPresent(createRead);
				commonFunctionsFile.testType(createRead, 'object');
				done();
			});
			
			it("Correct Properties", function(done)
			{
				deviceCommon.callTestAddModifyReturnProperties(createRead);
				done();
			});
			
			it("Correct Contents", function(done)
			{
				deviceCommon.callTestAddModifyReturnContents(createRead);
				testID = createRead.id;
				done();
			});
			
			it("Test ID Retained", function(done)
			{
				commonFunctionsFile.testPresent(testID);
				commonFunctionsFile.testString(testID);
				done();
			});
			
		});
		
		
	});
}


function handleUpdateAddTest()
{
	describe("Device List Updated - Added", function()
	{
		var addUpdateUrl = null;
		var addUpdateError = null;
		var addUpdateReturn = null;
		var addUpdateRead = null;
		
		it("Request Made", function(done)
		{
			addUpdateUrl = apiRequestScript.callWriteApiUrl(deviceFolder, deviceRio);
			
			reqModule(addUpdateUrl, function(addListError, addListResult)
			{
				addUpdateReturn = addListResult;
				addUpdateError = addListError;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(addUpdateReturn);
			commonFunctionsFile.testNull(addUpdateError);
			done();
		});
		
		it("Results Read", function(done)
		{
			addUpdateRead = apiRequestScript.callReadApiResponseArray(addUpdateReturn);
			done();
		});
		
		it("Valid Return", function(done)
		{
			rioCommon.callTestDeviceListValidReturnPopulated(addUpdateRead);
			done();
		});
		
		it("Test Device Listed", function(done)
		{
			var listFlag = rioCommon.callTestIdListed(addUpdateRead, testID);
			commonFunctionsFile.testTrue(listFlag);
			done();
		});
		
	});
}


function handleReadDeviceTest()
{
	describe("Read Remote IO Device (devices/remote-io/testID)", function()
	{
		var deviceUrl = null;
		var deviceError = null;
		var deviceReturn = null;
		var deviceRead = null;
		
		it("Request Made", function(done)
		{
			deviceUrl = deviceCommon.callGetRudUrl(testID);
			
			reqModule(deviceUrl, function(getError, getResult)
			{
				deviceReturn = getResult;
				deviceError = getError;
				done();
			});
			
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testNull(deviceError);
			commonFunctionsFile.testPresent(deviceReturn);
			done();
		});
		
		it("Results Read", function(done)
		{
			deviceRead = apiRequestScript.callReadApiResponseObject(deviceReturn);
			done();
		});
		
		it("Object Returned", function(done)
		{
			commonFunctionsFile.testPresent(deviceRead);
			commonFunctionsFile.testType(deviceRead, 'object');
			done();
		});
		
		it("Object Structure Valid", function(done)
		{
			rioCommon.callTestDeviceObjectStructure(deviceRead);
			done();
		});
		
		it("Matching IDs", function(done)
		{
			expect(deviceRead.id).to.equal(testID);
			done();
		});
		
		it("Matching Contents", function(done)
		{
			rioCommon.callCompareGetDeviceToOriginal(deviceRead, commonJsonObjectsFile.crudDevice);
			done();
		});
		
		
	});
}



function handleDeviceStatusTest()
{
	describe("Get Remote IO Device Status (devices/status/remote-io/testID)", function()
	{
		var statusUrl = null;
		var statusError = null;
		var statusReturn = null;
		var statusRead = null;
		
		it("Request Made", function(done)
		{
			statusUrl = deviceCommon.callGetStatusUrl(testID);
			
			reqModule(statusUrl, function(sError, sResult)
			{
				statusReturn = sResult;
				statusError = sError;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(statusReturn);
			commonFunctionsFile.testNull(statusError);
			done();
		});
		
		it("Results Read", function(done)
		{
			statusRead = apiRequestScript.callReadApiResponseObject(statusReturn);
			done();
		});
		
		it("Status Object Returned", function(done)
		{
			commonFunctionsFile.testPresent(statusRead);
			commonFunctionsFile.testType(statusRead, 'object');
			done();
		});
		
		it("Object Structure Valid", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(statusRead, 'id');
			commonFunctionsFile.testObjectPropertyDefinition(statusRead, 'isRunning');
			
			commonFunctionsFile.testString(statusRead.id);
			commonFunctionsFile.testType(statusRead.isRunning, 'boolean');
			
			done();
		});
		
		it("No Communication Errors", function(done)
		{
			commonFunctionsFile.testObjectPropertyAbsent(statusRead, 'commsError');
			done();
		});
		
		it("Matching IDs", function(done)
		{
			expect(statusRead.id).to.equal(testID);
			done();
		});
		
	});
}


function handleUpdateDeviceTest()
{
	describe("Update Remote IO Device (devices/remote-io/testID)", function()
	{
		var modifyObject = null;
		var modifyUrl = null;
		var modifyOptions = null;
		var modifyError = null;
		var modifyReturn = null;
		var modifyRead = null;
		
		
		it("Modification Defined", function(done)
		{
			modifyObject = commonFunctionsFile.cloneObject(commonJsonObjectsFile.modifiedDevice);
			modifyObject.id = testID;
			done();
		});
		
		
		it("Request Made", function(done)
		{
			modifyUrl = deviceCommon.callGetRudUrl(testID);
			modifyOptions = apiRequestScript.getRequestOptions(modifyUrl, 'PUT', modifyObject);
			
			reqModule.put(modifyOptions, function(mError, mResult)
			{
				modifyError = mError;
				modifyReturn = mResult;
				done();
			});
			
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(modifyReturn);
			commonFunctionsFile.testNull(modifyError);
			done();
		});
		
		it("Results Read", function(done)
		{
			modifyRead = apiRequestScript.callReadApiResponseObject(modifyReturn);
			done();
		});
		
		it("Object Returned", function(done)
		{
			commonFunctionsFile.testPresent(modifyRead);
			commonFunctionsFile.testType(modifyRead, 'object');
			done();
		});
		
		it("Correct Properties", function(done)
		{
			deviceCommon.callTestAddModifyReturnProperties(modifyRead);
			done();
		});
		
		it("Correct Contents", function(done)
		{
			deviceCommon.callTestAddModifyReturnContents(modifyRead);
			done();
		});
		
		it("Object IDs Match", function(done)
		{
			expect(modifyRead.id).to.equal(testID);
			done();
		});
		
		it("Modifications Stored", function(done)
		{
			localModify = modifyObject;
			
			commonFunctionsFile.testPresent(localModify);
			commonFunctionsFile.testType(localModify, 'object');
			expect(localModify).to.equal(modifyObject);
			
			done();
		});
		
		
		
	});
}


function handleUpdateReviewTest()
{
	describe("Review Changes", function()
	{
		var reviewUrl = null;
		var reviewError = null;
		var reviewReturn = null;
		var reviewRead = null;
		
		it("Request Made", function(done)
		{
			reviewUrl = deviceCommon.callGetRudUrl(testID);
			
			reqModule(reviewUrl, function(getError, getResult)
			{
				reviewReturn = getResult;
				reviewError = getError;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(reviewReturn);
			commonFunctionsFile.testNull(reviewError);
			done();
		});
		
		it("Results Read", function(done)
		{
			reviewRead = apiRequestScript.callReadApiResponseObject(reviewReturn);
			done();
		});
		
		it("Return Valid", function(done)
		{
			commonFunctionsFile.testPresent(reviewRead);
			commonFunctionsFile.testType(reviewRead, 'object');
			
			rioCommon.callTestDeviceObjectStructure(reviewRead);
			expect(reviewRead.id).to.equal(testID);
			
			done();
		});
		
		it("Modifications Successful", function(done)
		{	
			rioCommon.callCompareGetDeviceToOriginal(reviewRead, localModify);
			done();
		});
		
		
		
		
	});
}



function handleDeleteFlagTest()
{
	describe("Flag Remote IO Device Deleted (devices/remote-io/testID)", function()
	{
		var flagObject = null;
		var flagUrl = null;
		var flagError = null;
		var flagReturn = null;
		var flagRead = null;
		
		it("Request Made", function(done)
		{
			flagUrl = deviceCommon.callGetRudUrl(testID);
			flagObject = apiRequestScript.getDeleteOptions(flagUrl, false);
			
			reqModule.delete(flagObject, function(dFlagError, dFlagResult)
			{
				flagError = dFlagError;
				flagReturn = dFlagResult;
				done();
			});
			
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(flagReturn);
			commonFunctionsFile.testNull(flagError);
			done();
		});
		
		it("Results Read", function(done)
		{
			flagRead = apiRequestScript.callReadApiResponseObject(flagReturn);
			done();
		});
		
		it("Object Returned", function(done)
		{
			commonFunctionsFile.testPresent(flagRead);
			commonFunctionsFile.testType(flagRead, 'object');
			done();
		});
		
		it("Correct Return Property", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(flagRead, 'success');
			commonFunctionsFile.testObjectPropertyContent(flagRead, 'success', 'boolean');
			done();
		});
		
		it("Delete Flag Successful", function(done)
		{
			commonFunctionsFile.testTrue(flagRead.success);
			done();
		});
		
	});
}


function handleDeleteObjectTest()
{
	var deleteObject = null;
	var deleteUrl = null;
	var deleteError = null;
	var deleteReturn = null;
	var deleteRead = null;
	
	describe("Delete Remote IO Device Object Permanately", function()
	{
		
		
		it("Request Made", function(done)
		{
			deleteUrl = deviceCommon.callGetRudUrl(testID);
			deleteObject = apiRequestScript.getDeleteOptions(deleteUrl, false);
		
			reqModule.delete(deleteObject, function(dError, dResult)
			{
				deleteError = dError;
				deleteReturn = dResult;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(deleteReturn);
			commonFunctionsFile.testNull(deleteError);
			done();
		});
		
		it("Results Read", function(done)
		{
			deleteRead = apiRequestScript.callReadApiResponseObject(deleteReturn);
			done();
		});
		
		it("Object Returned", function(done)
		{
			commonFunctionsFile.testPresent(deleteRead);
			commonFunctionsFile.testType(deleteRead, 'object');
			done();
		});
		
		it("Correct Return Property", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(deleteRead, 'success');
			commonFunctionsFile.testObjectPropertyContent(deleteRead, 'success', 'boolean');
			done();
		});
		
		
		it("Delete Object Successful", function(done)
		{
			commonFunctionsFile.testTrue(deleteRead.success);
			done();
		});
		
		
	});
	
	
}



function handleUpdateDeleteTest()
{
	describe("Device List Updated - Deleted", function()
	{
		var deleteUpdateUrl = null;
		var deleteUpdateError = null;
		var deleteUpdateReturn = null;
		var deleteUpdateRead = null;
		
		it("Request Made", function(done)
		{
			deleteUpdateUrl = apiRequestScript.callWriteApiUrl(deviceFolder, deviceRio);
			
			reqModule(deleteUpdateUrl, function(delListError, delListResult)
			{
				deleteUpdateReturn = delListResult;
				deleteUpdateError = delListError;
				done();
			});
			
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(deleteUpdateReturn);
			commonFunctionsFile.testNull(deleteUpdateError);
			done();
		});
		
		it("Results Read", function(done)
		{
			deleteUpdateRead = apiRequestScript.callReadApiResponseArray(deleteUpdateReturn);
			done();
		});
		
		it("Valid Return", function(done)
		{
			rioCommon.callTestDeviceListValidReturnNeutral(deleteUpdateRead);
			done();
		});
		
		it("Test Device Absent", function(done)
		{
			var listFlag = rioCommon.callTestIdListed(deleteUpdateRead, testID);
			commonFunctionsFile.testFalse(listFlag);
			done();
		});
		
		it("Device List Intact", function(done)
		{
			expect(deleteUpdateRead).to.deep.equal(rioList);
			done();
		});
		
		
		
	});
}


function handleVariableDispose()
{
	describe("CRUD Dispose", function()
	{
		
		it("Device List", function(done)
		{
			rioList = null;
			done();
		});
		
		it("Test ID", function(done)
		{
			testID = null;
			done();
		});
		
		it("Modifications", function(done)
		{
			localModify = null;
			done();
		});
		
		
	});
}


exports.callTestDeviceCrudApis = testDeviceCrudApis;