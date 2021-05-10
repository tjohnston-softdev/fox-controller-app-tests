const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const needle = require("needle");

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);
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
	var listError = null;
	var listReturn = null;
	var listRead = null;
	
	describe("Alarm History List (list/all?limit=10)", function()
	{
		
		it("Request Made", function(done)
		{
			listUrl = apiRequestScript.callWriteApiUrl(apiPaths.alarmApi, "list/all?limit=10");
			
			needle.get(listUrl, function(alarmErr, alarmRes)
			{
				listError = alarmErr;
				listReturn = alarmRes;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			expect(listError).to.be.null;
			commonFunctionsFile.testPresent(listReturn);
			expect(listReturn).to.be.an("object");
			apiRequestScript.callValidateApiResponse(listReturn);
			listRead = listReturn.body;
			done();
		});
		
		
		it("Correct Array Structure", function()
		{
			commonFunctionsFile.testPresent(listRead);
			commonFunctionsFile.testArrayEmpty(listRead);
			commonFunctionsFile.testAllElements(listRead, 'object');
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
			
			apiCommonFile.callTestPositiveNumberPropertyArray(listRead, 'ts');
			commonFunctionsFile.testPropertyStringRequiredArray(listRead, 'nodeId');
			apiCommonFile.callTestAlarmStateFlags(listRead);
			commonFunctionsFile.testPropertyStringRequiredArray(listRead, 'name');
		});
		
		
		
	});
}


function handleAvailable()
{
	var availabilityUrl = null;
	var reqErr = null;
	var reqReturn = null;
	var retrievedData = null;
	
	describe("Available (available)", function()
	{
		
		it("Request Made", function(done)
		{
			availabilityUrl = apiRequestScript.callWriteApiUrl(apiPaths.alarmApi, "available");
			
			needle.get(availabilityUrl, function(alarmErr, alarmRes)
			{
				reqErr = alarmErr;
				reqReturn = alarmRes;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			expect(reqErr).to.be.null;
			commonFunctionsFile.testPresent(reqReturn);
			expect(reqReturn).to.be.an("object");
			apiRequestScript.callValidateApiResponse(reqReturn);
			retrievedData = reqReturn.body;
			done();
		});
		
		
		it("Correct Array Structure", function()
		{
			commonFunctionsFile.testPresent(retrievedData);
			commonFunctionsFile.testArrayEmpty(retrievedData);
			commonFunctionsFile.testAllElements(retrievedData, 'object');
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
			commonFunctionsFile.testPropertyContents(retrievedData, 'id', 'string');
			commonFunctionsFile.testPropertyContents(retrievedData, 'name', 'string');
			commonFunctionsFile.testPropertyContents(retrievedData, 'okText', 'string');
			commonFunctionsFile.testPropertyContents(retrievedData, 'alarmText', 'string');
			commonFunctionsFile.testPropertyContents(retrievedData, 'alarmColor', 'string');
			
			commonFunctionsFile.testPropertyStringRequiredArray(retrievedData, 'id');
			commonFunctionsFile.testPropertyStringRequiredArray(retrievedData, 'name');
			commonFunctionsFile.testPropertyStringRequiredArray(retrievedData, 'okText');
			commonFunctionsFile.testPropertyStringRequiredArray(retrievedData, 'alarmText');
			commonFunctionsFile.testPropertyStringRequiredArray(retrievedData, 'alarmColor');
		});
		
	});
	
}

module.exports =
{
	callTestAlarmApis: testAlarmApis
};