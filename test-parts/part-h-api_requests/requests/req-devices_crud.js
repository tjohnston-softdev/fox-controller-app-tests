const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const needle = require("needle");

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiRequestScript = require(commonPaths.requestApi);

const apiCommonFile = require("../sub-requests/common-api");
const deviceFolder = apiPaths.devicesApi;
const deviceRio = apiPaths.rioApiSub;

const modelFunctionsFile = require(commonPaths.getModelsFile);
const modelIntegrityFile = require(commonPaths.checkModelIntegrityFile);
const rioCommon = require(commonPaths.rioCommonFile);
const deviceCommon = require(commonPaths.deviceCommonFile);

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
		/*
		handleUpdateAddTest();
		handleReadDeviceTest();
		handleDeviceStatusTest();
		handleUpdateDeviceTest();
		handleUpdateReviewTest();
		handleDeleteFlagTest();
		handleDeleteObjectTest();
		handleUpdateDeleteTest();
		*/
		handleVariableDispose();
	});
}

function handleSupportedModels()
{
	describe("Supported Models", function()
	{
		it("Retrieved Successfully", function(done)
		{
			commonFunctionsFile.testPresent(modelObjectArray);
			commonFunctionsFile.testArrayPopulated(modelObjectArray);
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
		var reqErr = null;
		var reqReturn = null;
		var defaultsRead = null;
		
		it("Manufacturer Model Lists Retrieved", function(done)
		{
			deviceArrayLists = modelFunctionsFile.retrieveManufacturerModels(modelObjectArray);
			done();
		});
		
		
		it("Request Made", function(done)
		{
			defaultsUrl = apiRequestScript.callWriteApiUrl(deviceFolder, "defaults");
			
			needle.get(defaultsUrl, function(defaultReqErr, defaultReqRes)
			{
				reqErr = defaultReqErr;
				reqReturn = defaultReqRes;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			expect(reqErr).to.be.null;
			commonFunctionsFile.testPresent(reqReturn);
			expect(reqReturn).to.be.an("object");
			apiRequestScript.callValidateApiResponse(reqReturn);
			defaultsRead = reqReturn.body;
			done();
		});
		
		
		it("Results Read", function(done)
		{
			defaultsRead = apiRequestScript.callReadApiResponseObject(reqReturn);
			done();
		});
		
		
		it("Object Returned", function(done)
		{
			commonFunctionsFile.testPresent(defaultsRead);
			expect(defaultsRead).to.be.an("object");
			done();
		});
		
		it("Supported Device Types (deviceTypes)", function(done)
		{
			var correctTypes = ["Remote IO", "Motor Drive"];
			
			commonFunctionsFile.testObjectPropertyDefinition(defaultsRead, 'deviceTypes');
			commonFunctionsFile.testArrayPopulated(defaultsRead.deviceTypes);
			expect(defaultsRead.deviceTypes).to.deep.equal(correctTypes);
			
			done();
		});
		
		
		it("Manufacturers (rioMakers)", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(defaultsRead, 'rioMakers');
			commonFunctionsFile.testArrayPopulated(defaultsRead.rioMakers);
			expect(defaultsRead.rioMakers).to.deep.equal(deviceArrayLists.manufacturers);
			
			done();
		});
		
		it("Models (rioModelTypes)", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(defaultsRead, 'rioModelTypes');
			commonFunctionsFile.testArrayPopulated(defaultsRead.rioModelTypes);
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
		var beforeErr = null;
		var beforeReturn = null;
		
		it("Request Made", function(done)
		{
			beforeListUrl = apiRequestScript.callWriteApiUrl(deviceFolder, deviceRio);
			
			needle.get(beforeListUrl, function(folderListErr, folderListRes)
			{
				beforeErr = folderListErr;
				beforeReturn = folderListRes;
				done();
			});
			
		});
		
		it("Request Successful", function(done)
		{
			expect(beforeErr).to.be.null;
			commonFunctionsFile.testPresent(beforeReturn);
			expect(beforeReturn).to.be.an("object");
			apiRequestScript.callValidateApiResponse(beforeReturn);
			rioList = beforeReturn.body;
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
			modelIntegrityFile.checkIntegrity(rioList, modelObjectArray);
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
			var createErr = null;
			var createReturn = null;
			var createRead = null;
			
			it("Request Made", function(done)
			{
				createUrl = apiRequestScript.callWriteApiUrl(deviceFolder, deviceRio);
				
				needle.post(createUrl, commonJsonObjectsFile.crudDevice, function(addError, addResult)
				{
					createErr = addError;
					createReturn = addResult;
					done();
				});
			});
			
			it("Request Successful", function(done)
			{
				expect(createErr).to.be.null;
				commonFunctionsFile.testPresent(createReturn);
				expect(createReturn).to.be.an("object");
				apiRequestScript.callValidateApiResponse(createReturn);
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
				expect(createRead).to.be.an("object");
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
		var addUpdateRead = null;
		
		it("Request Made", function(done)
		{
			addUpdateUrl = apiRequestScript.callWriteApiUrl(deviceFolder, deviceRio);
			
			needle.get(addUpdateUrl, function(addListError, addListResult)
			{
				expect(addListError).to.be.null;
				commonFunctionsFile.testPresent(addListResult);
				addUpdateRead = addListResult.body;
				done();
			});
		});
		
		it("Valid Return", function(done)
		{
			rioCommon.callTestDeviceListValidReturnPopulated(addUpdateRead);
			done();
		});
		
		it("Test Device Listed", function(done)
		{
			var listFlag = rioCommon.callTestIdListed(addUpdateRead, testID);
			expect(listFlag).to.be.true;
			done();
		});
		
	});
}


function handleReadDeviceTest()
{
	describe("Read Remote IO Device (devices/remote-io/testID)", function()
	{
		var deviceUrl = null;
		var deviceRead = null;
		
		it("Request Made", function(done)
		{
			deviceUrl = deviceCommon.callGetRudUrl(testID);
			
			needle.get(deviceUrl, function(getError, getResult)
			{
				expect(getError).to.be.null;
				commonFunctionsFile.testPresent(getResult);
				deviceRead = apiRequestScript.callReadApiResponseObject(getResult);
				done();
			});
			
		});
		
		it("Object Returned", function(done)
		{
			commonFunctionsFile.testPresent(deviceRead);
			expect(deviceRead).to.be.an("object");
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
		var statusRead = null;
		
		it("Request Made", function(done)
		{
			statusUrl = deviceCommon.callGetStatusUrl(testID);
			
			needle.get(statusUrl, function(statusReqErr, statusReqRes)
			{
				commonFunctionsFile.testPresent(statusReqRes);
				expect(statusReqErr).to.be.null;
				statusRead = apiRequestScript.callReadApiResponseObject(statusReqRes);
				done();
			});
		});
		
		it("Status Object Returned", function(done)
		{
			commonFunctionsFile.testPresent(statusRead);
			expect(statusRead).to.be.an("object");
			done();
		});
		
		it("Object Structure Valid", function(done)
		{
			commonFunctionsFile.testObjectPropertyDefinition(statusRead, 'id');
			commonFunctionsFile.testObjectPropertyDefinition(statusRead, 'isRunning');
			
			commonFunctionsFile.testString(statusRead.id);
			expect(statusRead.isRunning).to.be.a("boolean");
			
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
			
			needle.put(modifyOptions, function(mError, mResult)
			{
				modifyError = mError;
				modifyReturn = mResult;
				done();
			});
			
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(modifyReturn);
			expect(modifyError).to.be.null;
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
			expect(modifyRead).to.be.an("object");
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
			expect(localModify).to.be.an("object");
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
			
			needle.get(reviewUrl, function(getError, getResult)
			{
				reviewReturn = getResult;
				reviewError = getError;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(reviewReturn);
			expect(reviewError).to.be.null;
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
			expect(reviewRead).to.be.an("object");
			
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
			
			needle.delete(flagObject, function(dFlagError, dFlagResult)
			{
				flagError = dFlagError;
				flagReturn = dFlagResult;
				done();
			});
			
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(flagReturn);
			expect(flagError).to.be.null;
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
			expect(flagRead).to.be.an("object");
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
			expect(flagRead.success).to.be.true;
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
		
			needle.delete(deleteObject, function(dError, dResult)
			{
				deleteError = dError;
				deleteReturn = dResult;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(deleteReturn);
			expect(deleteError).to.be.null;
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
			expect(deleteRead).to.be.an("object");
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
			expect(deleteRead.success).to.be.true;
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
			
			needle.get(deleteUpdateUrl, function(delListError, delListResult)
			{
				deleteUpdateReturn = delListResult;
				deleteUpdateError = delListError;
				done();
			});
			
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testPresent(deleteUpdateReturn);
			expect(deleteUpdateError).to.be.null;
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
			expect(listFlag).to.be.false;
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