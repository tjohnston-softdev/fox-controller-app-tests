const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const settingsFile = require(foxPath.rioSettingsFile);


function testRemoteIoSettings()
{
	describe("Main", function()
	{
		checkExports();
	});
}


function checkExports()
{
	describe("Settings Exports", function()
	{
		it("IO Properties", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'ioPrefixes');
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'ioNames');
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'ioTypes');
		});
		
		it("Signal Properties", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'signalType');
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'binSignal');
		});
		
		it("Signal Type Function (getSignalType)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'getSignalType');
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'getSignalType', 'function');
		});
		
		it("Parse Prefix Function (parseIoPrefix)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'parseIoPrefix');
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'parseIoPrefix', 'function');
		});
		
		it("Parse Index Function (parseIoIndex)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'parseIoIndex');
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'parseIoIndex', 'function');
		});
		
	});
}

module.exports =
{
	callTestRemoteIoSettings: testRemoteIoSettings
};