const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const os = require('os');
const needle = require("needle");

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);

const commonApi = require("../sub-requests/common-api");
const commonDatabase = require("../sub-requests/common-database");
const commonHealth = require("../sub-requests/common-health");
const commonStorage = require("../sub-requests/common-storage");

var healthObject = null;
var currentPlatform = os.platform();

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
	var healthRequestError = null;
	var healthRequestReturn = null;
	
	describe("Health Request", function()
	{
		it("Request Made", function(done)
		{
			healthUrl = apiRequestScript.callWriteApiUrl(apiPaths.adminApi, "health");
			
			needle.get(healthUrl, function(healthErr, healthRes)
			{
				healthRequestError = healthErr;
				healthRequestReturn = healthRes;
				done();
			});
		});
		
		
		it("Request Successful", function(done)
		{
			expect(healthRequestError).to.be.null;
			commonFunctionsFile.testPresent(healthRequestReturn);
			expect(healthRequestReturn).to.be.an("object");
			apiRequestScript.callValidateApiResponse(healthRequestReturn);
			done();
		});
		
		
		it("Results Read", function(done)
		{
			healthObject = apiRequestScript.callReadApiResponseObject(healthRequestReturn);
			done();
		});
		
		it("Object Returned", function(done)
		{
			commonFunctionsFile.testPresent(healthObject);
			expect(healthObject).to.be.an("object");
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
			commonFunctionsFile.testObjectPropertyDefinition(healthObject, 'version');
			commonFunctionsFile.testString(healthObject.version);
		});
		
		it("Serial Number (serialNumber)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject, 'serialNumber');
			commonFunctionsFile.testString(healthObject.serialNumber);
		});
		
		it("Device (device)", function()
		{
			commonHealth.callTestHealthDeviceObject(healthObject, currentPlatform);
		});
		
	});
}


function handleTime()
{
	describe("Time", function()
	{
		it("Time Object (time)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject, 'time');
			commonFunctionsFile.testObjectPropertyContent(healthObject, 'time', 'object');
		});
		
		it("Current Time (time.current)", function()
		{
			commonApi.callTestPositiveNumberProperty(healthObject.time, 'current');
		});
		
		it("Total Uptime (time.uptime)", function()
		{
			commonApi.callTestPositiveNumberProperty(healthObject.time, 'uptime');
		});
		
		it("Timezone Offset Code (time.timezone)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject.time, 'timezone');
			commonFunctionsFile.testString(healthObject.time.timezone);
			commonHealth.callTestHealthTimezoneCodeValue(healthObject.time.timezone);
		});
		
		it("Timezone Name (time.timezoneName)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject.time, 'timezoneName');
			commonFunctionsFile.testString(healthObject.time.timezoneName);
		});
		
		it("Process Time (time.process)", function()
		{
			commonApi.callTestPositiveNumberProperty(healthObject.time, 'process');
		});
		
		
	});
}

function handleSpeed()
{
	describe("Computer Speed", function()
	{
		it("Current Speed Object (cpuCurrentSpeed)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject, 'cpuCurrentSpeed');
			commonFunctionsFile.testObjectPropertyContent(healthObject, 'cpuCurrentSpeed', 'object');
		});
		
		it("Minimum (cpuCurrentSpeed.min)", function()
		{
			commonApi.callTestPositiveNumberProperty(healthObject.cpuCurrentSpeed, 'min');
		});
		
		it("Maximum (cpuCurrentSpeed.max)", function()
		{
			commonApi.callTestPositiveNumberProperty(healthObject.cpuCurrentSpeed, 'max');
		});
		
		it("Average (cpuCurrentSpeed.avg)", function()
		{
			commonApi.callTestPositiveNumberProperty(healthObject.cpuCurrentSpeed, 'avg');
		});
		
		it("Array (cpuCurrentSpeed.cores)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject.cpuCurrentSpeed, 'cores');
			commonFunctionsFile.testArrayPopulated(healthObject.cpuCurrentSpeed.cores);
			commonFunctionsFile.testAllElements(healthObject.cpuCurrentSpeed.cores, 'number');
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
			commonFunctionsFile.testObjectPropertyDefinition(healthObject, 'mem');
			commonFunctionsFile.testObjectPropertyContent(healthObject, 'mem', 'object');
		});
		
		it("Total Amount (mem.total)", function()
		{
			commonApi.callTestPositiveNumberProperty(healthObject.mem, 'total');
		});
		
		it("Currently Free (mem.free)", function()
		{
			commonHealth.callTestHealthNumberMaximum(healthObject.mem, 'free', healthObject.mem.total);
		});
		
		it("Currently in Use (mem.used)", function()
		{
			commonHealth.callTestHealthNumberMaximum(healthObject.mem, 'used', healthObject.mem.total);
		});
		
		it("Active Memory (mem.active)", function()
		{
			commonHealth.callTestHealthNumberMaximum(healthObject.mem, 'active', healthObject.mem.total);
		});
		
		it("Avaliable Memory (mem.available)", function()
		{
			commonHealth.callTestHealthNumberMaximum(healthObject.mem, 'available', healthObject.mem.total);
		});
		
		it("Buffer Cache (mem.buffcache)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject.mem, 'buffcache');
			commonFunctionsFile.testObjectPropertyContent(healthObject.mem, 'buffcache', 'number');
			expect(healthObject.mem.buffcache).to.be.at.most(healthObject.mem.total);
		});
		
		it("Total Swap Bytes (mem.swaptotal)", function()
		{
			commonHealth.callTestHealthNumberMaximum(healthObject.mem, 'swaptotal', healthObject.mem.total);
		});
		
		it("Used Swap Bytes (mem.swapused)", function()
		{
			commonHealth.callTestHealthNumberMaximum(healthObject.mem, 'swapused', healthObject.mem.swaptotal);
		});
		
		it("Free Swap Bytes (mem.swapfree)", function()
		{
			commonHealth.callTestHealthNumberMaximum(healthObject.mem, 'swapfree', healthObject.mem.swaptotal);
		});
		
	});
}

