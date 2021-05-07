const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const subCommonPath = require(commonPaths.subCommonRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const commonFile = require(subCommonPath.rioCommonFile);
const deviceModelFile = require(foxPath.storedDeviceClassFile);
const deviceConnectFile = require(foxPath.connectedDeviceClassFile);

const testDeviceValidModel = commonJsonObjectsFile.testDevice;
const testDeviceInvalidModel = cloneInvalidModel();

var storeDeviceDesc = "Stored Device Class (StoredDevice, device-model.class)";
var connectDesc = "Connected Device Class (ConnectedDevice, device.class)";



function testDeviceClasses()
{
	describe("Device Classes", function()
	{
		handleDeviceConstructors();
		handleDeviceClasses();
	});
}


function handleDeviceConstructors()
{
	describe("Device Class Constructors", function()
	{
		it(storeDeviceDesc, function()
		{
			commonFunctionsFile.testPresent(deviceModelFile.StoredDevice);
			expect(deviceModelFile.StoredDevice).to.be.a("function");
		});
		
		it(connectDesc, function()
		{
			commonFunctionsFile.testPresent(deviceConnectFile.ConnectedDevice);
			expect(deviceConnectFile.ConnectedDevice).to.be.a("function");
		});
		
	});
}




function handleDeviceClasses()
{
	var storeDeviceValid = null;
	
	describe(storeDeviceDesc, function()
	{
		it("Call - Valid Model", function(done)
		{
			storeDeviceValid = new deviceModelFile.StoredDevice(testDeviceValidModel);
			
			commonFunctionsFile.testPresent(storeDeviceValid);
			expect(storeDeviceValid).to.be.an("object");
			verifyStoredDeviceReturn(testDeviceValidModel, storeDeviceValid);
			
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
			var connectRes = new deviceConnectFile.ConnectedDevice(storeDeviceValid);
			
			commonFunctionsFile.testPresent(connectRes);
			expect(connectRes).to.be.an("object");
			
			commonFunctionsFile.testObjectPropertyDefinition(connectRes, 'storedDevice');
			commonFunctionsFile.testObjectPropertyContent(connectRes, 'storedDevice', 'object');
			expect(connectRes.storedDevice).to.equal(storeDeviceValid);
			
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
	var storedDeviceObject = null;
	var storedDeviceComplete = false;
	var storedDeviceError = "";
	
	try
	{
		storedDeviceObject = new deviceModelFile.StoredDevice(callObject.jsonObject);
		storedDeviceComplete = true;
	}
	catch(e)
	{
		storedDeviceComplete = false;
		storedDeviceError = e.message;
	}
	
	var callResult = [storedDeviceComplete, storedDeviceError];
	commonFunctionsFile.testInvalidFunctionResult(callResult, callObject.errorMessage);
}


function callConnectedDeviceUnsupported(a, expectedError)
{
	var connectObject = null;
	var connectionComplete = false;
	var connectionError = "";
	
	try
	{
		connectObject = new deviceConnectFile.ConnectedDevice(a);
		connectionComplete = true;
	}
	catch(e)
	{
		connectionComplete = false;
		connectionError = e.message;
	}
	
	var callResult = [connectionComplete, connectionError];
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
	var invalidStr = -1;
	var stringErrorText = commonErrorStringsFile.writeConnectDeviceProperty(sName, "string", invalidStr);
	callConnectedDeviceStructureError(sName, invalidStr, stringErrorText);
}

function callConnectedDeviceBooleanProperty(bName)
{
	var invalidBoolean = -1;
	var booleanErrorText = commonErrorStringsFile.writeConnectDeviceProperty(bName, "boolean", invalidBoolean);
	callConnectedDeviceStructureError(bName, invalidBoolean, booleanErrorText);
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
	expect(rObject).to.be.an("object");
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

module.exports =
{
	callTestDeviceClasses: testDeviceClasses
};