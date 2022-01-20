const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
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
			expect(settingsFile).to.exist;
		});
	});
}


function checkExports()
{
	describe("Settings Exports", function()
	{
		it("IO Properties", function()
		{
			expect(settingsFile.ioPrefixes).to.exist;
			expect(settingsFile.ioNames).to.exist;
			expect(settingsFile.ioTypes).to.exist;
		});
		
		it("Signal Properties", function()
		{
			expect(settingsFile.signalType).to.exist;
			expect(settingsFile.binSignal).to.exist;
		});
		
		it("Signal Type Function (getSignalType)", function()
		{
			commonFunctions.testFunction(settingsFile.getSignalType);
		});
		
		it("Parse Prefix Function (parseIoPrefix)", function()
		{
			commonFunctions.testFunction(settingsFile.parseIoPrefix);
		});
		
		it("Parse Index Function (parseIoIndex)", function()
		{
			commonFunctions.testFunction(settingsFile.parseIoIndex);
		});
		
	});
}

module.exports = testRemoteIoSettings;