const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
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
			commonFunctionsFile.testPresent(controllerSettingsFile);
		});
	});
}


function handleFlagProperties()
{
	describe("Flag Properties", function()
	{
		it("Production (isProd)", function()
		{
			objectFunctions.testPropExists(controllerSettingsFile, 'isProd');
			objectFunctions.testPropType(controllerSettingsFile, 'isProd', 'boolean');
		});
		
		it("Development (isDev)", function()
		{
			objectFunctions.testPropExists(controllerSettingsFile, 'isDev');
			objectFunctions.testPropType(controllerSettingsFile, 'isDev', 'boolean');
		});
		
	});
}


function handlePathProperties()
{
	describe("Path Properties", function()
	{
		it("User Storage Folder (userStoragePath)", function()
		{
			objectFunctions.testPropExists(controllerSettingsFile, 'userStoragePath');
			commonFunctionsFile.testString(controllerSettingsFile.userStoragePath);
		});
		
		it("Database Folder (dbsPath)", function()
		{
			objectFunctions.testPropExists(controllerSettingsFile, 'dbsPath');
			commonFunctionsFile.testString(controllerSettingsFile.dbsPath);
		});
		
		it("Log Folder (logsPath)", function()
		{
			objectFunctions.testPropExists(controllerSettingsFile, 'logsPath');
			commonFunctionsFile.testString(controllerSettingsFile.logsPath);
		});
		
		it("Log File (logFile)", function()
		{
			objectFunctions.testPropExists(controllerSettingsFile, 'logFile');
			commonFunctionsFile.testString(controllerSettingsFile.logFile);
		});
		
		it("Node RED Folder (flowsPath)", function()
		{
			objectFunctions.testPropExists(controllerSettingsFile, 'flowsPath');
			commonFunctionsFile.testString(controllerSettingsFile.flowsPath);
		});
		
	});
}

module.exports = testControllerSettings;