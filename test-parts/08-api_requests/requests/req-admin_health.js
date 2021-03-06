const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const objectFunctions = require(commonPaths.testObject);
const apiRequestScript = require(commonPaths.requestApi);
const httpRequests = require(commonPaths.httpRequests);

const commonApi = require("../sub/common-api");
const commonDatabase = require("../sub/common-database");
const commonHealth = require("../sub/common-health");
const commonStorage = require("../sub/common-storage");

var healthObject = null;

function testHealthApi()
{
	describe("Health API (admin/health)", function()
	{
		getHealthObject();
		handleIdentification();
		handleTime();
		handleSpeed();
		handleRam();
		handleFileSystem();
		handleEnvironment();
		handleNetwork();
		handleDatabase();
		handleLog();
	});
}

function getHealthObject()
{
	var healthUrl = null;
	var healthReturn = null;
	
	describe("Health Request", function()
	{
		it("Request Made", function(done)
		{
			healthUrl = apiRequestScript.writeUrl(apiPaths.adminApi, "health");
			healthReturn = httpRequests.defineOutput();
			httpRequests.getSuccessful(healthUrl, healthReturn, done);
		});
		
		it("Results Read", function(done)
		{
			healthObject = apiRequestScript.readResponseObject(healthReturn);
			done();
		});
		
		it("Object Returned", function(done)
		{
			commonFunctions.testObject(healthObject);
			done();
		});
		
	});
	
}


function handleIdentification()
{
	describe("Identification", function()
	{
		it("Version (version)", function()
		{
			commonFunctions.testString(healthObject.version);
		});
		
		it("Serial Number (serialNumber)", function()
		{
			commonFunctions.testString(healthObject.serialNumber);
		});
		
		it("Device (device)", function()
		{
			commonHealth.testDeviceObject(healthObject);
		});
		
	});
}


function handleTime()
{
	describe("Time", function()
	{
		it("Time Object (time)", function()
		{
			commonFunctions.testObject(healthObject.time);
		});
		
		it("Current Time (time.current)", function()
		{
			commonApi.testPositiveNumber(healthObject.time, 'current');
		});
		
		it("Total Uptime (time.uptime)", function()
		{
			commonApi.testPositiveNumber(healthObject.time, 'uptime');
		});
		
		it("Timezone Offset Code (time.timezone)", function()
		{
			commonFunctions.testString(healthObject.time.timezone);
			commonHealth.testTimezoneCode(healthObject.time.timezone);
		});
		
		it("Timezone Name (time.timezoneName)", function()
		{
			commonFunctions.testString(healthObject.time.timezoneName);
		});
		
		it("Process Time (time.process)", function()
		{
			commonApi.testPositiveNumber(healthObject.time, 'process');
		});
		
		
	});
}

function handleSpeed()
{
	describe("Computer Speed", function()
	{
		it("Current Speed Object (cpuCurrentSpeed)", function()
		{
			commonFunctions.testObject(healthObject.cpuCurrentSpeed);
		});
		
		it("Minimum (cpuCurrentSpeed.min)", function()
		{
			commonApi.testPositiveNumber(healthObject.cpuCurrentSpeed, 'min');
		});
		
		it("Maximum (cpuCurrentSpeed.max)", function()
		{
			commonApi.testPositiveNumber(healthObject.cpuCurrentSpeed, 'max');
		});
		
		it("Average (cpuCurrentSpeed.avg)", function()
		{
			commonApi.testPositiveNumber(healthObject.cpuCurrentSpeed, 'avg');
		});
		
		it("Array (cpuCurrentSpeed.cores)", function()
		{
			arrayFunctions.testPopulated(healthObject.cpuCurrentSpeed.cores);
			arrayFunctions.testAllType(healthObject.cpuCurrentSpeed.cores, 'number');
			expect(healthObject.cpuCurrentSpeed.cores).to.all.be.above(0);
		});
		
	});
}


