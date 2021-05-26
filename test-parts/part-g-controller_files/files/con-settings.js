const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
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
			commonFunctionsFile.testObjectPropertyDefinition(controllerSettingsFile, 'isProd');
			commonFunctionsFile.testObjectPropertyContent(controllerSettingsFile, 'isProd', 'boolean');
		});
		
		it("Development (isDev)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(controllerSettingsFile, 'isDev');
			commonFunctionsFile.testObjectPropertyContent(controllerSettingsFile, 'isDev', 'boolean');
		});
		
	});
}


function handlePathProperties()
{
	describe("Path Properties", function()
	{
		it("User Storage Folder (userStoragePath)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(controllerSettingsFile, 'userStoragePath');
			commonFunctionsFile.testObjectPropertyContent(controllerSettingsFile, 'userStoragePath', 'string');
			commonFunctionsFile.testString(controllerSettingsFile.userStoragePath);
		});
		
		it("Database Folder (dbsPath)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(controllerSettingsFile, 'dbsPath');
			commonFunctionsFile.testObjectPropertyContent(controllerSettingsFile, 'dbsPath', 'string');
			commonFunctionsFile.testString(controllerSettingsFile.dbsPath);
		});
		
		it("Log Folder (logsPath)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(controllerSettingsFile, 'logsPath');
			commonFunctionsFile.testObjectPropertyContent(controllerSettingsFile, 'logsPath', 'string');
			commonFunctionsFile.testString(controllerSettingsFile.logsPath);
		});
		
		it("Log File (logFile)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(controllerSettingsFile, 'logFile');
			commonFunctionsFile.testObjectPropertyContent(controllerSettingsFile, 'logFile', 'string');
			commonFunctionsFile.testString(controllerSettingsFile.logFile);
		});
		
		it("Node RED Folder (flowsPath)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(controllerSettingsFile, 'flowsPath');
			commonFunctionsFile.testObjectPropertyContent(controllerSettingsFile, 'flowsPath', 'string');
			commonFunctionsFile.testString(controllerSettingsFile.flowsPath);
		});
		
	});
}

module.exports = testControllerSettings;