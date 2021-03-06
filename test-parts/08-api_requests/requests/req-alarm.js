const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequests);
const apiCommonFile = require("../sub/common-api");



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
			arrayFunctions.testEmpty(listRead);
			arrayFunctions.testAllType(listRead, 'object');
		});
		
		it("Correct Properties", function()
		{
			arrayFunctions.testAllPropType(listRead, 'ts', 'number');
			arrayFunctions.testAllPropType(listRead, 'nodeId', 'string');
			arrayFunctions.testAllPropType(listRead, 'state', 'number');
			arrayFunctions.testAllPropType(listRead, 'name', 'string');
		});
		
		it("Correct Contents", function()
		{
			apiCommonFile.testPositiveNumberArray(listRead, 'ts');
			arrayFunctions.testAllStringRequired(listRead, 'nodeId');
			apiCommonFile.testAlarmStates(listRead);
			arrayFunctions.testAllStringRequired(listRead, 'name');
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
			arrayFunctions.testEmpty(retrievedData);
			arrayFunctions.testAllType(retrievedData, 'object');
		});
		
		it("Correct Properties", function()
		{
			arrayFunctions.testAllStringRequired(retrievedData, 'id');
			arrayFunctions.testAllStringRequired(retrievedData, 'name');
			arrayFunctions.testAllStringRequired(retrievedData, 'okText');
			arrayFunctions.testAllStringRequired(retrievedData, 'alarmText');
			arrayFunctions.testAllStringRequired(retrievedData, 'alarmColor');
		});
		
	});
	
}

module.exports = testAlarmApis;