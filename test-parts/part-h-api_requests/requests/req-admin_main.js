const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');;

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequestsFile);
const apiCommonFile = require("../sub-requests/common-api");



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
	var dhcpReturn = null;
	var dhcpRead = null;
	
	describe("DHCP Clients (dhcp-clients)", function()
	{
		
		it("Request Made", function(done)
		{
			dhcpUrl = apiRequestScript.callWriteApiUrl(apiPaths.adminApi, "dhcp-clients");
			dhcpReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(dhcpUrl, dhcpReturn, done);
		});
		
		it("Results Read", function(done)
		{
			dhcpRead = dhcpReturn.body;	
			done();
		});
		
		
		it("Correct Array Structure", function()
		{
			commonFunctionsFile.testPresent(dhcpRead);
			commonFunctionsFile.testArrayPopulated(dhcpRead);
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
	var defaultUrl = null;
	var defaultReturn = null;
	var defaultRead = null;
	
	describe("Default Object (defaults)", function()
	{
		
		it("Request Made", function(done)
		{
			defaultUrl = apiRequestScript.callWriteApiUrl(apiPaths.adminApi, "defaults");
			defaultReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(defaultUrl, defaultReturn, done);
		});
		
		it("Results Read", function(done)
		{
			defaultRead = apiRequestScript.callReadApiResponseObject(defaultReturn);
			done();
		});
		
		
		it("Correct Object Returned", function()
		{
			commonFunctionsFile.testPresent(defaultRead);
			expect(defaultRead).to.be.an("object");
			
			commonFunctionsFile.testObjectPropertyDefinition(defaultRead, 'message');
			commonFunctionsFile.testObjectPropertyContent(defaultRead, 'message', 'string');
			expect(defaultRead.message).to.equal("adminApi");
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
			logUrl = apiRequestScript.callWriteApiUrl(apiPaths.adminApi, "logs");
			logReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(logUrl, logReturn, done);
		});
		
		
		it("Results Read", function(done)
		{
			logRead = apiRequestScript.callReadApiResponseObject(logReturn);
			done();
		});
		
	
		it("Valid Return Structure", function()
		{
			commonFunctionsFile.testPresent(logRead);
			expect(logRead).to.be.an("object");
		
			commonFunctionsFile.testObjectPropertyDefinition(logRead, 'success');
			commonFunctionsFile.testObjectPropertyDefinition(logRead, 'logs');
		});
	
		it("Valid Contents", function()
		{
			expect(logRead.success).to.be.true;
			commonFunctionsFile.testString(logRead.logs);
		});
		
	});
}

module.exports =
{
	callTestAdminApis: testAdminApis
};