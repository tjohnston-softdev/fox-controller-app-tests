const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
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
	expect(returnedObject.success).to.be.true;
	commonFunctionsFile.testString(returnedObject.id);
}

function testFrontendAddSuccessful(returnedObject)
{
	commonFunctionsFile.testPresent(returnedObject);
	expect(returnedObject).to.be.an("object");
	testAddModifyReturnProperties(returnedObject);
	testAddModifyReturnContents(returnedObject);
}

function testFrontendAddIdValid(returnedObjectID)
{
	commonFunctionsFile.testPresent(returnedObjectID);
	commonFunctionsFile.testString(returnedObjectID);
}



module.exports =
{
	callGetRudUrl: getRudUrl,
	callGetStatusUrl: getStatusUrl,
	callTestAddModifyReturnProperties: testAddModifyReturnProperties,
	callTestAddModifyReturnContents: testAddModifyReturnContents,
	callTestFrontendAddSuccessful: testFrontendAddSuccessful,
	callTestFrontendAddIdValid: testFrontendAddIdValid
};