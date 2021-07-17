const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const loadFoxFile = require(commonPaths.loadFox);
const settingsFile = loadFoxFile(foxPath.rioSettingsFile);


function testRemoteIoSettings()
{
	describe("Main", function()
	{
		checkFile();
		checkExports();
	});
}


function checkFile()
{
	describe("Remote IO Settings File", function()
	{
		it("Loaded", function()
		{
			commonFunctions.testPresent(settingsFile);
		});
	});
}


function checkExports()
{
	describe("Settings Exports", function()
	{
		it("IO Properties", function()
		{
			objectFunctions.testPropExists(settingsFile, 'ioPrefixes');
			objectFunctions.testPropExists(settingsFile, 'ioNames');
			objectFunctions.testPropExists(settingsFile, 'ioTypes');
		});
		
		it("Signal Properties", function()
		{
			objectFunctions.testPropExists(settingsFile, 'signalType');
			objectFunctions.testPropExists(settingsFile, 'binSignal');
		});
		
		it("Signal Type Function (getSignalType)", function()
		{
			objectFunctions.testPropExists(settingsFile, 'getSignalType');
			objectFunctions.testPropType(settingsFile, 'getSignalType', 'function');
		});
		
		it("Parse Prefix Function (parseIoPrefix)", function()
		{
			objectFunctions.testPropExists(settingsFile, 'parseIoPrefix');
			objectFunctions.testPropType(settingsFile, 'parseIoPrefix', 'function');
		});
		
		it("Parse Index Function (parseIoIndex)", function()
		{
			objectFunctions.testPropExists(settingsFile, 'parseIoIndex');
			objectFunctions.testPropType(settingsFile, 'parseIoIndex', 'function');
		});
		
	});
}

module.exports = testRemoteIoSettings;