const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const loadFoxFile = require(commonPaths.loadFox);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const rioInvalid = require(commonPaths.rioCommonInvalidFile);
const rioCheckFile = require("../sub-files/rio-factory_return");
const factoryFile = loadFoxFile(foxPath.rioFactoriesFile);

const remoteIoTestDevice = commonJsonObjectsFile.testDevice;


function testRemoteIoFactories()
{
	describe("Remote IO Factories", function()
	{
		checkFile();
		handleRemoteIoModuleFunction();
	});
}



function checkFile()
{
	describe("File", function()
	{
		it("Loaded", function()
		{
			commonFunctionsFile.testPresent(factoryFile);
		});
	});
}


function handleRemoteIoModuleFunction()
{
	describe("Function - Remote IO Module (RemoteIoModule)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(factoryFile.RemoteIoModule);
			expect(factoryFile.RemoteIoModule).to.be.a("function");
		});
		
		
		it("Call - Valid", function()
		{
			var moduleRes = factoryFile.RemoteIoModule(remoteIoTestDevice);
			
			commonFunctionsFile.testPresent(moduleRes);
			expect(moduleRes).to.be.an("object");
			rioCheckFile.checkFactoryReturn(moduleRes);
		});
		
		
		it("Call - Null", function()
		{
			var nullErrorObject = rioInvalid.getError(commonErrorStringsFile.deviceNotObject, null);
			callRemoteIoModuleInvalid(nullErrorObject);
		});
		
		it("Call - Invalid Object Type", function()
		{
			var typeErrorObject = rioInvalid.getError(commonErrorStringsFile.deviceNotObject, -1);
			callRemoteIoModuleInvalid(typeErrorObject);
		});
		
		
		it("Call - Invalid Device Type (deviceType)", function()
		{
			var deviceTypeErrorObject = rioInvalid.getDeviceType(remoteIoTestDevice);
			callRemoteIoModuleInvalid(deviceTypeErrorObject.typeCase);
			callRemoteIoModuleInvalid(deviceTypeErrorObject.propCase);
		});
		
		
		it("Call - Invalid ID (id)", function()
		{	
			var idErrorObject = rioInvalid.getIdFactory(remoteIoTestDevice);
			callRemoteIoModuleInvalid(idErrorObject.typeCase);
			callRemoteIoModuleInvalid(idErrorObject.propCase);
		});
		
		
		it("Call - Invalid Manufacturer (maker)", function()
		{
			var manufacturerErrorObject = rioInvalid.getManufacturer(remoteIoTestDevice, false);
			callRemoteIoModuleInvalid(manufacturerErrorObject.typeCase);
			callRemoteIoModuleInvalid(manufacturerErrorObject.propCase);
		});
		
		
		it("Call - Invalid Model (model)", function()
		{
			var modelErrorObject = rioInvalid.getModel(remoteIoTestDevice);
			callRemoteIoModuleInvalid(modelErrorObject.typeCase);
			callRemoteIoModuleInvalid(modelErrorObject.propCase);
		});
		
		it("Call - Invalid Name (name)", function()
		{
			var nameErrorObject = rioInvalid.getName(remoteIoTestDevice);
			callRemoteIoModuleInvalid(nameErrorObject.typeCase);
			callRemoteIoModuleInvalid(nameErrorObject.propCase);
		});
		
		
		it("Call - Invalid IP Address (ipAddress)", function()
		{
			var ipErrorObject = rioInvalid.getIpAddress(remoteIoTestDevice);
			callRemoteIoModuleInvalid(ipErrorObject.typeCase);
			callRemoteIoModuleInvalid(ipErrorObject.propCase);
		});
		
		it("Call - Invalid Enabled Flag (isEnabled", function()
		{
			var invalidEnabledObject = rioInvalid.getEnabled(remoteIoTestDevice);
			
			callRemoteIoModuleInvalid(invalidEnabledObject.typeCase);
			callRemoteIoModuleInvalid(invalidEnabledObject.propCase);
		});
		
	});
}


function callRemoteIoModuleInvalid(rioInvalidObject)
{
	var remoteComplete = false;
	var remoteError = "";
	var remoteRes = [];
	
	try
	{
		factoryFile.RemoteIoModule(rioInvalidObject.jsonObject);
		remoteComplete = true;
	}
	catch(e)
	{
		remoteComplete = false;
		remoteError = e.message;
	}
	
	remoteRes = [remoteComplete, remoteError];
	commonFunctionsFile.testInvalidFunctionResult(remoteRes, rioInvalidObject.errorMessage);
}


module.exports = testRemoteIoFactories;