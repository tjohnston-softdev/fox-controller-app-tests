const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const subCommonPath = require(commonPaths.subCommonRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const rioCommonFile = require(subCommonPath.rioCommonFile);
const rioCheckFile = require("../sub-files/rio-factory_return");
const factoryFile = require(foxPath.rioFactoriesFile);

const remoteIoTestDevice = commonJsonObjectsFile.testDevice;


function testRemoteIoFactories()
{
	describe("Remote IO Factories", function()
	{
		handleRemoteIoModuleFunction();
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
		
		
		it("Call - Valid", function(done)
		{
			var moduleSpy = sinon.spy(factoryFile, 'RemoteIoModule');
			factoryFile.RemoteIoModule(remoteIoTestDevice);
			
			expect(moduleSpy.calledOnce).to.be.true;
			commonFunctionsFile.testPresent(moduleSpy.firstCall);
			expect(moduleSpy.firstCall.args).to.deep.equal([remoteIoTestDevice]);
			commonFunctionsFile.testPresent(moduleSpy.firstCall.returnValue);
			expect(moduleSpy.firstCall.returnValue).to.be.an("object");
			
			rioCheckFile.checkFactoryReturn(moduleSpy.firstCall.returnValue);
			
			moduleSpy.restore();
			done();
		});
		
		
		it("Call - Null", function()
		{
			var nullErrorObject = rioCommonFile.callCombineErrorObject(commonErrorStringsFile.deviceNotObject, null);
			callRemoteIoModuleInvalid(nullErrorObject);
		});
		
		it("Call - Invalid Object Type", function()
		{
			var typeErrorObject = rioCommonFile.callCombineErrorObject(commonErrorStringsFile.deviceNotObject, -1);
			callRemoteIoModuleInvalid(typeErrorObject);
		});
		
		
		it("Call - Invalid Device Type (deviceType)", function()
		{
			var deviceTypeErrorObject = rioCommonFile.callInvalidDeviceTypeObjectFactory(remoteIoTestDevice);
			callRemoteIoModuleInvalid(deviceTypeErrorObject.oType);
			callRemoteIoModuleInvalid(deviceTypeErrorObject.oProp);
		});
		
		
		it("Call - Invalid ID (id)", function()
		{	
			var idErrorObject = rioCommonFile.callInvalidIDStringObjectFactory(remoteIoTestDevice);
			callRemoteIoModuleInvalid(idErrorObject.oType);
			callRemoteIoModuleInvalid(idErrorObject.oProp);
		});
		
		
		it("Call - Invalid Manufacturer (maker)", function()
		{
			var manufacturerErrorObject = rioCommonFile.callInvalidManufacturerObjectFactory(remoteIoTestDevice);
			callRemoteIoModuleInvalid(manufacturerErrorObject.oType);
			callRemoteIoModuleInvalid(manufacturerErrorObject.oProp);
		});
		
		
		it("Call - Invalid Model (model)", function()
		{
			var modelErrorObject = rioCommonFile.callInvalidModelObjectFactory(remoteIoTestDevice);
			callRemoteIoModuleInvalid(modelErrorObject.oType);
			callRemoteIoModuleInvalid(modelErrorObject.oProp);
		});
		
		it("Call - Invalid Name (name)", function()
		{
			var nameErrorObject = rioCommonFile.callInvalidNameStringObject(remoteIoTestDevice);
			callRemoteIoModuleInvalid(nameErrorObject.oType);
			callRemoteIoModuleInvalid(nameErrorObject.oProp);
		});
		
		
		it("Call - Invalid IP Address (ipAddress)", function()
		{
			var ipErrorObject = rioCommonFile.callInvalidIPAddressObjectFactory(remoteIoTestDevice);
			callRemoteIoModuleInvalid(ipErrorObject.oType);
			callRemoteIoModuleInvalid(ipErrorObject.oProp);
		});
		
		it("Call - Invalid Enabled Flag (isEnabled", function()
		{
			var invalidEnabledObject = rioCommonFile.callInvalidEnabledFlagObject(remoteIoTestDevice);
			
			callRemoteIoModuleInvalid(invalidEnabledObject.oType);
			callRemoteIoModuleInvalid(invalidEnabledObject.oProp);
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


module.exports =
{
	callTestRemoteIoFactories: testRemoteIoFactories
};