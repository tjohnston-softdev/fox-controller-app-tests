const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const loadFoxFile = require(commonPaths.loadFox);
const serviceFile = loadFoxFile(foxPath.serviceMainFile);


function testServiceMain()
{
	describe("Service Main", function()
	{
		checkFile();
		handleControllerObject();
		handleGeneralFunctions();
		handleRedFunctions();
		handleProcessFunctions();
	});
}


function checkFile()
{
	describe("File", function()
	{
		it("Loaded", function()
		{
			expect(serviceFile).to.exist;
		});
	});
}


function handleControllerObject()
{
	describe("Controller Object Property (controller)", function()
	{
		it("Property Exists", function()
		{
			objectFunctions.testPropExists(serviceFile, 'controller');
		});
		
		it("Valid Type", function()
		{
			objectFunctions.testPropType(serviceFile, 'controller', 'object');
		});
		
	});
}


function handleGeneralFunctions()
{
	describe("Controller Object General Functions", function()
	{
		it("Get Health (controller.getHealth)", function()
		{
			objectFunctions.testPropExists(serviceFile.controller, 'getHealth');
			objectFunctions.testPropType(serviceFile.controller, 'getHealth', 'function');
		});
		
		it("Get Environment (controller.getEnvironment)", function()
		{
			objectFunctions.testPropExists(serviceFile.controller, 'getEnvironment');
			objectFunctions.testPropType(serviceFile.controller, 'getEnvironment', 'function');
		});
		
		it("Get Disk Space (controller.getDiskSpace)", function()
		{
			objectFunctions.testPropExists(serviceFile.controller, 'getDiskSpace');
			objectFunctions.testPropType(serviceFile.controller, 'getDiskSpace', 'function');
		});
		
		it("Get Database Size (controller.getDatabaseSize)", function()
		{
			objectFunctions.testPropExists(serviceFile.controller, 'getDatabaseSize');
			objectFunctions.testPropType(serviceFile.controller, 'getDatabaseSize', 'function');
		});
		
		it("Get Log Size (controller.getLogSize)", function()
		{
			objectFunctions.testPropExists(serviceFile.controller, 'getLogSize');
			objectFunctions.testPropType(serviceFile.controller, 'getLogSize', 'function');
		});
		
	});
}

function handleRedFunctions()
{
	describe("Controller Object Node RED Functions", function()
	{
		it("Stop (controller.stopFlows)", function()
		{
			objectFunctions.testPropExists(serviceFile.controller, 'stopFlows');
			objectFunctions.testPropType(serviceFile.controller, 'stopFlows', 'function');
		});
		
		it("Start (controller.startFlows)", function()
		{
			objectFunctions.testPropExists(serviceFile.controller, 'startFlows');
			objectFunctions.testPropType(serviceFile.controller, 'startFlows', 'function');
		});
	});
}

function handleProcessFunctions()
{
	describe("Controller Object Process Functions", function()
	{
		it("Restart (controller.restartProcess)", function()
		{
			objectFunctions.testPropExists(serviceFile.controller, 'restartProcess');
			objectFunctions.testPropType(serviceFile.controller, 'restartProcess', 'function');
		});
		
		it("Reboot (controller.rebootController)", function()
		{
			objectFunctions.testPropExists(serviceFile.controller, 'rebootController');
			objectFunctions.testPropType(serviceFile.controller, 'rebootController', 'function');
		});
		
		it("Factory Settings (controller.factoryReset)", function()
		{
			objectFunctions.testPropExists(serviceFile.controller, 'factoryReset');
			objectFunctions.testPropType(serviceFile.controller, 'factoryReset', 'function');
		});
	});
}

module.exports = testServiceMain;