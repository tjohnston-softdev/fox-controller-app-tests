const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');

const apiCommonFile = require("../sub-requests/common-api");
const alarmFolder = apiPaths.alarmApi;



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
	var listRequestReturn = null;
	var listRequestError = null;
	var listRead = null;
	
	describe("Alarm History List (list/all?limit=10)", function()
	{
		
		it("Request Made", function(done)
		{
			listUrl = apiRequestScript.callWriteApiUrl(alarmFolder, "list/all?limit=10");
			
			reqModule(listUrl, function(aError, aResult)
			{
				listRequestError = aError;
				listRequestReturn = aResult;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testNull(listRequestError);
			commonFunctionsFile.testPresent(listRequestReturn);
			done();
		});
		
		it("Results Read", function(done)
		{
			listRead = apiRequestScript.callReadApiResponseArray(listRequestReturn);
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
	var avUrl = null;
	var avRequestReturn = null;
	var avRequestError = null;
	var avRead = null;
	
	describe("Available (available)", function()
	{
		
		it("Request Made", function(done)
		{
			avUrl = apiRequestScript.callWriteApiUrl(alarmFolder, "available");
			
			reqModule(avUrl, function(aError, aResult)
			{
				avRequestError = aError;
				avRequestReturn = aResult;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testNull(avRequestError);
			commonFunctionsFile.testPresent(avRequestReturn);
			done();
		});
		
		it("Results Read", function(done)
		{
			avRead = apiRequestScript.callReadApiResponseArray(avRequestReturn);
			done();
		});
		
		it("Correct Array Structure", function()
		{
			commonFunctionsFile.testPresent(avRead);
			commonFunctionsFile.testArrayEmpty(avRead);
			commonFunctionsFile.testAllElements(avRead, 'object');
		});
		
		it("Correct Properties", function()
		{
			commonFunctionsFile.testPropertyDefinitions(avRead, 'id');
			commonFunctionsFile.testPropertyDefinitions(avRead, 'name');
			commonFunctionsFile.testPropertyDefinitions(avRead, 'okText');
			commonFunctionsFile.testPropertyDefinitions(avRead, 'alarmText');
			commonFunctionsFile.testPropertyDefinitions(avRead, 'alarmColor');
		});
		
		it("Correct Contents", function()
		{
			commonFunctionsFile.testPropertyContents(avRead, 'id', 'string');
			commonFunctionsFile.testPropertyContents(avRead, 'name', 'string');
			commonFunctionsFile.testPropertyContents(avRead, 'okText', 'string');
			commonFunctionsFile.testPropertyContents(avRead, 'alarmText', 'string');
			commonFunctionsFile.testPropertyContents(avRead, 'alarmColor', 'string');
			
			commonFunctionsFile.testPropertyStringRequiredArray(avRead, 'id');
			commonFunctionsFile.testPropertyStringRequiredArray(avRead, 'name');
			commonFunctionsFile.testPropertyStringRequiredArray(avRead, 'okText');
			commonFunctionsFile.testPropertyStringRequiredArray(avRead, 'alarmText');
			commonFunctionsFile.testPropertyStringRequiredArray(avRead, 'alarmColor');
		});
		
		
		
		
	});
	
}

exports.callTestAlarmApis = testAlarmApis;