function handleRam()
{
	describe("Random Access Memory", function()
	{
		it("Memory Object (mem)", function()
		{
			commonFunctions.testObject(healthObject.mem);
		});
		
		it("Total Amount (mem.total)", function()
		{
			commonApi.testPositiveNumber(healthObject.mem, 'total');
		});
		
		it("Currently Free (mem.free)", function()
		{
			commonHealth.testMaximumNumber(healthObject.mem, 'free', healthObject.mem.total);
		});
		
		it("Currently in Use (mem.used)", function()
		{
			commonHealth.testMaximumNumber(healthObject.mem, 'used', healthObject.mem.total);
		});
		
		it("Active Memory (mem.active)", function()
		{
			commonHealth.testMaximumNumber(healthObject.mem, 'active', healthObject.mem.total);
		});
		
		it("Avaliable Memory (mem.available)", function()
		{
			commonHealth.testMaximumNumber(healthObject.mem, 'available', healthObject.mem.total);
		});
		
		it("Buffer Cache (mem.buffcache)", function()
		{	
			commonFunctions.testNumber(healthObject.mem.buffcache);
			expect(healthObject.mem.buffcache).to.be.at.most(healthObject.mem.total);
		});
		
		it("Total Swap Bytes (mem.swaptotal)", function()
		{
			commonHealth.testMaximumNumber(healthObject.mem, 'swaptotal', healthObject.mem.total);
		});
		
		it("Used Swap Bytes (mem.swapused)", function()
		{
			commonHealth.testMaximumNumber(healthObject.mem, 'swapused', healthObject.mem.swaptotal);
		});
		
		it("Free Swap Bytes (mem.swapfree)", function()
		{
			commonHealth.testMaximumNumber(healthObject.mem, 'swapfree', healthObject.mem.swaptotal);
		});
		
	});
}

function handleFileSystem()
{
	describe("File System", function()
	{
		it("File System Array (fsSize)", function()
		{
			arrayFunctions.testPopulated(healthObject.fsSize);
			arrayFunctions.testAllType(healthObject.fsSize, 'object');
		});
		
		
		it("Drive Letter (fsSize.fs)", function()
		{
			testDriveLetter(healthObject.fsSize);
		});
		
		it("Drive Type (fsSize.type)", function()
		{
			arrayFunctions.testAllPropType(healthObject.fsSize, 'type', 'string');
		});
		
		it("Drive Size (fsSize.size)", function()
		{
			commonStorage.testTotalArray(healthObject.fsSize);
		});
		
		it("Amount Used (fsSize.used)", function()
		{
			arrayFunctions.testAllPropType(healthObject.fsSize, 'used', 'number');
			commonStorage.testUsedArray(healthObject.fsSize);
		});
		
		it("Used Percentage (fsSize.use)", function()
		{
			arrayFunctions.testAllPropType(healthObject.fsSize, 'use', 'number');
			commonStorage.testPercentagesArray(healthObject.fsSize);
		});
		
		it("Mount (fsSize.mount)", function()
		{
			arrayFunctions.testAllPropType(healthObject.fsSize, 'mount', 'string');
			commonStorage.testMountArray(healthObject.fsSize);
		});
		
	});
}


function handleEnvironment()
{
	describe("Environment", function()
	{
		it("Environment Object (environment)", function()
		{
			commonFunctions.testObject(healthObject.environment);
		});
		
		it("Temperature (environment.temperature)", function()
		{
			commonHealth.testEnvValue(healthObject.environment, 'temperature');
		});
		
		it("Humidity (environment.humidity)", function()
		{
			commonHealth.testEnvValue(healthObject.environment, 'humidity');
		});
		
		it("Dummy Flag (environment.isDummy)", function()
		{
			commonHealth.testEnvDummy(healthObject.environment);
		});
		
		
	});
}