function handleFileSystem()
{
	describe("File System", function()
	{
		
		it("File System Array (fsSize)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject, 'fsSize');
			commonFunctionsFile.testArrayPopulated(healthObject.fsSize);
			commonFunctionsFile.testAllElements(healthObject.fsSize, 'object');
		});
		
		it("File System Properties (fsSize)", function()
		{
			commonStorage.callTestDrivePropertyDefinitionsArray(healthObject.fsSize);
		});
		
		
		it("Drive Letter (fsSize.fs)", function()
		{
			testDriveLetter(healthObject.fsSize);
		});
		
		it("Drive Type (fsSize.type)", function()
		{
			commonFunctionsFile.testPropertyContents(healthObject.fsSize, 'type', 'string');
		});
		
		it("Drive Size (fsSize.size)", function()
		{
			commonStorage.callTestDriveTotalArray(healthObject.fsSize, currentPlatform);
		});
		
		it("Amount Used (fsSize.used)", function()
		{
			commonFunctionsFile.testPropertyContents(healthObject.fsSize, 'used', 'number');
			commonStorage.callTestDriveUsedArray(healthObject.fsSize);
		});
		
		it("Used Percentage (fsSize.use)", function()
		{
			commonFunctionsFile.testPropertyContents(healthObject.fsSize, 'use', 'number');
			commonStorage.callTestDrivePercentagesArray(healthObject.fsSize);
		});
		
		it("Mount (fsSize.mount)", function()
		{
			commonFunctionsFile.testPropertyContents(healthObject.fsSize, 'mount', 'string');
			commonStorage.callTestMountArray(healthObject.fsSize, currentPlatform);
		});
		
	});
}


function handleEnvironment()
{
	describe("Environment", function()
	{
		it("Environment Object (environment)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject, 'environment');
			commonFunctionsFile.testObjectPropertyContent(healthObject, 'environment', 'object');
		});
		
		it("Temperature (environment.temperature)", function()
		{
			commonHealth.callTestHealthEnvironmentValue(healthObject.environment, 'temperature', currentPlatform);
		});
		
		it("Humidity (environment.humidity)", function()
		{
			commonHealth.callTestHealthEnvironmentValue(healthObject.environment, 'humidity', currentPlatform);
		});
		
		it("Dummy Flag (environment.isDummy)", function()
		{
			commonHealth.callTestHealthEnvironmentDummy(healthObject.environment, currentPlatform);
		});
		
		
	});
}


