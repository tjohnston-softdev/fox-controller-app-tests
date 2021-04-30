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
const adminFolder = apiPaths.adminApi;



function testAdminApis()
{
	describe("Admin APIs (admin)", function()
	{
		handleDhcpClients();
		handleDefaultObject();
		handleLog();
	});
}


function handleDhcpClients()
{
	var dhcpUrl = null;
	var dhcpRequestReturn = null;
	var dhcpRequestError = null;
	var dhcpRead = null;
	
	describe("DHCP Clients (dhcp-clients)", function()
	{
		
		it("Request Made", function(done)
		{
			dhcpUrl = apiRequestScript.callWriteApiUrl(adminFolder, "dhcp-clients");
			
			reqModule(dhcpUrl, function(aError, aResult)
			{
				dhcpRequestError = aError;
				dhcpRequestReturn = aResult;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			expect(dhcpRequestError).to.be.null;
			commonFunctionsFile.testPresent(dhcpRequestReturn);
			done();
		});
		
		it("Results Read", function(done)
		{
			dhcpRead = apiRequestScript.callReadApiResponseArray(dhcpRequestReturn);
			done();
		});
		
		it("Correct Array Structure", function()
		{
			commonFunctionsFile.testPresent(dhcpRead);
			commonFunctionsFile.testArray(dhcpRead);
			commonFunctionsFile.testAllElements(dhcpRead, 'object');
		});
		
		it("Correct Properties", function()
		{
			commonFunctionsFile.testPropertyDefinitions(dhcpRead, 'leaseExpiry');
			commonFunctionsFile.testPropertyDefinitions(dhcpRead, 'mac');
			commonFunctionsFile.testPropertyDefinitions(dhcpRead, 'ipAddress');
			commonFunctionsFile.testPropertyDefinitions(dhcpRead, 'host');
			commonFunctionsFile.testPropertyDefinitions(dhcpRead, 'shortMac');
		});
		
		it("Correct Contents", function()
		{
			commonFunctionsFile.testPropertyContents(dhcpRead, 'leaseExpiry', 'number');
			commonFunctionsFile.testPropertyContents(dhcpRead, 'mac', 'string');
			commonFunctionsFile.testPropertyContents(dhcpRead, 'ipAddress', 'string');
			commonFunctionsFile.testPropertyContents(dhcpRead, 'host', 'string');
			commonFunctionsFile.testPropertyContents(dhcpRead, 'shortMac', 'string');
			
			apiCommonFile.callTestDhcpLeaseExpireValues(dhcpRead);
			apiCommonFile.callTestDhcpMacLongValue(dhcpRead, false);
			apiCommonFile.callTestArrayIpFourValue(dhcpRead, 'ipAddress');
			commonFunctionsFile.testPropertyStringRequiredArray(dhcpRead, 'host');
			apiCommonFile.callTestDhcpMacShortValue(dhcpRead);
		});
		
		
	});
}


function handleDefaultObject()
{
	var defaultObjectUrl = null;
	var defaultObjectError = null;
	var defaultObjectReturn = null;
	var defaultObjectRead = null;
	
	describe("Default Object (defaults)", function()
	{
		
		it("Request Made", function(done)
		{
			defaultObjectUrl = apiRequestScript.callWriteApiUrl(adminFolder, "defaults");
			
			reqModule(defaultObjectUrl, function(aError, aResult)
			{
				defaultObjectError = aError;
				defaultObjectReturn = aResult;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			expect(defaultObjectError).to.be.null;
			commonFunctionsFile.testPresent(defaultObjectReturn);
			done();
		});
		
		it("Results Read", function(done)
		{
			defaultObjectRead = apiRequestScript.callReadApiResponseObject(defaultObjectReturn);
			done();
		});
		
		it("Correct Object Returned", function()
		{
			commonFunctionsFile.testPresent(defaultObjectRead);
			commonFunctionsFile.testType(defaultObjectRead, 'object');
			
			commonFunctionsFile.testObjectPropertyDefinition(defaultObjectRead, 'message');
			commonFunctionsFile.testObjectPropertyContent(defaultObjectRead, 'message', 'string');
			
			commonFunctionsFile.testString(defaultObjectRead.message);
			expect(defaultObjectRead.message).to.equal("adminApi");
		});
		
	});
}

function handleLog()
{
	describe("Controller Logs (logs)", function()
	{
		var logUrl = null;
		var logError = null;
		var logReturn = null;
		var logRead = null;
	
		it("Request Made", function(done)
		{
			logUrl = apiRequestScript.callWriteApiUrl(adminFolder, "logs");
		
			reqModule(logUrl, function(aError, aResult)
			{
				logError = aError;
				logReturn = aResult;
				done();
			});
		});
	
		it("Request Successful", function(done)
		{
			expect(logError).to.be.null;
			commonFunctionsFile.testPresent(logReturn);
			done();
		});
	
		it("Results Read", function(done)
		{
			logRead = apiRequestScript.callReadApiResponseObject(logReturn);
			done();
		});
	
		it("Valid Return Structure", function()
		{
			commonFunctionsFile.testPresent(logRead);
			commonFunctionsFile.testType(logRead, 'object');
		
			commonFunctionsFile.testObjectPropertyDefinition(logRead, 'success');
			commonFunctionsFile.testObjectPropertyDefinition(logRead, 'logs');
		});
	
		it("Valid Contents", function()
		{
			commonFunctionsFile.testObjectPropertyContent(logRead, 'success', 'boolean');
			expect(logRead.success).to.be.true;
			commonFunctionsFile.testString(logRead.logs);
		});
		
	});
}

exports.callTestAdminApis = testAdminApis;