function handleNetwork()
{
	describe("Network", function()
	{
		it("Network Interface Array (networkInterfaces)", function()
		{
			arrayFunctions.testPopulated(healthObject.networkInterfaces);
			arrayFunctions.testAllType(healthObject.networkInterfaces, 'object');
		});
		
		it("Interface Name (networkInterfaces.iface)", function()
		{
			arrayFunctions.testAllPropType(healthObject.networkInterfaces, 'iface', 'string');
		});
		
		it("IP Address v4 (networkInterfaces.ip4)", function()
		{
			arrayFunctions.testAllPropType(healthObject.networkInterfaces, 'ip4', 'string');
			commonApi.testArrayIpFour(healthObject.networkInterfaces, 'ip4', true);
		});
		
		it("IP Address v6 (networkInterfaces.ip6)", function()
		{
			arrayFunctions.testAllPropType(healthObject.networkInterfaces, 'ip6', 'string');
			commonApi.testArrayIpSix(healthObject.networkInterfaces, 'ip6', true);
		});
		
		it("MAC Address (networkInterfaces.mac)", function()
		{
			arrayFunctions.testAllPropType(healthObject.networkInterfaces, 'mac', 'string');
			commonApi.testArrayMac(healthObject.networkInterfaces, 'mac', true);
		});
		
		it("Internal Flag (networkInterfaces.internal)", function()
		{
			commonHealth.testNetworkInternal(healthObject.networkInterfaces);
		});
		
	});
}

function handleDatabase()
{
	describe("Database", function()
	{
		it("Database Array (databaseSize)", function()
		{
			arrayFunctions.testPopulated(healthObject.databaseSize);
			arrayFunctions.testAllType(healthObject.databaseSize, 'object');
			expect(healthObject.databaseSize.length).to.equal(2);
		});
		
		it("Database Name (databaseSize.name)", function()
		{
			arrayFunctions.testAllPropType(healthObject.databaseSize, 'name', 'string');
			commonDatabase.testNames(healthObject.databaseSize);
		});
		
		it("Database Size (databaseSize.size)", function()
		{
			arrayFunctions.testAllPropType(healthObject.databaseSize, 'size', 'number');
			commonDatabase.testSizesEmpty(healthObject.databaseSize);
		});
		
		it("Directory Flag (databaseSize.isDirectory)", function()
		{
			arrayFunctions.testAllPropType(healthObject.databaseSize, 'isDirectory', 'boolean');
			commonDatabase.testFolderFlags(healthObject.databaseSize);
		});
		
		it("Modified (databaseSize.modified)", function()
		{
			arrayFunctions.testAllPropType(healthObject.databaseSize, 'modified', 'number');
			commonApi.testPositiveNumberArray(healthObject.databaseSize, 'modified');
		});
		
		it("Created (databaseSize.created)", function()
		{
			arrayFunctions.testAllPropType(healthObject.databaseSize, 'created', 'number');
			commonApi.testPositiveNumberArray(healthObject.databaseSize, 'created');
		});
		
		it("Timestamps Valid (databaseSize.modified, created)", function()
		{
			commonApi.testWriteTimestampArray(healthObject.databaseSize, 'modified', 'created');
		});
		
	});
}


function handleLog()
{
	describe("Log", function()
	{
		var logObject = null;
		
		it("Log Array (logSize)", function(done)
		{
			arrayFunctions.testPopulated(healthObject.logSize);
			arrayFunctions.testAllType(healthObject.logSize, 'object');
			expect(healthObject.logSize.length).to.equal(1);
			
			logObject = healthObject.logSize[0];
			done();
		});
	
		it("Log Name (logSize.name)", function()
		{
			expect(logObject.name).to.equal("fox-controller.log");
		});
	
		it("Log Size (logSize.size)", function()
		{
			commonFunctions.testNumber(logObject.size);
			expect(logObject.size).to.be.at.least(0);
		});
	
		it("Directory Flag (logSize.isDirectory)", function()
		{
			expect(logObject.isDirectory).to.be.false;
		});
	
		it("Modified (logSize.modified)", function()
		{
			commonApi.testPositiveNumber(logObject, 'modified');
		});
	
		it("Created (logSize.created)", function()
		{
			commonApi.testPositiveNumber(logObject, 'created');
		});
		
		
		it("Timestamps Valid (logSize.modified, created)", function()
		{
			commonApi.testWriteTimestamp(logObject, 'modified', 'created');
		});
		
	});
}


function testDriveLetter(fsObject)
{
	arrayFunctions.testAllPropType(fsObject, 'fs', 'string');
	commonStorage.testLettersArray(fsObject);
}

module.exports = testHealthApi;