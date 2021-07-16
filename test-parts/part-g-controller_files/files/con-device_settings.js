const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const loadFoxFile = require(commonPaths.loadFox);

const ioSetFile = loadFoxFile(foxPath.rioSettingsFile);
const advantechModels = loadFoxFile(foxPath.advantechFile);
const moxaModels = loadFoxFile(foxPath.moxaFile);
const sonoffModels = loadFoxFile(foxPath.sonoffFile);
const settingsFile = loadFoxFile(foxPath.deviceSettingsFile);

const supportedListObject = getSupportedLists();


function testDeviceSettings()
{
	describe("Device Settings", function()
	{
		checkFiles();
		checkSupportedModelDefinitions();
		
		checkDeviceTypeObjectProperty();
		checkDeviceTypeArrayProperty();
		checkCommunicationTypeProperty();
		
		checkBinSignalFunction();
		checkScaleDecimalValueFunction();
		checkValidateBinSignalFunction();
		
		checkGetModelFunction();
		checkManufacturerListProperty();
		checkModelTypeListProperty();
	});
}


function checkFiles()
{
	describe("Controller Files", function()
	{
		it("Remote IO Settings Loaded", function()
		{
			commonFunctionsFile.testPresent(ioSetFile);
		});
		
		it("Model Definitions Loaded", function()
		{
			commonFunctionsFile.testPresent(advantechModels);
			commonFunctionsFile.testPresent(moxaModels);
			commonFunctionsFile.testPresent(sonoffModels);
		});
		
		it("Device Settings Loaded", function()
		{
			commonFunctionsFile.testPresent(settingsFile);
		});
		
	});
}


function checkSupportedModelDefinitions()
{
	describe("Supported Model Definitions", function()
	{
		it("Valid Object Type", function()
		{
			commonFunctionsFile.testPresent(supportedListObject);
			expect(supportedListObject).to.be.an("object");
		});
		
		it("Manufacturers", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(supportedListObject, 'manufacturers');
			arrayFunctions.testPopulated(supportedListObject.manufacturers);
		});
		
		it("Models", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(supportedListObject, 'models');
			arrayFunctions.testPopulated(supportedListObject.models);
		});
		
	});
}


function checkDeviceTypeObjectProperty()
{
	describe("Property - Device Type Object (deviceType)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'deviceType');
		});
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'deviceType', 'object');
		});
		
		it("All Properties Strings", function()
		{
			commonFunctionsFile.testObjectAllPropertiesType(settingsFile.deviceType, 'string');
		});
		
	});
	
}



function checkDeviceTypeArrayProperty()
{
	describe("Property - Device Type Array (deviceTypes)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'deviceTypes');
			commonFunctionsFile.testPresent(settingsFile.deviceTypes);
		});
		
		it("Populated Array", function()
		{
			arrayFunctions.testPopulated(settingsFile.deviceTypes);
		});
		
		it("All Elements Strings", function()
		{
			arrayFunctions.testAllType(settingsFile.deviceTypes, 'string');
		});
	});
}


function checkCommunicationTypeProperty()
{
	describe("Property - Communication Type (communicationType)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'communicationType');
		});
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'communicationType', 'object');
		});
		
		it("All Properties Strings", function()
		{
			commonFunctionsFile.testObjectAllPropertiesType(settingsFile.communicationType, 'string');
		});
	});
}

function checkBinSignalFunction()
{
	describe("Function - Convert to Binary Signal (convertToBinSignal)", function()
	{
		
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'convertToBinSignal');
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'convertToBinSignal', 'function');
		});
		
		
		it("Call - On", function()
		{
			var onRes = settingsFile.convertToBinSignal(1);
			expect(onRes).to.equal(ioSetFile.binSignal.ON);
		});
		
		it("Call - Off", function()
		{
			var offRes = settingsFile.convertToBinSignal(0);
			expect(offRes).to.equal(ioSetFile.binSignal.OFF);
		});
		
		it("Call - Null", function()
		{
			var nullRes = settingsFile.convertToBinSignal();
			expect(nullRes).to.equal(ioSetFile.binSignal.OFF);
		});
		
	});
}

function checkScaleDecimalValueFunction()
{
	var custErr = -99;
	
	describe("Function - Scale Decimal Value (scaleDecimalValue)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'scaleDecimalValue');
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'scaleDecimalValue', 'function');
		});
		
		it("Call - Valid", function()
		{
			var validRes = settingsFile.scaleDecimalValue(9002, 0, 0, 10);
			expect(validRes).to.equal(1.374);
		});
		
		it("Call - Default Error Value", function()
		{
			var defaultErrorRes = settingsFile.scaleDecimalValue(null, null, 0, 10);
			expect(defaultErrorRes).to.equal(0);
		});
		
		it("Call - Custom Error Value", function()
		{
			var customErrorRes = settingsFile.scaleDecimalValue(null, custErr, 0, 10);
			expect(customErrorRes).to.equal(custErr);
		});
		
	});
}

