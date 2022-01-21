const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctions = require(commonPaths.testCommon);
const apiRequestFile = require(commonPaths.requestApi);



function getReadUrl(readSubPart, readIdPart)
{
	var readBase = apiRequestFile.writeUrl(apiPaths.devicesApi, readSubPart);
	var readDevice = readBase + '/' + readIdPart;
	return readDevice;
}



function getDeviceRudUrl(crudID)
{
	var rudDeviceUrl = getReadUrl(apiPaths.rioApiSub, crudID);
	return rudDeviceUrl;
}

function getDeviceStatusUrl(crudID)
{
	var statusLocation = "status/" + apiPaths.rioApiSub;
	var statusDeviceUrl = getReadUrl(statusLocation, crudID);
	return statusDeviceUrl;
}

function testAddModifyResultObjectContents(returnedObject)
{	
	expect(returnedObject.success).to.be.true;
	commonFunctions.testString(returnedObject.id);
}

function testFrontendAddSuccessful(returnedObject)
{
	commonFunctions.testObject(returnedObject);
	testAddModifyResultObjectContents(returnedObject);
}

function testFrontendAddIdValid(returnedObjectID)
{
	commonFunctions.testString(returnedObjectID);
}



module.exports =
{
	getRudUrl: getDeviceRudUrl,
	getStatusUrl: getDeviceStatusUrl,
	testAddModifyResultContents: testAddModifyResultObjectContents,
	testFrontendAdded: testFrontendAddSuccessful,
	testFrontendIdValid: testFrontendAddIdValid
};