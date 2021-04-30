const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);

const subRequire = require("../sub-settings/get-rio-set");
const settingsFile = subRequire.getRemoteIoSettingsFile();


function testRemoteIoSettings()
{
	describe("Main", function()
	{
		checkRemoteIoSettingsFileExists();
		checkExports();
	});
}

function checkRemoteIoSettingsFileExists()
{
	describe("Settings File", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(settingsFile);
			expect(settingsFile).to.be.an("object");
		});
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





exports.callTestRemoteIoSettings = testRemoteIoSettings;