function checkValidateBinSignalFunction()
{
	describe("Function - Validate Binary Signal (isValidBinarySignal)", function()
	{
		it("Function exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'isValidBinarySignal');
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'isValidBinarySignal', 'function');
		});
		
		it("Call - On", function()
		{
			var onRes = settingsFile.isValidBinarySignal(ioSetFile.binSignal.ON);
			handleSignalResult(onRes, true);
		});
		
		it("Call - Off", function()
		{
			var offRes = settingsFile.isValidBinarySignal(ioSetFile.binSignal.OFF);
			handleSignalResult(offRes, true);
		});
		
		it("Call - Invalid String", function()
		{
			var valRes = settingsFile.isValidBinarySignal("Unknown");
			handleSignalResult(valRes, false);
		});
		
		it("Call - Invalid Type", function()
		{
			var typeRes = settingsFile.isValidBinarySignal(-1);
			handleSignalResult(typeRes, false);
		});
		
		it("Call - Null", function()
		{
			var nullRes = settingsFile.isValidBinarySignal(null);
			handleSignalResult(nullRes, false);
		});
		
	});
}

function checkGetModelFunction()
{
	var testModelName = 'WISE-4060';
	var testModelManufacturer = 'Advantech';
	var unknownModelName = "Unknown Model";
	
	describe("Function - Get Model (getModel)", function()
	{
		
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'getModel');
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'getModel', 'function');
		});
		
		it("Call - Supported", function()
		{
			var supportedRes = settingsFile.getModel(testModelName);
			
			commonFunctionsFile.testPresent(supportedRes);
			expect(supportedRes).to.be.an("object");
			
			commonFunctionsFile.testObjectPropertyDefinition(supportedRes, 'modelType');
			commonFunctionsFile.testObjectPropertyContent(supportedRes, 'modelType', 'string');
			expect(supportedRes.modelType).to.equal(testModelName);
			
			commonFunctionsFile.testObjectPropertyDefinition(supportedRes, 'maker');
			commonFunctionsFile.testObjectPropertyContent(supportedRes, 'maker', 'string');
			expect(supportedRes.maker).to.equal(testModelManufacturer);
		});
		
		it("Call - Unsupported", function()
		{
			var unsupportedRes = settingsFile.getModel(unknownModelName);
			expect(unsupportedRes).to.be.null;
		});
		
	});
}

function checkManufacturerListProperty()
{
	describe("Property - Manufacturer List (listRioMakers)", function()
	{
		
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'listRioMakers');
			commonFunctionsFile.testPresent(settingsFile.listRioMakers);
		});
		
		it("Array", function()
		{
			arrayFunctions.testPopulated(settingsFile.listRioMakers);
		});
		
		it("All Elements Strings", function()
		{
			arrayFunctions.testAllType(settingsFile.listRioMakers, 'string');
		});
		
		it("Matching Contents", function()
		{
			expect(settingsFile.listRioMakers).to.deep.equal(supportedListObject.manufacturers);
		});
		
	});
}

function checkModelTypeListProperty()
{
	describe("Property - Model Type List (listRioModelTypes)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'listRioModelTypes');
			commonFunctionsFile.testPresent(settingsFile.listRioModelTypes);
		});
		
		it("Array", function()
		{
			arrayFunctions.testPopulated(settingsFile.listRioModelTypes);
		});
		
		it("All Elements Strings", function()
		{
			arrayFunctions.testAllType(settingsFile.listRioModelTypes, 'string');
		});
		
		it("Matching Contents", function()
		{
			expect(settingsFile.listRioModelTypes).to.deep.equal(supportedListObject.models);
		});
		
	});
}

function handleSignalResult(actualOut, expectedOut)
{
	if (expectedOut === true)
	{
		expect(actualOut).to.be.true;
	}
	else
	{
		expect(actualOut).to.be.false;
	}
	
}

function getSupportedLists()
{
	var allModelsArray = null;
	var derivedManufacturers = null;
	var derivedModels = null;
	var resultObject = null;
	
	try
	{
		allModelsArray = advantechModels.concat(moxaModels, sonoffModels);
		derivedManufacturers = allModelsArray.map(currentObj => { return currentObj.maker});
		derivedModels = allModelsArray.map(currentObj => { return currentObj.modelType});
		
		resultObject = {"manufacturers": derivedManufacturers, "models": derivedModels};
	}
	catch(e)
	{
		resultObject = null;
	}
	
	
	return resultObject;
}


module.exports = testDeviceSettings;