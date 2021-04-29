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

const commonFile = getRemoteIoCommonFile();
const deviceModelFile = getDeviceClassFile(foxPath.storedDeviceClassFile);
const deviceConnectFile = getDeviceClassFile(foxPath.connectedDeviceClassFile);

const testDeviceValidModel = commonJsonObjectsFile.testDevice;
const testDeviceInvalidModel = cloneInvalidModel();

var storeDeviceDesc = "Stored Device Class (StoredDevice, device-model.class)";
var connectDesc = "Connected Device Class (ConnectedDevice, device.class)";

var storeDeviceSpy = null;
var connectSpy = null;



function testDeviceClasses()
{
	describe("Device Classes", function()
	{
		handleDeviceFiles();
		handleDeviceConstructors();
		handleDeviceClasses();
	});
}


function handleDeviceFiles()
{
	describe("Device Class Files", function()
	{
		it("Device Model (device-model.class)", function()
		{
			commonFunctionsFile.testPresent(deviceModelFile);
			commonFunctionsFile.testType(deviceModelFile, 'object');
		});
		
		it("Connected Device (device.class)", function()
		{
			commonFunctionsFile.testPresent(deviceConnectFile);
			commonFunctionsFile.testType(deviceConnectFile, 'object');
		});
		
	});
}


function handleDeviceConstructors()
{
	describe("Device Class Constructors", function()
	{
		it(storeDeviceDesc, function(done)
		{
			commonFunctionsFile.testPresent(deviceModelFile.StoredDevice);
			commonFunctionsFile.testType(deviceModelFile.StoredDevice, 'function');
			storeDeviceSpy = sinon.spy(deviceModelFile, 'StoredDevice');
			
			done();
		});
		
		it(connectDesc, function(done)
		{
			commonFunctionsFile.testPresent(deviceConnectFile.ConnectedDevice);
			commonFunctionsFile.testType(deviceConnectFile.ConnectedDevice, 'function');
			connectSpy = sinon.spy(deviceConnectFile, 'ConnectedDevice');
			
			done();
		});
		
	});
}




