const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');
const osModule = require('os');

const commonPaths = require("../../../app/paths/files/app-paths");
const apiPaths = require(commonPaths.requestApiPaths);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);
const reqModule = require('request');

const apiCommonFile = require("../sub-requests/common-api");
const dbCommonFile = require("../sub-requests/common-database");
const healthCommonFile = require("../sub-requests/common-health");
const storageCommonFile = require("../sub-requests/common-storage");

var healthObject = null;
var currentPlatform = osModule.platform();

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
	var healthError = null;
	
	describe("Health Request", function()
	{
		it("Request Made", function(done)
		{
			healthUrl = apiRequestScript.callWriteApiUrl(apiPaths.adminApi, "health");
			
			reqModule(healthUrl, function(hError, hResult)
			{
				healthError = hError;
				healthReturn = hResult;
				done();
			});
		});
		
		it("Request Successful", function(done)
		{
			commonFunctionsFile.testNull(healthError);
			commonFunctionsFile.testPresent(healthReturn);
			done();
		});
		
		it("Results Read", function(done)
		{
			healthObject = apiRequestScript.callReadApiResponseObject(healthReturn);
			done();
		});
		
		it("Object Returned", function(done)
		{
			commonFunctionsFile.testPresent(healthObject);
			commonFunctionsFile.testType(healthObject, 'object');
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
			commonFunctionsFile.testObjectPropertyContent(healthObject, 'version', 'string');
		});
		
		it("Serial Number (serialNumber)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject, 'serialNumber');
			commonFunctionsFile.testObjectPropertyContent(healthObject, 'serialNumber', 'string');
			commonFunctionsFile.testString(healthObject.serialNumber);
		});
		
		it("Device (device)", function()
		{
			healthCommonFile.callTestHealthDeviceObject(healthObject, currentPlatform);
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
			apiCommonFile.callTestPositiveNumberProperty(healthObject.time, 'current');
		});
		
		it("Total Uptime (time.uptime)", function()
		{
			apiCommonFile.callTestPositiveNumberProperty(healthObject.time, 'uptime');
		});
		
		it("Timezone Offset Code (time.timezone)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject.time, 'timezone');
			commonFunctionsFile.testString(healthObject.time.timezone);
			healthCommonFile.callTestHealthTimezoneCodeValue(healthObject.time.timezone);
		});
		
		it("Timezone Name (time.timezoneName)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject.time, 'timezoneName');
			commonFunctionsFile.testString(healthObject.time.timezoneName);
		});
		
		it("Process Time (time.process)", function()
		{
			apiCommonFile.callTestPositiveNumberProperty(healthObject.time, 'process');
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
			apiCommonFile.callTestPositiveNumberProperty(healthObject.cpuCurrentSpeed, 'min');
		});
		
		it("Maximum (cpuCurrentSpeed.max)", function()
		{
			apiCommonFile.callTestPositiveNumberProperty(healthObject.cpuCurrentSpeed, 'max');
		});
		
		it("Average (cpuCurrentSpeed.avg)", function()
		{
			apiCommonFile.callTestPositiveNumberProperty(healthObject.cpuCurrentSpeed, 'avg');
		});
		
		it("Array (cpuCurrentSpeed.cores)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject.cpuCurrentSpeed, 'cores');
			commonFunctionsFile.testArray(healthObject.cpuCurrentSpeed.cores);
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
			apiCommonFile.callTestPositiveNumberProperty(healthObject.mem, 'total');
		});
		
		it("Currently Free (mem.free)", function()
		{
			healthCommonFile.callTestHealthNumberMaximum(healthObject.mem, 'free', healthObject.mem.total);
		});
		
		it("Currently in Use (mem.used)", function()
		{
			healthCommonFile.callTestHealthNumberMaximum(healthObject.mem, 'used', healthObject.mem.total);
		});
		
		it("Active Memory (mem.active)", function()
		{
			healthCommonFile.callTestHealthNumberMaximum(healthObject.mem, 'active', healthObject.mem.total);
		});
		
		it("Avaliable Memory (mem.available)", function()
		{
			healthCommonFile.callTestHealthNumberMaximum(healthObject.mem, 'available', healthObject.mem.total);
		});
		
		it("Buffer Cache (mem.buffcache)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject.mem, 'buffcache');
			commonFunctionsFile.testObjectPropertyContent(healthObject.mem, 'buffcache', 'number');
			commonFunctionsFile.testMost(healthObject.mem.buffcache, healthObject.mem.total);
		});
		
		it("Total Swap Bytes (mem.swaptotal)", function()
		{
			healthCommonFile.callTestHealthNumberMaximum(healthObject.mem, 'swaptotal', healthObject.mem.total);
		});
		
		it("Used Swap Bytes (mem.swapused)", function()
		{
			healthCommonFile.callTestHealthNumberMaximum(healthObject.mem, 'swapused', healthObject.mem.swaptotal);
		});
		
		it("Free Swap Bytes (mem.swapfree)", function()
		{
			healthCommonFile.callTestHealthNumberMaximum(healthObject.mem, 'swapfree', healthObject.mem.swaptotal);
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
			commonFunctionsFile.testArray(healthObject.fsSize);
			commonFunctionsFile.testAllElements(healthObject.fsSize, 'object');
		});
		
		it("File System Properties (fsSize)", function()
		{
			storageCommonFile.callTestDrivePropertyDefinitionsArray(healthObject.fsSize);
		});
		
		
		it("Drive Letter (fsSize.fs)", function()
		{
			testDriveLetter(healthObject.fsSize);
		});
		
		it("Drive Type (fsSize.type)", function()
		{
			commonFunctionsFile.testPropertyContents(healthObject.fsSize, 'type', 'string')
		});
		
		it("Drive Size (fsSize.size)", function()
		{
			storageCommonFile.callTestDriveTotalArray(healthObject.fsSize, currentPlatform);
		});
		
		it("Amount Used (fsSize.used)", function()
		{
			commonFunctionsFile.testPropertyContents(healthObject.fsSize, 'used', 'number');
			storageCommonFile.callTestDriveUsedArray(healthObject.fsSize);
		});
		
		it("Used Percentage (fsSize.use)", function()
		{
			commonFunctionsFile.testPropertyContents(healthObject.fsSize, 'use', 'number');
			storageCommonFile.callTestDrivePercentagesArray(healthObject.fsSize);
		});
		
		it("Mount (fsSize.mount)", function()
		{
			testDriveMount(healthObject.fsSize);
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
			healthCommonFile.callTestHealthEnvironmentValue(healthObject.environment, 'temperature', currentPlatform);
		});
		
		it("Humidity (environment.humidity)", function()
		{
			healthCommonFile.callTestHealthEnvironmentValue(healthObject.environment, 'humidity', currentPlatform);
		});
		
		it("Dummy Flag (environment.isDummy)", function()
		{
			healthCommonFile.callTestHealthEnvironmentDummy(healthObject.environment, currentPlatform);
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
			commonFunctionsFile.testArray(healthObject.networkInterfaces);
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
			apiCommonFile.callTestArrayIpFourValue(healthObject.networkInterfaces, 'ip4', true);
		});
		
		it("IP Address v6 (networkInterfaces.ip6)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.networkInterfaces, 'ip6');
			commonFunctionsFile.testPropertyContents(healthObject.networkInterfaces, 'ip6', 'string');
			apiCommonFile.callTestArrayIpSixValue(healthObject.networkInterfaces, 'ip6', true);
		});
		
		it("MAC Address (networkInterfaces.mac)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.networkInterfaces, 'mac');
			commonFunctionsFile.testPropertyContents(healthObject.networkInterfaces, 'mac', 'string');
			apiCommonFile.callTestArrayMacValue(healthObject.networkInterfaces, 'mac', true);
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
			commonFunctionsFile.testArray(healthObject.databaseSize);
			commonFunctionsFile.testAllElements(healthObject.databaseSize, 'object');
			expect(healthObject.databaseSize.length).to.equal(2);
		});
		
		it("Database Name (databaseSize.name)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.databaseSize, 'name');
			commonFunctionsFile.testPropertyContents(healthObject.databaseSize, 'name', 'string');
			dbCommonFile.callTestDatabaseNames(healthObject.databaseSize);
		});
		
		it("Database Size (databaseSize.size)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.databaseSize, 'size');
			commonFunctionsFile.testPropertyContents(healthObject.databaseSize, 'size', 'number');
			dbCommonFile.callTestDatabaseSizesEmpty(healthObject.databaseSize, currentPlatform);
		});
		
		it("Directory Flag (databaseSize.isDirectory)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.databaseSize, 'isDirectory');
			commonFunctionsFile.testPropertyContents(healthObject.databaseSize, 'isDirectory', 'boolean');
			dbCommonFile.callTestDatabaseFolderFlags(healthObject.databaseSize);
		});
		
		it("Modified (databaseSize.modified)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.databaseSize, 'modified');
			commonFunctionsFile.testPropertyContents(healthObject.databaseSize, 'modified', 'number');
			apiCommonFile.callTestPositiveNumberPropertyArray(healthObject.databaseSize, 'modified');
		});
		
		it("Created (databaseSize.created)", function()
		{
			commonFunctionsFile.testPropertyDefinitions(healthObject.databaseSize, 'created');
			commonFunctionsFile.testPropertyContents(healthObject.databaseSize, 'created', 'number');
			apiCommonFile.callTestPositiveNumberPropertyArray(healthObject.databaseSize, 'created');
		});
		
		it("Timestamps Valid (databaseSize.modified, created)", function()
		{
			apiCommonFile.callTestWriteTimestampArray(healthObject.databaseSize, 'modified', 'created');
		});
		
		
	});
}