function handleNetwork()
{
	describe("Network", function()
	{
		it("Network Interface Array (networkInterfaces)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject, 'networkInterfaces');
			commonFunctionsFile.testArrayPopulated(healthObject.networkInterfaces);
			commonFunctionsFile.testAllElements(healthObject.networkInterfaces, 'object');
		});
		
		it("Interface Name (networkInterfaces.iface)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.networkInterfaces, 'iface');
			commonFunctionsFile.testPropertyContents(healthObject.networkInterfaces, 'iface', 'string');
		});
		
		it("IP Address v4 (networkInterfaces.ip4)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.networkInterfaces, 'ip4');
			commonFunctionsFile.testPropertyContents(healthObject.networkInterfaces, 'ip4', 'string');
			commonApi.callTestArrayIpFourValue(healthObject.networkInterfaces, 'ip4', true);
		});
		
		it("IP Address v6 (networkInterfaces.ip6)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.networkInterfaces, 'ip6');
			commonFunctionsFile.testPropertyContents(healthObject.networkInterfaces, 'ip6', 'string');
			commonApi.callTestArrayIpSixValue(healthObject.networkInterfaces, 'ip6', true);
		});
		
		it("MAC Address (networkInterfaces.mac)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.networkInterfaces, 'mac');
			commonFunctionsFile.testPropertyContents(healthObject.networkInterfaces, 'mac', 'string');
			commonApi.callTestArrayMacValue(healthObject.networkInterfaces, 'mac', true);
		});
		
		it("Internal Flag (networkInterfaces.internal)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.networkInterfaces, 'internal');
			commonFunctionsFile.testPropertyContents(healthObject.networkInterfaces, 'internal', 'boolean');
		});
		
	});
}

function handleDatabase()
{
	describe("Database", function()
	{
		
		it("Database Array (databaseSize)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject, 'databaseSize');
			commonFunctionsFile.testArrayPopulated(healthObject.databaseSize);
			commonFunctionsFile.testAllElements(healthObject.databaseSize, 'object');
			expect(healthObject.databaseSize.length).to.equal(2);
		});
		
		it("Database Name (databaseSize.name)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.databaseSize, 'name');
			commonFunctionsFile.testPropertyContents(healthObject.databaseSize, 'name', 'string');
			commonDatabase.callTestDatabaseNames(healthObject.databaseSize);
		});
		
		it("Database Size (databaseSize.size)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.databaseSize, 'size');
			commonFunctionsFile.testPropertyContents(healthObject.databaseSize, 'size', 'number');
			commonDatabase.callTestDatabaseSizesEmpty(healthObject.databaseSize, currentPlatform);
		});
		
		it("Directory Flag (databaseSize.isDirectory)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.databaseSize, 'isDirectory');
			commonFunctionsFile.testPropertyContents(healthObject.databaseSize, 'isDirectory', 'boolean');
			commonDatabase.callTestDatabaseFolderFlags(healthObject.databaseSize);
		});
		
		it("Modified (databaseSize.modified)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.databaseSize, 'modified');
			commonFunctionsFile.testPropertyContents(healthObject.databaseSize, 'modified', 'number');
			commonApi.callTestPositiveNumberPropertyArray(healthObject.databaseSize, 'modified');
		});
		
		it("Created (databaseSize.created)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.databaseSize, 'created');
			commonFunctionsFile.testPropertyContents(healthObject.databaseSize, 'created', 'number');
			commonApi.callTestPositiveNumberPropertyArray(healthObject.databaseSize, 'created');
		});
		
		it("Timestamps Valid (databaseSize.modified, created)", function()
		{
			commonApi.callTestWriteTimestampArray(healthObject.databaseSize, 'modified', 'created');
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
			commonFunctionsFile.testObjectPropertyDefinition(healthObject, 'logSize');
			commonFunctionsFile.testArrayPopulated(healthObject.logSize);
			commonFunctionsFile.testAllElements(healthObject.logSize, 'object');
			expect(healthObject.logSize.length).to.equal(1);
			
			logObject = healthObject.logSize[0];
			done();
		});
	
		it("Log Name (logSize.name)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(logObject, 'name');
			expect(logObject.name).to.equal("fox-controller.log");
		});
	
		it("Log Size (logSize.size)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(logObject, 'size');
			commonFunctionsFile.testObjectPropertyContent(logObject, 'size', 'number');
			expect(logObject.size).to.be.at.least(0);
		});
	
		it("Directory Flag (logSize.isDirectory)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(logObject, 'isDirectory');
			expect(logObject.isDirectory).to.be.false;
		});
	
		it("Modified (logSize.modified)", function()
		{
			commonApi.callTestPositiveNumberProperty(logObject, 'modified');
		});
	
		it("Created (logSize.created)", function()
		{
			commonApi.callTestPositiveNumberProperty(logObject, 'created');
		});
		
		
		it("Timestamps Valid (logSize.modified, created)", function()
		{
			commonApi.callTestWriteTimestamp(logObject, 'modified', 'created');
		});
		
	});
}



function testDriveLetter(fsObject)
{
	commonFunctionsFile.testPropertyContents(fsObject, 'fs', 'string');
	commonStorage.callTestDriveLettersArray(fsObject, currentPlatform);
}



module.exports =
{
	callTestHealthApi: testHealthApi
};