function handleDeviceClasses()
{
	var storeDeviceValid = null;
	var storeDeviceInvalid = null;
	
	describe(storeDeviceDesc, function()
	{
		it("Call - Valid Model", function(done)
		{
			new deviceModelFile.StoredDevice(testDeviceValidModel);
			
			commonFunctionsFile.testTrue(storeDeviceSpy.calledOnce);
			expect(storeDeviceSpy.firstCall.args).to.deep.equal([testDeviceValidModel]);
			commonFunctionsFile.testPresent(storeDeviceSpy.firstCall.returnValue);
			commonFunctionsFile.testType(storeDeviceSpy.firstCall.returnValue, 'object');
			storeDeviceValid = storeDeviceSpy.firstCall.returnValue;
			
			verifyStoredDeviceReturn(testDeviceValidModel, storeDeviceValid);
			storeDeviceSpy.restore();
			
			done();
		});
		
		it("Call - Null", function()
		{
			var nullObject = commonFile.callCombineErrorObject(commonErrorStringsFile.deviceNotObject, null);
			callStoredDeviceUnsupported(nullObject);
		});
		
		it("Call - Invalid Object Type", function()
		{
			var invalidTypeObject = commonFile.callCombineErrorObject(commonErrorStringsFile.deviceNotObject, -1);
			callStoredDeviceUnsupported(invalidTypeObject);
		});
		
		it("Call - Invalid ID (id)", function()
		{
			var invalidIdObject = commonFile.callInvalidIDStringObjectFactory(testDeviceValidModel);
			
			callStoredDeviceUnsupported(invalidIdObject.oType);
			callStoredDeviceUnsupported(invalidIdObject.oProp);
		});
		
		it("Call - Invalid Device Type (deviceType)", function()
		{
			var invalidTypeObject = commonFile.callInvalidDeviceTypeObject(testDeviceValidModel);
			
			callStoredDeviceUnsupported(invalidTypeObject.oValue);
			callStoredDeviceUnsupported(invalidTypeObject.oType);
			callStoredDeviceUnsupported(invalidTypeObject.oProp);
		});
		
		it("Call - Invalid Manufacturer (maker)", function()
		{
			var invalidManufacturerObject = commonFile.callInvalidManufacturerObject(testDeviceValidModel, false);
			
			callStoredDeviceUnsupported(invalidManufacturerObject.oValue);
			callStoredDeviceUnsupported(invalidManufacturerObject.oType);
			callStoredDeviceUnsupported(invalidManufacturerObject.oProp);
		});
		
		it("Call - Invalid Model (model)", function()
		{
			var invalidModelObject = commonFile.callInvalidModelObject(testDeviceValidModel);
			
			callStoredDeviceUnsupported(invalidModelObject.oValue);
			callStoredDeviceUnsupported(invalidModelObject.oType);
			callStoredDeviceUnsupported(invalidModelObject.oProp);
		});
		
		it("Call - Invalid Name (name)", function()
		{
			var invalidNameObject = commonFile.callInvalidNameStringObject(testDeviceValidModel);
			
			callStoredDeviceUnsupported(invalidNameObject.oType);
			callStoredDeviceUnsupported(invalidNameObject.oProp);
		});
		
		it("Call - Invalid IP Address (ipAddress)", function()
		{
			var invalidAddressObject = commonFile.callInvalidIPAddressObject(testDeviceValidModel);
			
			callStoredDeviceUnsupported(invalidAddressObject.oFormat);
			callStoredDeviceUnsupported(invalidAddressObject.oValue);
			callStoredDeviceUnsupported(invalidAddressObject.oType);
			callStoredDeviceUnsupported(invalidAddressObject.oProp);
		});
		
		it("Call - Invalid Enabled Flag (isEnabled)", function()
		{
			var invalidEnabledObject = commonFile.callInvalidEnabledFlagObject(testDeviceValidModel);
			
			callStoredDeviceUnsupported(invalidEnabledObject.oType);
			callStoredDeviceUnsupported(invalidEnabledObject.oProp);
		});
		
		it("Call - Invalid MAC Address (macAddress)", function()
		{
			var invalidMacObject = commonFile.callInvalidMacAddressObject(testDeviceValidModel);
			callStoredDeviceUnsupported(invalidMacObject.oType);
		});
		
	});
	
	
	describe(connectDesc, function()
	{
		
		it("Call - Valid Model", function(done)
		{
			new deviceConnectFile.ConnectedDevice(storeDeviceValid);
			
			commonFunctionsFile.testTrue(connectSpy.calledOnce);
			expect(connectSpy.firstCall.args).to.deep.equal([storeDeviceValid]);
			commonFunctionsFile.testPresent(connectSpy.firstCall.returnValue);
			commonFunctionsFile.testType(connectSpy.firstCall.returnValue, 'object');
			commonFunctionsFile.testObjectPropertyDefinition(connectSpy.firstCall.returnValue, 'storedDevice');
			commonFunctionsFile.testObjectPropertyContent(connectSpy.firstCall.returnValue, 'storedDevice', 'object');
			expect(connectSpy.firstCall.returnValue.storedDevice).to.equal(storeDeviceValid);
			
			connectSpy.restore();
			done();
		});
		
		it("Call - Null", function()
		{
			callConnectedDeviceUnsupported(null, commonErrorStringsFile.connectObject);
		});
		
		it("Call - Invalid Object Type", function()
		{
			callConnectedDeviceUnsupported(-1, commonErrorStringsFile.connectObject);
		});
		
		it("Call - Invalid ID (id)", function()
		{
			callConnectedDeviceStringProperty("id");
		});
		
		it("Call - Invalid Device Type (deviceType)", function()
		{
			callConnectedDeviceStringProperty("deviceType");
		});
		
		it("Call - Invalid Manufacturer (maker)", function()
		{
			callConnectedDeviceStringProperty("maker");
		});
		
		it("Call - Invalid Model (model)", function()
		{
			callConnectedDeviceStringProperty("model");
			callConnectedDeviceUnknown();
		});
		
		it("Call - Invalid Name (name)", function()
		{
			callConnectedDeviceStringProperty("name");
		});
		
		it("Call - Invalid IP Address (ipAddress)", function()
		{
			callConnectedDeviceStringProperty("ipAddress");
		});
		
		it("Call - Invalid Enabled Flag (isEnabled)", function()
		{
			callConnectedDeviceBooleanProperty("isEnabled");
		});
		
		it("Call - Invalid MAC Address (macAddress)", function()
		{
			callConnectedDeviceStringProperty("macAddress");
		});
		
		
	});
}


