const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const objectFunctions = require(commonPaths.testObject);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const apiRequestScript = require(commonPaths.requestApi);

const modelFunctionsFile = require(commonPaths.getModels);
const modelIntegrityFile = require(commonPaths.checkModelIntegrity);
const rioCommon = require(commonPaths.rioCommon);
const deviceCommon = require(commonPaths.deviceCommon);
const httpRequests = require(commonPaths.httpRequests);
const apiCommonFile = require("../sub/common-api");

const deviceFolder = apiPaths.devicesApi;
const deviceRio = apiPaths.rioApiSub;

const modelObjectArray = modelFunctionsFile.getAllModels();

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
		it("Retrieved Successfully", function(done)
		{
			expect(modelObjectArray).to.exist;
			arrayFunctions.testPopulated(modelObjectArray);
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
		var reqReturn = null;
		var defaultsRead = null;
		
		it("Manufacturer Model Lists Retrieved", function(done)
		{
			deviceArrayLists = modelFunctionsFile.getByManufacturer(modelObjectArray);
			done();
		});
		
		
		it("Request Made", function(done)
		{
			defaultsUrl = apiRequestScript.writeUrl(deviceFolder, "defaults");
			reqReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(defaultsUrl, reqReturn, done);
		});
		
		
		it("Results Read", function(done)
		{
			defaultsRead = apiRequestScript.readResponseObject(reqReturn);
			done();
		});
		
		
		it("Object Returned", function(done)
		{
			commonFunctions.testObject(defaultsRead);
			done();
		});
		
		it("Supported Device Types (deviceTypes)", function(done)
		{
			var correctTypes = ["Remote IO", "Motor Drive"];
			
			objectFunctions.testPropExists(defaultsRead, 'deviceTypes');
			arrayFunctions.testPopulated(defaultsRead.deviceTypes);
			expect(defaultsRead.deviceTypes).to.deep.equal(correctTypes);
			
			done();
		});
		
		
		it("Manufacturers (rioMakers)", function(done)
		{
			objectFunctions.testPropExists(defaultsRead, 'rioMakers');
			arrayFunctions.testPopulated(defaultsRead.rioMakers);
			expect(defaultsRead.rioMakers).to.deep.equal(deviceArrayLists.manufacturers);
			
			done();
		});
		
		it("Models (rioModelTypes)", function(done)
		{
			objectFunctions.testPropExists(defaultsRead, 'rioModelTypes');
			arrayFunctions.testPopulated(defaultsRead.rioModelTypes);
			expect(defaultsRead.rioModelTypes).to.deep.equal(deviceArrayLists.models);
			
			done();
		});
		
	});
}



