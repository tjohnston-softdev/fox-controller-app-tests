const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);

const ioSetFile = require(foxPath.rioSettingsFile);
const advantechModelContents = require(foxPath.advantechFile);
const moxaModelContents = require(foxPath.moxaFile);
const sonoffModelContents = require(foxPath.sonoffFile);

const settingsFile = getDeviceSettingsFile();
const supportedListObject = getSupportedLists();


function testDeviceSettings()
{
	describe("Device Settings", function()
	{
		checkDeviceSettingsFileExists();
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

function checkDeviceSettingsFileExists()
{
	describe("Settings File (device.settings)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(settingsFile);
			commonFunctionsFile.testType(settingsFile, 'object');
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
			commonFunctionsFile.testType(supportedListObject, 'object');
		});
		
		it("Manufacturers", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(supportedListObject, 'dbManufacturers');
			commonFunctionsFile.testArray(supportedListObject.dbManufacturers);
		});
		
		it("Models", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(supportedListObject, 'dbModels');
			commonFunctionsFile.testArray(supportedListObject.dbModels);
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
		
		it("All properties strings", function()
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
		
		it("Array", function()
		{
			commonFunctionsFile.testArray(settingsFile.deviceTypes);
		});
		
		it("All elements strings", function()
		{
			commonFunctionsFile.testAllElements(settingsFile.deviceTypes, 'string');
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
		
		it("All properties strings", function()
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
			checkSignalConvertResult(onRes, ioSetFile.binSignal.ON);
		});
		
		it("Call - Off", function()
		{
			var offRes = settingsFile.convertToBinSignal(0);
			checkSignalConvertResult(offRes, ioSetFile.binSignal.OFF);
		});
		
		it("Call - Null", function()
		{
			var nullRes = settingsFile.convertToBinSignal();
			checkSignalConvertResult(nullRes, ioSetFile.binSignal.OFF);
		});
		
	});
}

function checkScaleDecimalValueFunction()
{
	var scaleSpy = null;
	var custErr = -99;
	
	describe("Function - Scale Decimal Value (scaleDecimalValue)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'scaleDecimalValue');
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'scaleDecimalValue', 'function');
			scaleSpy = sinon.spy(settingsFile, 'scaleDecimalValue');
		});
		
		it("Call - Valid", function()
		{
			settingsFile.scaleDecimalValue(9002, 0, 0, 10);
				
			commonFunctionsFile.testTrue(scaleSpy.calledOnce);
			expect(scaleSpy.firstCall.args).to.deep.equal([9002, 0, 0, 10]);
			commonFunctionsFile.testPresent(scaleSpy.firstCall.returnValue);
			commonFunctionsFile.testType(scaleSpy.firstCall.returnValue, 'number');
			expect(scaleSpy.firstCall.returnValue).to.equal(1.374);
		});
		
		it("Call - Default Error Value", function()
		{
			settingsFile.scaleDecimalValue(null, null, 0, 10);
				
			commonFunctionsFile.testTrue(scaleSpy.calledTwice);
			expect(scaleSpy.secondCall.args).to.deep.equal([null, null, 0, 10]);
			commonFunctionsFile.testPresent(scaleSpy.secondCall.returnValue);
			commonFunctionsFile.testType(scaleSpy.secondCall.returnValue, 'number');
			expect(scaleSpy.secondCall.returnValue).to.equal(0);
		});
		
		it("Call - Custom Error Value", function()
		{
			settingsFile.scaleDecimalValue(null, custErr, 0, 10);
			
			commonFunctionsFile.testPresent(scaleSpy.lastCall);
			expect(scaleSpy.lastCall.args).to.deep.equal([null, custErr, 0, 10]);
			commonFunctionsFile.testPresent(scaleSpy.lastCall.returnValue);
			commonFunctionsFile.testType(scaleSpy.lastCall.returnValue, 'number');
			expect(scaleSpy.lastCall.returnValue).to.equal(custErr);
		});
		
		it("Complete", function()
		{
			scaleSpy.restore();
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
			checkSignalValidationResult(onRes, true);
		});
		
		it("Call - Off", function()
		{
			var offRes = settingsFile.isValidBinarySignal(ioSetFile.binSignal.OFF);
			checkSignalValidationResult(offRes, true);
		});
		
		it("Call - Invalid String", function()
		{
			var valRes = settingsFile.isValidBinarySignal("Unknown");
			checkSignalValidationResult(valRes, false);
		});
		
		it("Call - Invalid Type", function()
		{
			var typeRes = settingsFile.isValidBinarySignal(-1);
			checkSignalValidationResult(typeRes, false);
		});
		
		it("Call - Null", function()
		{
			var nullRes = settingsFile.isValidBinarySignal(null);
			checkSignalValidationResult(nullRes, false);
		});
		
	});
}