function callStoredDeviceUnsupported(callObject)
{
	var comp = false;
	var err = "";
	
	try
	{
		new deviceModelFile.StoredDevice(callObject.jsonObject);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		err = e.message;
	}
	
	var callResult = [comp, err];
	commonFunctionsFile.testInvalidFunctionResult(callResult, callObject.errorMessage);
}


function callConnectedDeviceUnsupported(a, expectedError)
{
	var comp = false;
	var err = "";
	
	try
	{
		new deviceConnectFile.ConnectedDevice(a);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		err = e.message;
	}
	
	var callResult = [comp, err];
	commonFunctionsFile.testInvalidFunctionResult(callResult, expectedError);
}


function callConnectedDeviceUnknown()
{
	var unknownObject = cloneInvalidModel();
	
	unknownObject.maker = "Unknown Manufacturer";
	unknownObject.model = "Unknown Model";
	
	callConnectedDeviceUnsupported(unknownObject, "Unknown Model is not supported yet!");
}



function callConnectedDeviceStringProperty(sName)
{
	var sInvalid = -1;
	var stringErrorText = commonErrorStringsFile.writeConnectDeviceProperty(sName, "string", sInvalid);
	callConnectedDeviceStructureError(sName, sInvalid, stringErrorText);
}

function callConnectedDeviceBooleanProperty(bName)
{
	var bInvalid = -1;
	var booleanErrorText = commonErrorStringsFile.writeConnectDeviceProperty(bName, "boolean", bInvalid);
	callConnectedDeviceStructureError(bName, bInvalid, booleanErrorText);
}

function callConnectedDeviceStructureError(propName, propValue, propError)
{
	var invalidObject = cloneInvalidModel();
	var structureChanged = false;
	var thrownError = "";
	
	
	try
	{
		invalidObject[propName] = propValue;
		structureChanged = true;
	}
	catch(e)
	{
		structureChanged = false;
		thrownError = e.message;
	}
	
	
	var tcRes = [structureChanged, thrownError];
	commonFunctionsFile.testInvalidFunctionResult(tcRes, propError);
}


function verifyStoredDeviceReturn(sObject, rObject)
{
	commonFunctionsFile.testPresent(rObject);
	commonFunctionsFile.testType(rObject, 'object');
	commonFile.callTestDeviceDeletedStructure(rObject);
	
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(sObject, rObject, 'id');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(sObject, rObject, 'deviceType');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(sObject, rObject, 'maker');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(sObject, rObject, 'model');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(sObject, rObject, 'name');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(sObject, rObject, 'desc');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(sObject, rObject, 'ipAddress');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(sObject, rObject, 'username');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(sObject, rObject, 'password');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(sObject, rObject, 'isEnabled');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(sObject, rObject, 'macAddress');
}


function cloneInvalidModel()
{
	var invRes = new deviceModelFile.StoredDevice(testDeviceValidModel);
	return invRes;
}


function getRemoteIoCommonFile()
{
	var cRes = null;
	
	
	try
	{
		cRes = require(subCommonPath.rioCommonFile);
	}
	catch(e)
	{
		cRes = null;
	}
	
	
	return cRes;
}


function getDeviceClassFile(dPath)
{
	var res = null;
	
	try
	{
		res = require(dPath);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestDeviceClasses = testDeviceClasses;