function handleBeforeListTest()
{
	describe("List Remote IO Devices (devices/remote-io)", function()
	{
		var beforeUrl = null;
		var beforeReturn = null;
		
		it("Request Made", function(done)
		{
			beforeUrl = apiRequestScript.writeUrl(deviceFolder, deviceRio);
			beforeReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(beforeUrl, beforeReturn, done);
		});
		
		
		it("Results Read", function(done)
		{
			rioList = beforeReturn.body;
			done();
		});
		
		
		it("Device Array Returned", function(done)
		{
			arrayFunctions.testDynamic(rioList, -1);
			done();
		});
		
		it("All Elements Objects", function(done)
		{
			arrayFunctions.testAllType(rioList, 'object');
			done();
		});
		
		it("Object Structures Valid", function(done)
		{
			rioCommon.testDeviceArray(rioList);
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
			var createReturn = null;
			var createRead = null;
			
			it("Request Made", function(done)
			{
				createUrl = apiRequestScript.writeUrl(deviceFolder, deviceRio);
				createReturn = httpRequests.defineOutput();
				httpRequests.postSuccessful(createUrl, commonJsonObjectsFile.crudDevice, createReturn, done);
			});
			
			it("Results Read", function(done)
			{
				createRead = apiRequestScript.readResponseObject(createReturn);
				done();
			});
			
			it("Object Returned", function(done)
			{
				commonFunctions.testObject(createRead);
				done();
			});
			
			it("Correct Properties", function(done)
			{
				deviceCommon.testAddModifyResultProperties(createRead);
				done();
			});
			
			it("Correct Contents", function(done)
			{
				deviceCommon.testAddModifyResultContents(createRead);
				testID = createRead.id;
				done();
			});
			
			it("Test ID Retained", function(done)
			{
				expect(testID).to.exist;
				commonFunctions.testString(testID);
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
		var addReqReturn = null;
		var addUpdateRead = null;
		
		it("Request Made", function(done)
		{
			addUpdateUrl = apiRequestScript.writeUrl(deviceFolder, deviceRio);
			addReqReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(addUpdateUrl, addReqReturn, done);
		});
		
		
		it("Results Read", function(done)
		{
			addUpdateRead = addReqReturn.body;
			done();
		});
		
		
		it("Valid Return", function(done)
		{
			rioCommon.testDeviceListPopulated(addUpdateRead);
			done();
		});
		
		it("Test Device Listed", function(done)
		{
			var listFlag = rioCommon.testIdListed(addUpdateRead, testID);
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
		var reqReturn = null;
		var deviceRead = null;
		
		it("Request Made", function(done)
		{
			deviceUrl = deviceCommon.getRudUrl(testID);
			reqReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(deviceUrl, reqReturn, done);
		});
		
		it("Results Read", function(done)
		{
			deviceRead = apiRequestScript.readResponseObject(reqReturn);
			done();
		});
		
		
		it("Object Returned", function(done)
		{
			commonFunctions.testObject(deviceRead);
			done();
		});
		
		it("Object Structure Valid", function(done)
		{
			rioCommon.testDeviceObject(deviceRead);
			done();
		});
		
		it("Matching IDs", function(done)
		{
			expect(deviceRead.id).to.equal(testID);
			done();
		});
		
		it("Matching Contents", function(done)
		{
			rioCommon.compareToOriginal(deviceRead, commonJsonObjectsFile.crudDevice);
			done();
		});
		
		
	});
}



function handleDeviceStatusTest()
{
	describe("Get Remote IO Device Status (devices/status/remote-io/testID)", function()
	{
		var statusUrl = null;
		var reqReturn = null;
		var statusRead = null;
		
		it("Request Made", function(done)
		{
			statusUrl = deviceCommon.getStatusUrl(testID);
			reqReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(statusUrl, reqReturn, done);
		});
		
		it("Results Read", function(done)
		{
			statusRead = apiRequestScript.readResponseObject(reqReturn);
			done();
		});
		
		
		it("Status Object Returned", function(done)
		{
			commonFunctions.testObject(statusRead);
			done();
		});
		
		it("Object Structure Valid", function(done)
		{
			objectFunctions.testPropExists(statusRead, 'id');
			objectFunctions.testPropExists(statusRead, 'isRunning');
			
			commonFunctions.testString(statusRead.id);
			expect(statusRead.isRunning).to.be.a("boolean");
			
			done();
		});
		
		it("No Communication Errors", function(done)
		{
			objectFunctions.testPropAbsent(statusRead, 'commsError');
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
		var modifyReturn = null;
		var modifyRead = null;
		
		
		it("Modification Defined", function(done)
		{
			modifyObject = commonFunctions.cloneObject(commonJsonObjectsFile.modifiedDevice);
			modifyObject.id = testID;
			done();
		});
		
		
		it("Request Made", function(done)
		{
			modifyUrl = deviceCommon.getRudUrl(testID);
			modifyReturn = httpRequests.defineOutput();
			httpRequests.putSuccessful(modifyUrl, modifyObject, modifyReturn, done);			
		});
		
		it("Results Read", function(done)
		{
			modifyRead = apiRequestScript.readResponseObject(modifyReturn);
			done();
		});
		
		it("Object Returned", function(done)
		{
			commonFunctions.testObject(modifyRead);
			done();
		});
		
		it("Correct Properties", function(done)
		{
			deviceCommon.testAddModifyResultProperties(modifyRead);
			done();
		});
		
		it("Correct Contents", function(done)
		{
			deviceCommon.testAddModifyResultContents(modifyRead);
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
		var reviewReturn = null;
		var reviewRead = null;
		
		it("Request Made", function(done)
		{
			reviewUrl = deviceCommon.getRudUrl(testID);
			reviewReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(reviewUrl, reviewReturn, done);
		});
		
		it("Results Read", function(done)
		{
			reviewRead = apiRequestScript.readResponseObject(reviewReturn);
			done();
		});
		
		it("Return Valid", function(done)
		{
			commonFunctions.testObject(reviewRead);
			rioCommon.testDeviceObject(reviewRead);
			expect(reviewRead.id).to.equal(testID);
			
			done();
		});
		
		it("Modifications Successful", function(done)
		{	
			rioCommon.compareToOriginal(reviewRead, localModify);
			done();
		});
		
	});
}



function handleDeleteFlagTest()
{
	describe("Flag Remote IO Device Deleted (devices/remote-io/testID)", function()
	{
		var flagUrl = null;
		var flagReturn = null;
		var flagRead = null;
		
		it("Request Made", function(done)
		{
			flagUrl = deviceCommon.getRudUrl(testID);
			flagReturn = httpRequests.defineOutput();
			httpRequests.deleteSuccessful(flagUrl, false, flagReturn, done);
		});
		
		it("Results Read", function(done)
		{
			flagRead = apiRequestScript.readResponseObject(flagReturn);
			done();
		});
		
		it("Object Returned", function(done)
		{
			commonFunctions.testObject(flagRead);
			done();
		});
		
		it("Delete Flag Successful", function(done)
		{
			objectFunctions.testPropExists(flagRead, 'success');
			expect(flagRead.success).to.be.true;
			done();
		});
		
	});
}


function handleDeleteObjectTest()
{
	var deleteUrl = null;
	var deleteReturn = null;
	var deleteRead = null;
	
	describe("Delete Remote IO Device Object Permanately", function()
	{
		it("Request Made", function(done)
		{
			deleteUrl = deviceCommon.getRudUrl(testID);
			deleteReturn = httpRequests.defineOutput();
			httpRequests.deleteSuccessful(deleteUrl, false, deleteReturn, done);
		});
		
		it("Results Read", function(done)
		{
			deleteRead = apiRequestScript.readResponseObject(deleteReturn);
			done();
		});
		
		it("Object Returned", function(done)
		{
			commonFunctions.testObject(deleteRead);
			done();
		});
		
		
		it("Delete Object Successful", function(done)
		{
			objectFunctions.testPropExists(deleteRead, 'success');
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
		var deleteUpdateReturn = null;
		var deleteUpdateRead = null;
		
		it("Request Made", function(done)
		{
			deleteUpdateUrl = apiRequestScript.writeUrl(deviceFolder, deviceRio);
			deleteUpdateReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(deleteUpdateUrl, deleteUpdateReturn, done);
		});
		
		it("Results Read", function(done)
		{
			deleteUpdateRead = deleteUpdateReturn.body;
			done();
		});
		
		
		it("Valid Return", function(done)
		{
			rioCommon.testDeviceListNeutral(deleteUpdateRead);
			done();
		});
		
		it("Test Device Absent", function(done)
		{
			var listFlag = rioCommon.testIdListed(deleteUpdateRead, testID);
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


module.exports = testDeviceCrudApis;