function checkGetModelFunction()
{
	var modelSpy = null;
	var testModelName = 'WISE-4060';
	var testModelManufacturer = 'Advantech';
	var unknownModelName = "Unknown Model";
	
	describe("Function - Get Model (getModel)", function()
	{
		
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(settingsFile, 'getModel');
			commonFunctionsFile.testObjectPropertyContent(settingsFile, 'getModel', 'function');
			modelSpy = sinon.spy(settingsFile, 'getModel');
		});
		
		it("Call - Supported", function()
		{
			settingsFile.getModel(testModelName);
			
			commonFunctionsFile.testTrue(modelSpy.calledOnce);
			expect(modelSpy.firstCall.args).to.deep.equal([testModelName]);
			commonFunctionsFile.testPresent(modelSpy.firstCall.returnValue);
			commonFunctionsFile.testType(modelSpy.firstCall.returnValue, 'object');
			
			commonFunctionsFile.testObjectPropertyDefinition(modelSpy.firstCall.returnValue, 'modelType');
			commonFunctionsFile.testObjectPropertyContent(modelSpy.firstCall.returnValue, 'modelType', 'string');
			expect(modelSpy.firstCall.returnValue.modelType).to.equal(testModelName);
			
			commonFunctionsFile.testObjectPropertyDefinition(modelSpy.firstCall.returnValue, 'maker');
			commonFunctionsFile.testObjectPropertyContent(modelSpy.firstCall.returnValue, 'maker', 'string');
			expect(modelSpy.firstCall.returnValue.maker).to.equal(testModelManufacturer);
		});
		
		it("Call - Unsupported", function()
		{
			settingsFile.getModel(unknownModelName);
			
			commonFunctionsFile.testPresent(modelSpy.lastCall);
			expect(modelSpy.lastCall.args).to.deep.equal([unknownModelName]);
			expect(modelSpy.lastCall.returnValue).to.be.null;
		});
		
		it("Complete", function()
		{
			modelSpy.restore();
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
			commonFunctionsFile.testArray(settingsFile.listRioMakers);
		});
		
		it("All elements strings", function()
		{
			commonFunctionsFile.testAllElements(settingsFile.listRioMakers, 'string');
		});
		
		it("Matching Contents", function()
		{
			expect(settingsFile.listRioMakers).to.deep.equal(supportedListObject.dbManufacturers);
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
			commonFunctionsFile.testArray(settingsFile.listRioModelTypes);
		});
		
		it("All elements strings", function()
		{
			commonFunctionsFile.testAllElements(settingsFile.listRioModelTypes, 'string');
		});
		
		it("Matching Contents", function()
		{
			expect(settingsFile.listRioModelTypes).to.deep.equal(supportedListObject.dbModels);
		});
		
	});
}


function checkSignalConvertResult(v, expectedOut)
{
	commonFunctionsFile.testPresent(v);
	commonFunctionsFile.testType(v, 'string');
	expect(v).to.equal(expectedOut);
}

function checkSignalValidationResult(v, expectedOut)
{
	commonFunctionsFile.testPresent(v);
	commonFunctionsFile.testType(v, 'boolean');
	
	if (expectedOut === true)
	{
		commonFunctionsFile.testTrue(v);
	}
	else
	{
		commonFunctionsFile.testFalse(v);
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
		allModelsArray = advantechModelContents.concat(moxaModelContents, sonoffModelContents);
		derivedManufacturers = allModelsArray.map(o => { return o.maker});
		derivedModels = allModelsArray.map(o => { return o.modelType});
		
		resultObject = {"dbManufacturers": derivedManufacturers, "dbModels": derivedModels};
	}
	catch(e)
	{
		allModelsArray = null;
		derivedManufacturers = null;
		derivedModels = null;
		resultObject = null;
	}
	
	return resultObject;
}

function getDeviceSettingsFile()
{
	var res = null;
	
	try
	{
		res = require(foxPath.deviceSettingsFile);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestDeviceSettings = testDeviceSettings;