const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelativeFile);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjectFile);

const controllerSettingsFile = getSettingsMainRequirement();


function testControllerSettings()
{
	describe("Controller Settings", function()
	{
		checkRequiredSettingsFiles();
		handleFlagProperties();
		handlePathProperties();
	});
}

function checkRequiredSettingsFiles()
{
	describe("Required Files", function()
	{
		it("Controller Settings (settings)", function()
		{
			commonFunctionsFile.testPresent(controllerSettingsFile);
			commonFunctionsFile.testType(controllerSettingsFile, 'object');
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






function getSettingsMainRequirement()
{
	var res = null;
	
	try
	{
		res = require(foxPath.settingsFile);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestControllerSettings = testControllerSettings;