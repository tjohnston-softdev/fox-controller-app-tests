const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const foxPath = require(commonPaths.foxRelativeFile);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrorsFile);
const commonJsonObjectsFile = require(commonPaths.commonObjectFile);
const apiRequestFile = require(commonPaths.requestApi);



function getReadUrl(readSubPart, readIdPart)
{
	var readBase = apiRequestFile.callWriteApiUrl(apiPaths.devicesApi, readSubPart);
	var readDevice = readBase + '/' + readIdPart;
	return readDevice;
}



function getRudUrl(crudID)
{
	var rudDeviceUrl = getReadUrl(apiPaths.rioApiSub, crudID);
	return rudDeviceUrl;
}

function getStatusUrl(crudID)
{
	var statusLocation = "status/" + apiPaths.rioApiSub;
	var statusDeviceUrl = getReadUrl(statusLocation, crudID);
	return statusDeviceUrl;
}



function testAddModifyReturnProperties(returnedObject)
{
	commonFunctionsFile.testObjectPropertyDefinition(returnedObject, 'success');
	commonFunctionsFile.testObjectPropertyDefinition(returnedObject, 'id');
}

function testAddModifyReturnContents(returnedObject)
{
	commonFunctionsFile.testObjectPropertyContent(returnedObject, 'success', 'boolean');
	commonFunctionsFile.testObjectPropertyContent(returnedObject, 'id', 'string');
	
	commonFunctionsFile.testTrue(returnedObject.success);
	commonFunctionsFile.testString(returnedObject.id);
}

function testFrontendAddSuccessful(returnedObject)
{
	commonFunctionsFile.testPresent(returnedObject);
	commonFunctionsFile.testType(returnedObject, 'object');
	testAddModifyReturnProperties(returnedObject);
	testAddModifyReturnContents(returnedObject);
}

function testFrontendAddIdValid(returnedObjectID)
{
	commonFunctionsFile.testPresent(returnedObjectID);
	commonFunctionsFile.testString(returnedObjectID);
}


function testFrontendDeleteSuccessful(returnedObject)
{
	commonFunctionsFile.testPresent(returnedObject);
	commonFunctionsFile.testType(returnedObject, 'object');
	commonFunctionsFile.testObjectPropertyDefinition(returnedObject, 'success');
	commonFunctionsFile.testObjectPropertyContent(returnedObject, 'success', 'boolean');
	commonFunctionsFile.testTrue(returnedObject.success);
}



exports.callGetRudUrl = getRudUrl;
exports.callGetStatusUrl = getStatusUrl;
exports.callTestAddModifyReturnProperties = testAddModifyReturnProperties;
exports.callTestAddModifyReturnContents = testAddModifyReturnContents;
exports.callTestFrontendAddSuccessful = testFrontendAddSuccessful;
exports.callTestFrontendAddIdValid = testFrontendAddIdValid;
exports.callTestFrontendDeleteSuccessful = testFrontendDeleteSuccessful;
