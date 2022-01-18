const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequests);
const rioCommon = require(commonPaths.rioCommon);

var retrievedDatabaseList = null;

function testNodeDatabaseEmptyApi()
{
	describe("Check Device List Empty", function()
	{
		handleDatabaseRetrieve();
		handleDatabaseCheck();
	});
}

function handleDatabaseRetrieve()
{
	describe("Retrieve Device List From Database", function()
	{
		var listUrl = null;
		var listReturn = null;
		
		it("Request Sent", function(done)
		{
			listUrl = apiRequestScript.writeUrl(apiPaths.devicesApi, apiPaths.rioApiSub);
			listReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(listUrl, listReturn, done);
		});
		
		it("Results Read", function(done)
		{
			retrievedDatabaseList = listReturn.body;
			done();
		});
		
	});
}

function handleDatabaseCheck()
{
	describe("Check Device List", function()
	{
		it("Device List Exists", function(done)
		{
			commonFunctions.testPresent(retrievedDatabaseList);
			expect(retrievedDatabaseList).to.be.an("array");
			done();
		});
		
		it("Valid Array Structure", function(done)
		{
			arrayFunctions.testAllType(retrievedDatabaseList, 'object');
			rioCommon.testDeviceArray(retrievedDatabaseList);
			done();
		});
		
		it("Device List Empty", function(done)
		{
			arrayFunctions.testEmpty(retrievedDatabaseList);
			done();
		});
		
		it("Local Copy Disposed", function(done)
		{
			retrievedDatabaseList = null;
			done();
		});
		
		
	});
}


module.exports = testNodeDatabaseEmptyApi;