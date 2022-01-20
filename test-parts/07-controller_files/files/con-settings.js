const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
const loadFoxFile = require(commonPaths.loadFox);
const controllerSettingsFile = loadFoxFile(foxPath.settingsFile);


function testControllerSettings()
{
	describe("Controller Settings", function()
	{
		checkFile();
		handleFlagProperties();
		handlePathProperties();
	});
}


function checkFile()
{
	describe("File", function()
	{
		it("Loaded", function()
		{
			expect(controllerSettingsFile).to.exist;
		});
	});
}


function handleFlagProperties()
{
	describe("Flag Properties", function()
	{
		it("Production (isProd)", function()
		{
			commonFunctions.testBoolean(controllerSettingsFile.isProd);
		});
		
		it("Development (isDev)", function()
		{
			commonFunctions.testBoolean(controllerSettingsFile.isDev);
		});
		
	});
}


function handlePathProperties()
{
	describe("Path Properties", function()
	{
		it("User Storage Folder (userStoragePath)", function()
		{
			commonFunctions.testString(controllerSettingsFile.userStoragePath);
		});
		
		it("Database Folder (dbsPath)", function()
		{
			commonFunctions.testString(controllerSettingsFile.dbsPath);
		});
		
		it("Log Folder (logsPath)", function()
		{
			commonFunctions.testString(controllerSettingsFile.logsPath);
		});
		
		it("Log File (logFile)", function()
		{
			commonFunctions.testString(controllerSettingsFile.logFile);
		});
		
		it("Node RED Folder (flowsPath)", function()
		{
			commonFunctions.testString(controllerSettingsFile.flowsPath);
		});
		
	});
}


module.exports = testControllerSettings;