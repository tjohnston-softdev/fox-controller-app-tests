const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const ioSetFile = require(foxPath.rioSettingsFile);
const advantechModels = require(foxPath.advantechFile);
const moxaModels = require(foxPath.moxaFile);
const sonoffModels = require(foxPath.sonoffFile);
const settingsFile = require(foxPath.deviceSettingsFile);

const supportedListObject = getSupportedLists();


function testDeviceSettings()
{
	describe("Device Settings", function()
	{
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
			commonFunctionsFile.testArrayPopulated(supportedListObject.manufacturers);
		});
		
		it("Models", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(supportedListObject, 'models');
			commonFunctionsFile.testArrayPopulated(supportedListObject.models);
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
			commonFunctionsFile.testArrayPopulated(settingsFile.deviceTypes);
		});
		
		it("All Elements Strings", function()
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
		
		it("Call - Valid", function(done)
		{
			var validSpy = sinon.spy(settingsFile, 'scaleDecimalValue');
			settingsFile.scaleDecimalValue(9002, 0, 0, 10);
				
			expect(validSpy.calledOnce).to.be.true;
			expect(validSpy.firstCall.args).to.deep.equal([9002, 0, 0, 10]);
			expect(validSpy.firstCall.returnValue).to.equal(1.374);
			
			validSpy.restore();
			done();
		});
		
		it("Call - Default Error Value", function(done)
		{
			var defaultErrorSpy = sinon.spy(settingsFile, 'scaleDecimalValue');
			settingsFile.scaleDecimalValue(null, null, 0, 10);
				
			expect(defaultErrorSpy.calledOnce).to.be.true;
			expect(defaultErrorSpy.firstCall.args).to.deep.equal([null, null, 0, 10]);
			expect(defaultErrorSpy.firstCall.returnValue).to.equal(0);
			
			defaultErrorSpy.restore();
			done();
		});
		
		it("Call - Custom Error Value", function(done)
		{
			var customErrorSpy = sinon.spy(settingsFile, 'scaleDecimalValue');
			settingsFile.scaleDecimalValue(null, custErr, 0, 10);
			
			expect(customErrorSpy.calledOnce).to.be.true;
			commonFunctionsFile.testPresent(customErrorSpy.firstCall);
			expect(customErrorSpy.firstCall.args).to.deep.equal([null, custErr, 0, 10]);
			expect(customErrorSpy.firstCall.returnValue).to.equal(custErr);
			
			customErrorSpy.restore();
			done();
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
		
		it("Call - Supported", function(done)
		{
			var supportedSpy = sinon.spy(settingsFile, 'getModel');
			settingsFile.getModel(testModelName);
			
			expect(supportedSpy.calledOnce).to.be.true;
			commonFunctionsFile.testPresent(supportedSpy.firstCall);
			expect(supportedSpy.firstCall.args).to.deep.equal([testModelName]);
			
			commonFunctionsFile.testPresent(supportedSpy.firstCall.returnValue);
			expect(supportedSpy.firstCall.returnValue).to.be.an("object");
			
			commonFunctionsFile.testObjectPropertyDefinition(supportedSpy.firstCall.returnValue, 'modelType');
			commonFunctionsFile.testObjectPropertyContent(supportedSpy.firstCall.returnValue, 'modelType', 'string');
			expect(supportedSpy.firstCall.returnValue.modelType).to.equal(testModelName);
			
			commonFunctionsFile.testObjectPropertyDefinition(supportedSpy.firstCall.returnValue, 'maker');
			commonFunctionsFile.testObjectPropertyContent(supportedSpy.firstCall.returnValue, 'maker', 'string');
			expect(supportedSpy.firstCall.returnValue.maker).to.equal(testModelManufacturer);
			
			supportedSpy.restore();
			done();
		});
		
		it("Call - Unsupported", function(done)
		{
			var unsupportedSpy = sinon.spy(settingsFile, 'getModel');
			settingsFile.getModel(unknownModelName);
			
			commonFunctionsFile.testPresent(unsupportedSpy.firstCall);
			expect(unsupportedSpy.firstCall.args).to.deep.equal([unknownModelName]);
			expect(unsupportedSpy.firstCall.returnValue).to.be.null;
			
			unsupportedSpy.restore();
			done();
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
			commonFunctionsFile.testArrayPopulated(settingsFile.listRioMakers);
		});
		
		it("All Elements Strings", function()
		{
			commonFunctionsFile.testAllElements(settingsFile.listRioMakers, 'string');
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
			commonFunctionsFile.testArrayPopulated(settingsFile.listRioModelTypes);
		});
		
		it("All Elements Strings", function()
		{
			commonFunctionsFile.testAllElements(settingsFile.listRioModelTypes, 'string');
		});
		
		it("Matching Contents", function()
		{
			expect(settingsFile.listRioModelTypes).to.deep.equal(supportedListObject.models);
		});
		
	});
}

function checkSignalValidationResult(actualOut, expectedOut)
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


module.exports =
{
	callTestDeviceSettings: testDeviceSettings
};