const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequests);
const apiCommonFile = require("../sub-requests/common-api");



function testAlarmApis()
{
	describe("Alarm APIs (alarm-history)", function()
	{
		handleList();
		handleAvailable();
	});
}

function handleList()
{
	var listUrl = null;
	var listReturn = null;
	var listRead = null;
	
	describe("Alarm History List (list/all?limit=10)", function()
	{
		
		it("Request Made", function(done)
		{
			listUrl = apiRequestScript.writeUrl(apiPaths.alarmApi, "list/all?limit=10");
			listReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(listUrl, listReturn, done);
		});
		
		it("Results Read", function(done)
		{
			listRead = listReturn.body;
			done();
		});
		
		
		it("Correct Array Structure", function()
		{
			commonFunctionsFile.testPresent(listRead);
			arrayFunctions.testEmpty(listRead);
			arrayFunctions.testAllType(listRead, 'object');
		});
		
		it("Correct Properties", function()
		{
			commonFunctionsFile.testPropertyDefinitions(listRead, 'ts');
			commonFunctionsFile.testPropertyDefinitions(listRead, 'nodeId');
			commonFunctionsFile.testPropertyDefinitions(listRead, 'state');
			commonFunctionsFile.testPropertyDefinitions(listRead, 'name');
		});
		
		it("Correct Contents", function()
		{
			commonFunctionsFile.testPropertyContents(listRead, 'ts', 'number');
			commonFunctionsFile.testPropertyContents(listRead, 'nodeId', 'string');
			commonFunctionsFile.testPropertyContents(listRead, 'state', 'number');
			commonFunctionsFile.testPropertyContents(listRead, 'name', 'string');
			
			apiCommonFile.testPositiveNumberArray(listRead, 'ts');
			commonFunctionsFile.testPropertyStringRequiredArray(listRead, 'nodeId');
			apiCommonFile.testAlarmStates(listRead);
			commonFunctionsFile.testPropertyStringRequiredArray(listRead, 'name');
		});
		
	});
}


function handleAvailable()
{
	var availabilityUrl = null;
	var availabilityReturn = null;
	var retrievedData = null;
	
	describe("Available (available)", function()
	{
		
		it("Request Made", function(done)
		{
			availabilityUrl = apiRequestScript.writeUrl(apiPaths.alarmApi, "available");
			availabilityReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(availabilityUrl, availabilityReturn, done);
		});
		
		it("Results Read", function(done)
		{
			retrievedData = availabilityReturn.body;
			done();
		});
		
		
		it("Correct Array Structure", function()
		{
			commonFunctionsFile.testPresent(retrievedData);
			arrayFunctions.testEmpty(retrievedData);
			arrayFunctions.testAllType(retrievedData, 'object');
		});
		
		it("Correct Properties", function()
		{
			commonFunctionsFile.testPropertyDefinitions(retrievedData, 'id');
			commonFunctionsFile.testPropertyDefinitions(retrievedData, 'name');
			commonFunctionsFile.testPropertyDefinitions(retrievedData, 'okText');
			commonFunctionsFile.testPropertyDefinitions(retrievedData, 'alarmText');
			commonFunctionsFile.testPropertyDefinitions(retrievedData, 'alarmColor');
		});
		
		it("Correct Contents", function()
		{			
			commonFunctionsFile.testPropertyStringRequiredArray(retrievedData, 'id');
			commonFunctionsFile.testPropertyStringRequiredArray(retrievedData, 'name');
			commonFunctionsFile.testPropertyStringRequiredArray(retrievedData, 'okText');
			commonFunctionsFile.testPropertyStringRequiredArray(retrievedData, 'alarmText');
			commonFunctionsFile.testPropertyStringRequiredArray(retrievedData, 'alarmColor');
		});
		
	});
	
}

module.exports = testAlarmApis;