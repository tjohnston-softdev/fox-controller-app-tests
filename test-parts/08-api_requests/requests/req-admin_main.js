const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');;

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const objectFunctions = require(commonPaths.testObject);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequests);
const apiCommonFile = require("../sub/common-api");



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
			dhcpUrl = apiRequestScript.writeUrl(apiPaths.adminApi, "dhcp-clients");
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
			arrayFunctions.testPopulated(dhcpRead);
			arrayFunctions.testAllType(dhcpRead, 'object');
		});
		
		it("Correct Properties", function()
		{
			arrayFunctions.testAllPropExists(dhcpRead, 'leaseExpiry');
			arrayFunctions.testAllPropExists(dhcpRead, 'mac');
			arrayFunctions.testAllPropExists(dhcpRead, 'ipAddress');
			arrayFunctions.testAllPropExists(dhcpRead, 'host');
			arrayFunctions.testAllPropExists(dhcpRead, 'shortMac');
		});
		
		it("Correct Contents", function()
		{
			arrayFunctions.testAllPropType(dhcpRead, 'leaseExpiry', 'number');
			arrayFunctions.testAllPropType(dhcpRead, 'mac', 'string');
			arrayFunctions.testAllPropType(dhcpRead, 'ipAddress', 'string');
			arrayFunctions.testAllPropType(dhcpRead, 'host', 'string');
			arrayFunctions.testAllPropType(dhcpRead, 'shortMac', 'string');
			
			apiCommonFile.testArrayDhcpLeaseExpire(dhcpRead);
			apiCommonFile.testDhcpMacLong(dhcpRead, false);
			apiCommonFile.testArrayIpFour(dhcpRead, 'ipAddress');
			arrayFunctions.testAllStringRequired(dhcpRead, 'host');
			apiCommonFile.testDhcpMacShort(dhcpRead);
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
			defaultUrl = apiRequestScript.writeUrl(apiPaths.adminApi, "defaults");
			defaultReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(defaultUrl, defaultReturn, done);
		});
		
		it("Results Read", function(done)
		{
			defaultRead = apiRequestScript.readResponseObject(defaultReturn);
			done();
		});
		
		
		it("Correct Object Returned", function()
		{
			commonFunctions.testObject(defaultRead);
			objectFunctions.testPropExists(defaultRead, 'message');
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
			logUrl = apiRequestScript.writeUrl(apiPaths.adminApi, "logs");
			logReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(logUrl, logReturn, done);
		});
		
		
		it("Results Read", function(done)
		{
			logRead = apiRequestScript.readResponseObject(logReturn);
			done();
		});
		
	
		it("Valid Return Structure", function()
		{
			commonFunctions.testObject(logRead);
			objectFunctions.testPropExists(logRead, 'success');
			objectFunctions.testPropExists(logRead, 'logs');
		});
	
		it("Valid Contents", function()
		{
			expect(logRead.success).to.be.true;
			commonFunctions.testString(logRead.logs);
		});
		
	});
}

module.exports = testAdminApis;