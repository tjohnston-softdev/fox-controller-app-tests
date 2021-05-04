const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const settingsFile = require(foxPath.rioSettingsFile);


function testRemoteIoProperties()
{
	describe("Properties", function()
	{
		checkPrefixesProperty();
		checkNamesProperty();
		checkIoTypesProperty();
		checkSignalTypeProperty();
		checkBinarySignalProperty();
	});
}


function checkPrefixesProperty()
{
	describe("IO Prefixes (ioPrefixes)", function()
	{
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'ioPrefixes', 'object');
		});
		
		it("All Strings", function()
		{
			commonFunctionsFile.testObjectAllPropertiesType(settingsFile.ioPrefixes, 'string');
		});
		
		it("All Key-Value Pairs Match", function()
		{
			commonFunctionsFile.testObjectMatchKV(settingsFile.ioPrefixes);
		});
	});	
}

function checkNamesProperty()
{
	describe("IO Names (ioNames)", function()
	{
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'ioNames', 'object');
		});
		
		it("All Strings", function()
		{
			commonFunctionsFile.testObjectAllPropertiesType(settingsFile.ioNames, 'string');
		});
		
		it("Uses Same Prefixes", function()
		{
			commonFunctionsFile.testBothObjectsSameProperties(settingsFile.ioPrefixes, settingsFile.ioNames);
		});
	});	
}

function checkIoTypesProperty()
{
	describe("IO Types (ioTypes)", function()
	{
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'ioTypes', 'object');
		});
		
		it("All Strings", function()
		{
			commonFunctionsFile.testObjectAllPropertiesType(settingsFile.ioTypes, 'string');
		});
		
		it("All Key-Value Pairs Match", function()
		{
			commonFunctionsFile.testObjectMatchKVInsensitive(settingsFile.ioTypes);
		});
		
	});
}

function checkSignalTypeProperty()
{
	describe("Signal Type (signalType)", function()
	{
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'signalType', 'object');
		});
		
		it("All Numbers", function()
		{
			commonFunctionsFile.testObjectAllPropertiesType(settingsFile.signalType, 'number');
		});
	});
}

function checkBinarySignalProperty()
{
	describe("Binary Signal (binSignal)", function()
	{
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'binSignal', 'object');
		});
		
		it("All Strings", function()
		{
			commonFunctionsFile.testObjectAllPropertiesType(settingsFile.binSignal, 'string');
		});
		
		it("All Key-Value Pairs Match", function()
		{
			commonFunctionsFile.testObjectMatchKV(settingsFile.binSignal);
		});
	});
}


module.exports =
{
	callTestRemoteIoProperties: testRemoteIoProperties
};