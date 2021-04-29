const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);

const subRequire = require("../sub-settings/get-rio-set");
const settingsFile = subRequire.getRemoteIoSettingsFile();


function testRemoteIoProperties()
{
	describe("Properties", function()
	{
		checkSettingsIncluded();
		
		checkPrefixesProperty();
		checkNamesProperty();
		checkIoTypesProperty();
		checkSignalTypeProperty();
		checkBinarySignalProperty();
	});
}

function checkSettingsIncluded()
{
	describe("Settings File", function()
	{
		it("Included", function()
		{
			commonFunctionsFile.testPresent(settingsFile);
			commonFunctionsFile.testType(settingsFile, 'object');
		});
	});
}





function checkPrefixesProperty()
{
	describe("Property - IO Prefixes (ioPrefixes)", function()
	{
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'ioPrefixes', 'object');
		});
		
		it("All properties strings", function()
		{
			commonFunctionsFile.testObjectAllPropertiesType(settingsFile.ioPrefixes, 'string');
		});
		
		it("All Key-Value pairs match", function()
		{
			commonFunctionsFile.testObjectMatchKV(settingsFile.ioPrefixes);
		});
	});	
}

function checkNamesProperty()
{
	describe("Property - IO Names (ioNames)", function()
	{
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'ioNames', 'object');
		});
		
		it("All properties strings", function()
		{
			commonFunctionsFile.testObjectAllPropertiesType(settingsFile.ioNames, 'string');
		});
		
		it("Uses same prefixes", function()
		{
			commonFunctionsFile.testBothObjectsSameProperties(settingsFile.ioPrefixes, settingsFile.ioNames);
		});
	});	
}

function checkIoTypesProperty()
{
	describe("Property - IO Types (ioTypes)", function()
	{
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'ioTypes', 'object');
		});
		
		it("All properties strings", function()
		{
			commonFunctionsFile.testObjectAllPropertiesType(settingsFile.ioTypes, 'string');
		});
		
		it("All Key-Value pairs match", function()
		{
			commonFunctionsFile.testObjectMatchKVInsensitive(settingsFile.ioTypes);
		});
		
	});
}

function checkSignalTypeProperty()
{
	describe("Property - Signal Type (signalType)", function()
	{
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'signalType', 'object');
		});
		
		it("All properties numbers", function()
		{
			commonFunctionsFile.testObjectAllPropertiesType(settingsFile.signalType, 'number');
		});
	});
}

function checkBinarySignalProperty()
{
	describe("Property - Binary Signal (binSignal)", function()
	{
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'binSignal', 'object');
		});
		
		it("All properties strings", function()
		{
			commonFunctionsFile.testObjectAllPropertiesType(settingsFile.binSignal, 'string');
		});
		
		it("All Key-Value pairs match", function()
		{
			commonFunctionsFile.testObjectMatchKV(settingsFile.binSignal);
		});
	});
}

exports.callTestRemoteIoProperties = testRemoteIoProperties;