const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const serviceFile = getServiceMainRequirement(foxPath.serviceMainFile);


function testServiceMain()
{
	describe("Service Main", function()
	{
		checkRequiredServiceFiles();
		handleControllerObject();
		handleGeneralFunctions();
		handleRedFunctions();
		handleProcessFunctions();
	});
}

function checkRequiredServiceFiles()
{
	describe("Required Files", function()
	{
		it("Service Main (service.main)", function()
		{
			commonFunctionsFile.testPresent(serviceFile);
			expect(serviceFile).to.be.an("object");
		});
	});
}


function handleControllerObject()
{
	describe("Controller Object Property (controller)", function()
	{
		it("Property Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(serviceFile, 'controller');
		});
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(serviceFile, 'controller', 'object');
		});
		
	});
}


function handleGeneralFunctions()
{
	describe("Controller Object General Functions", function()
	{
		it("Get Health (controller.getHealth)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(serviceFile.controller, 'getHealth');
			commonFunctionsFile.testObjectPropertyContent(serviceFile.controller, 'getHealth', 'function');
		});
		
		it("Get Environment (controller.getEnvironment)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(serviceFile.controller, 'getEnvironment');
			commonFunctionsFile.testObjectPropertyContent(serviceFile.controller, 'getEnvironment', 'function');
		});
		
		it("Get Disk Space (controller.getDiskSpace)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(serviceFile.controller, 'getDiskSpace');
			commonFunctionsFile.testObjectPropertyContent(serviceFile.controller, 'getDiskSpace', 'function');
		});
		
		it("Get Database Size (controller.getDatabaseSize)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(serviceFile.controller, 'getDatabaseSize');
			commonFunctionsFile.testObjectPropertyContent(serviceFile.controller, 'getDatabaseSize', 'function');
		});
		
		it("Get Log Size (controller.getLogSize)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(serviceFile.controller, 'getLogSize');
			commonFunctionsFile.testObjectPropertyContent(serviceFile.controller, 'getLogSize', 'function');
		});
		
	});
}

function handleRedFunctions()
{
	describe("Controller Object Node RED Functions", function()
	{
		it("Stop (controller.stopFlows)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(serviceFile.controller, 'stopFlows');
			commonFunctionsFile.testObjectPropertyContent(serviceFile.controller, 'stopFlows', 'function');
		});
		
		it("Start (controller.startFlows)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(serviceFile.controller, 'startFlows');
			commonFunctionsFile.testObjectPropertyContent(serviceFile.controller, 'startFlows', 'function');
		});
	});
}

function handleProcessFunctions()
{
	describe("Controller Object Process Functions", function()
	{
		it("Restart (controller.restartProcess)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(serviceFile.controller, 'restartProcess');
			commonFunctionsFile.testObjectPropertyContent(serviceFile.controller, 'restartProcess', 'function');
		});
		
		it("Reboot (controller.rebootController)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(serviceFile.controller, 'rebootController');
			commonFunctionsFile.testObjectPropertyContent(serviceFile.controller, 'rebootController', 'function');
		});
		
		it("Factory Settings (controller.factoryReset)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(serviceFile.controller, 'factoryReset');
			commonFunctionsFile.testObjectPropertyContent(serviceFile.controller, 'factoryReset', 'function');
		});
	});
}








function getServiceMainRequirement(sPath)
{
	var res = null;
	
	try
	{
		res = require(sPath);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestServiceMain = testServiceMain;