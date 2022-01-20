const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
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
		it("Valid Object", function()
		{
			commonFunctions.testObject(serviceFile.controller);
		});
		
	});
}


function handleGeneralFunctions()
{
	describe("Controller Object General Functions", function()
	{
		it("Get Health (controller.getHealth)", function()
		{
			commonFunctions.testFunction(serviceFile.controller.getHealth);
		});
		
		it("Get Environment (controller.getEnvironment)", function()
		{
			commonFunctions.testFunction(serviceFile.controller.getEnvironment);
		});
		
		it("Get Disk Space (controller.getDiskSpace)", function()
		{
			commonFunctions.testFunction(serviceFile.controller.getDiskSpace);
		});
		
		it("Get Database Size (controller.getDatabaseSize)", function()
		{
			commonFunctions.testFunction(serviceFile.controller.getDatabaseSize);
		});
		
		it("Get Log Size (controller.getLogSize)", function()
		{
			commonFunctions.testFunction(serviceFile.controller.getLogSize);
		});
		
	});
}

function handleRedFunctions()
{
	describe("Controller Object Node RED Functions", function()
	{
		it("Stop (controller.stopFlows)", function()
		{
			commonFunctions.testFunction(serviceFile.controller.stopFlows);
		});
		
		it("Start (controller.startFlows)", function()
		{
			commonFunctions.testFunction(serviceFile.controller.startFlows);
		});
	});
}

function handleProcessFunctions()
{
	describe("Controller Object Process Functions", function()
	{
		it("Restart (controller.restartProcess)", function()
		{
			commonFunctions.testFunction(serviceFile.controller.restartProcess);
		});
		
		it("Reboot (controller.rebootController)", function()
		{
			commonFunctions.testFunction(serviceFile.controller.rebootController);
		});
		
		it("Factory Settings (controller.factoryReset)", function()
		{
			commonFunctions.testFunction(serviceFile.controller.factoryReset);
		});
	});
}

module.exports = testServiceMain;