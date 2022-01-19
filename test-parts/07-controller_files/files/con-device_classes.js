const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const loadFoxFile = require(commonPaths.loadFox);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const commonFile = require(commonPaths.rioCommon);
const rioInvalid = require(commonPaths.rioInvalid);
const deviceModelFile = loadFoxFile(foxPath.storedDeviceClassFile);
const deviceConnectFile = loadFoxFile(foxPath.connectedDeviceClassFile);

const testDeviceValidModel = commonJsonObjectsFile.testDevice;
const testDeviceInvalidModel = cloneInvalidModel();

var storeDeviceDesc = "Stored Device Class (StoredDevice, device-model.class)";
var connectDesc = "Connected Device Class (ConnectedDevice, device.class)";



function testDeviceClasses()
{
	describe("Device Classes", function()
	{
		checkFiles();
		handleDeviceConstructors();
		handleDeviceClasses();
	});
}


function checkFiles()
{
	describe("Class Files", function()
	{
		it("Loaded", function()
		{
			expect(deviceModelFile).to.exist;
			expect(deviceConnectFile).to.exist;
		});
	});
}


function handleDeviceConstructors()
{
	describe("Device Class Constructors", function()
	{
		it(storeDeviceDesc, function()
		{
			commonFunctions.testFunction(deviceModelFile.StoredDevice);
		});
		
		it(connectDesc, function()
		{
			commonFunctions.testFunction(deviceConnectFile.ConnectedDevice);
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
			
			commonFunctions.testObject(storeDeviceValid);
			verifyStoredDeviceReturn(testDeviceValidModel, storeDeviceValid);
			
			done();
		});
		
		it("Call - Null", function()
		{
			var nullObject = rioInvalid.getError(commonErrorStringsFile.deviceNotObject, null);
			callStoredDeviceUnsupported(nullObject);
		});
		
		it("Call - Invalid Object Type", function()
		{
			var invalidTypeObject = rioInvalid.getError(commonErrorStringsFile.deviceNotObject, -1);
			callStoredDeviceUnsupported(invalidTypeObject);
		});
		
		it("Call - Invalid ID (id)", function()
		{
			var invalidIdObject = rioInvalid.getIdFactory(testDeviceValidModel);
			
			callStoredDeviceUnsupported(invalidIdObject.typeCase);
			callStoredDeviceUnsupported(invalidIdObject.propCase);
		});
		
		it("Call - Invalid Device Type (deviceType)", function()
		{
			var invalidTypeObject = rioInvalid.getDeviceType(testDeviceValidModel);
			
			callStoredDeviceUnsupported(invalidTypeObject.valueCase);
			callStoredDeviceUnsupported(invalidTypeObject.typeCase);
			callStoredDeviceUnsupported(invalidTypeObject.propCase);
		});
		
		it("Call - Invalid Manufacturer (maker)", function()
		{
			var invalidManufacturerObject = rioInvalid.getManufacturer(testDeviceValidModel, false);
			
			callStoredDeviceUnsupported(invalidManufacturerObject.valueCase);
			callStoredDeviceUnsupported(invalidManufacturerObject.typeCase);
			callStoredDeviceUnsupported(invalidManufacturerObject.propCase);
		});
		
		it("Call - Invalid Model (model)", function()
		{
			var invalidModelObject = rioInvalid.getModel(testDeviceValidModel);
			
			callStoredDeviceUnsupported(invalidModelObject.valueCase);
			callStoredDeviceUnsupported(invalidModelObject.typeCase);
			callStoredDeviceUnsupported(invalidModelObject.propCase);
		});
		
		it("Call - Invalid Name (name)", function()
		{
			var invalidNameObject = rioInvalid.getName(testDeviceValidModel);
			
			callStoredDeviceUnsupported(invalidNameObject.typeCase);
			callStoredDeviceUnsupported(invalidNameObject.propCase);
		});
		
		it("Call - Invalid IP Address (ipAddress)", function()
		{
			var invalidAddressObject = rioInvalid.getIpAddress(testDeviceValidModel);
			
			callStoredDeviceUnsupported(invalidAddressObject.formatCase);
			callStoredDeviceUnsupported(invalidAddressObject.valueCase);
			callStoredDeviceUnsupported(invalidAddressObject.typeCase);
			callStoredDeviceUnsupported(invalidAddressObject.propCase);
		});
		
		it("Call - Invalid Enabled Flag (isEnabled)", function()
		{
			var invalidEnabledObject = rioInvalid.getEnabled(testDeviceValidModel);
			
			callStoredDeviceUnsupported(invalidEnabledObject.typeCase);
			callStoredDeviceUnsupported(invalidEnabledObject.propCase);
		});
		
		it("Call - Invalid MAC Address (macAddress)", function()
		{
			var invalidMacObject = rioInvalid.getMacAddress(testDeviceValidModel);
			callStoredDeviceUnsupported(invalidMacObject.typeCase);
		});
		
	});
	
	
	describe(connectDesc, function()
	{
		
		it("Call - Valid Model", function(done)
		{
			var connectRes = new deviceConnectFile.ConnectedDevice(storeDeviceValid);
			
			commonFunctions.testObject(connectRes);
			objectFunctions.testPropExists(connectRes, 'storedDevice');
			objectFunctions.testPropType(connectRes, 'storedDevice', 'object');
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
	
	var callResult = commonFunctions.prepareInvalidResult(storedDeviceComplete, storedDeviceError);
	commonFunctions.testInvalidResult(callResult, callObject.errorMessage);
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
	
	var callResult = commonFunctions.prepareInvalidResult(connectionComplete, connectionError);
	commonFunctions.testInvalidResult(callResult, expectedError);
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
	
	
	var tcRes = commonFunctions.prepareInvalidResult(structureChanged, thrownError);
	commonFunctions.testInvalidResult(tcRes, propError);
}


function verifyStoredDeviceReturn(sObject, rObject)
{
	commonFunctions.testObject(rObject);
	commonFile.testDeviceDeleted(rObject);
	
	objectFunctions.testSameValues(sObject, rObject, 'id');
	objectFunctions.testSameValues(sObject, rObject, 'deviceType');
	objectFunctions.testSameValues(sObject, rObject, 'maker');
	objectFunctions.testSameValues(sObject, rObject, 'model');
	objectFunctions.testSameValues(sObject, rObject, 'name');
	objectFunctions.testSameValues(sObject, rObject, 'desc');
	objectFunctions.testSameValues(sObject, rObject, 'ipAddress');
	objectFunctions.testSameValues(sObject, rObject, 'username');
	objectFunctions.testSameValues(sObject, rObject, 'password');
	objectFunctions.testSameValues(sObject, rObject, 'isEnabled');
	objectFunctions.testSameValues(sObject, rObject, 'macAddress');
}


function cloneInvalidModel()
{
	var invRes = new deviceModelFile.StoredDevice(testDeviceValidModel);
	return invRes;
}

module.exports = testDeviceClasses;