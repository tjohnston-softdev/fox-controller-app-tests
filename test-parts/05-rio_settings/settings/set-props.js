const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const loadFoxFile = require(commonPaths.loadFox);
const settingsFile = loadFoxFile(foxPath.rioSettingsFile);


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
	describe("Property - IO Prefixes (ioPrefixes)", function()
	{
		it("Valid Type", function()
		{
			commonFunctions.testObject(settingsFile.ioPrefixes);
		});
		
		it("All Strings", function()
		{
			objectFunctions.testAllPropsType(settingsFile.ioPrefixes, 'string');
		});
		
		it("All Key-Value Pairs Match", function()
		{
			objectFunctions.testMatchKV(settingsFile.ioPrefixes);
		});
	});	
}

function checkNamesProperty()
{
	describe("Property - IO Names (ioNames)", function()
	{
		it("Valid Type", function()
		{
			commonFunctions.testObject(settingsFile.ioNames);
		});
		
		it("All Strings", function()
		{
			objectFunctions.testAllPropsType(settingsFile.ioNames, 'string');
		});
		
		it("Uses Same Prefixes", function()
		{
			objectFunctions.testSameProps(settingsFile.ioPrefixes, settingsFile.ioNames);
		});
	});	
}

function checkIoTypesProperty()
{
	describe("Property - IO Types (ioTypes)", function()
	{
		it("Valid Type", function()
		{
			commonFunctions.testObject(settingsFile.ioTypes);
		});
		
		it("All Strings", function()
		{
			objectFunctions.testAllPropsType(settingsFile.ioTypes, 'string');
		});
		
		it("All Key-Value Pairs Match", function()
		{
			objectFunctions.testMatchKVInsensitive(settingsFile.ioTypes);
		});
		
	});
}

function checkSignalTypeProperty()
{
	describe("Property - Signal Type (signalType)", function()
	{
		it("Valid Type", function()
		{
			commonFunctions.testObject(settingsFile.signalType);
		});
		
		it("All Numbers", function()
		{
			objectFunctions.testAllPropsType(settingsFile.signalType, 'number');
		});
	});
}

function checkBinarySignalProperty()
{
	describe("Property - Binary Signal (binSignal)", function()
	{	
		it("Valid Type", function()
		{
			commonFunctions.testObject(settingsFile.binSignal);
		});
		
		it("All Strings", function()
		{
			objectFunctions.testAllPropsType(settingsFile.binSignal, 'string');
		});
		
		it("All Key-Value Pairs Match", function()
		{
			objectFunctions.testMatchKV(settingsFile.binSignal);
		});
	});
}

module.exports = testRemoteIoProperties;