function handleLog()
{
	describe("Log", function()
	{
		
		it("Log Array (logSize)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject, 'logSize');
			commonFunctionsFile.testArray(healthObject.logSize);
			commonFunctionsFile.testAllElements(healthObject.logSize, 'object');
			expect(healthObject.logSize.length).to.equal(1);
		});
	
		it("Log Name (logSize.name)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject.logSize[0], 'name');
			commonFunctionsFile.testString(healthObject.logSize[0].name);
			expect(healthObject.logSize[0].name).to.equal("fox-controller.log");
		});
	
		it("Log Size (logSize.size)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject.logSize[0], 'size');
			commonFunctionsFile.testObjectPropertyContent(healthObject.logSize[0], 'size', 'number');
			commonFunctionsFile.testZeroLeast(healthObject.logSize[0].size);
		});
	
		it("Directory Flag (logSize.isDirectory)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(healthObject.logSize[0], 'isDirectory');
			commonFunctionsFile.testObjectPropertyContent(healthObject.logSize[0], 'isDirectory', 'boolean');
			commonFunctionsFile.testFalse(healthObject.logSize[0].isDirectory);
		});
	
		it("Modified (logSize.modified)", function()
		{
			apiCommonFile.callTestPositiveNumberProperty(healthObject.logSize[0], 'modified');
		});
	
		it("Created (logSize.created)", function()
		{
			apiCommonFile.callTestPositiveNumberProperty(healthObject.logSize[0], 'created');
		});
		
		
		it("Timestamps Valid (logSize.modified, created)", function()
		{
			apiCommonFile.callTestWriteTimestamp(healthObject.logSize[0], 'modified', 'created');
		});
		
		
		
	});
}



function testDriveLetter(fsObject)
{
	commonFunctionsFile.testPropertyContents(fsObject, 'fs', 'string');
	storageCommonFile.callTestDriveLettersArray(fsObject, currentPlatform);
}

function testDriveMount(fsObject)
{
	commonFunctionsFile.testPropertyContents(fsObject, 'mount', 'string');
	storageCommonFile.callTestMountArray(fsObject, currentPlatform);
}






exports.callTestHealthApi = testHealthApi;