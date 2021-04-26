const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelativeFile);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjectFile);

const ioFile = require(foxPath.rioSettingsFile);

const advantechFull = foxPath.advantechFile;
const moxaFull = foxPath.moxaFile
const sonoffFull = foxPath.sonoffFile


function testModelDefinitionFiles()
{
	describe("Model Definitions", function()
	{
		handleManufacturerFile(advantechFull, "Advantech");
		handleManufacturerFile(moxaFull, "Moxa");
		handleManufacturerFile(sonoffFull, "Sonoff");
	});
}



function handleManufacturerFile(manufacturerPath, manufacturerName)
{
	var manufacturerArray = readModelArray(manufacturerPath);
	var manufacturerDesc = manufacturerName + " Model Definitions";
	
	describe(manufacturerDesc, function()
	{
		checkManufacturerArrayRead(manufacturerArray);
		checkModelsLoop(manufacturerArray);
	});
}

function checkManufacturerArrayRead(ma)
{
	describe("Definition File", function()
	{
		it("Successfully Read", function()
		{
			commonFunctionsFile.testPresent(ma);
		});
		
		it("Array Returned", function()
		{
			commonFunctionsFile.testArray(ma);
			commonFunctionsFile.testAllElements(ma, 'object');
		});
		
		it("Model Types Defined", function()
		{
			commonFunctionsFile.testPropertyDefinitions(ma, 'modelType');
			commonFunctionsFile.testPropertyContents(ma, 'modelType', 'string');
		});
	});
}

function checkModelsLoop(ma)
{
	var mIndex = 0;
	var mObject = null;
	var mQuote = "";
	var mDesc = "";
	
	while (mIndex >= 0 && mIndex < ma.length && ma !== null)
	{
		mObject = ma[mIndex];
		mQuote = "'" + mObject.modelType + "'";
		mDesc = "Model - " + mQuote;
		
		describe(mDesc, function()
		{
			checkCommunicationTypeProperty(mObject);
			checkIoConfigArrayProperty(mObject);
			checkTotalPollProperty(mObject);
			checkPollIntervalProperty(mObject);
			checkInfoUrlProperty(mObject);
			checkManufacturerProperty(mObject);
			checkFunctionProperties(mObject);
		});
		
		mIndex = mIndex + 1;
	}
}

function checkCommunicationTypeProperty(mObj)
{
	describe("Property - Communication Type (commsType)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(mObj, 'commsType');
		});
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testString(mObj.commsType);
		});
	});
}

function checkIoConfigArrayProperty(mObj)
{
	describe("Property - IO Config Array (ioConfigs)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(mObj, 'ioConfigs');
		});
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testArray(mObj.ioConfigs);
		});
		
		it("All Elements Objects", function()
		{
			commonFunctionsFile.testAllElements(mObj.ioConfigs, 'object');
		});
		
		it("Object Structures Valid", function()
		{
			commonFunctionsFile.testPropertyDefinitions(mObj.ioConfigs, 'ioType');
			commonFunctionsFile.testPropertyDefinitions(mObj.ioConfigs, 'ioPrefix');
			commonFunctionsFile.testPropertyDefinitions(mObj.ioConfigs, 'length');
			
			commonFunctionsFile.testPropertyContents(mObj.ioConfigs, 'ioType', 'string');
			commonFunctionsFile.testPropertyContents(mObj.ioConfigs, 'ioPrefix', 'string');
			commonFunctionsFile.testPropertyContents(mObj.ioConfigs, 'length', 'number');
		});
		
		it("IO Type Referental Integrity", function()
		{
			commonFunctionsFile.testPropertySearchValues(mObj.ioConfigs, 'ioType', ioFile.ioTypes);
		});
		
		it("IO Prefix Referental Integrity", function()
		{
			commonFunctionsFile.testPropertySearchValues(mObj.ioConfigs, 'ioPrefix', ioFile.ioPrefixes);
		});
	});
}

function checkTotalPollProperty(mObj)
{
	describe("Property - Total Polls (totalPolls)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(mObj, 'totalPolls');
		});
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(mObj, 'totalPolls', 'number');
		});
	});
}

function checkPollIntervalProperty(mObj)
{
	describe("Property - Polling Interval (pollingInterval)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(mObj, 'pollingInterval');
		});
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testObjectPropertyContent(mObj, 'pollingInterval', 'number');
		});
	});
}

function checkInfoUrlProperty(mObj)
{
	describe("Property - Information URL (infoUrl)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(mObj, 'infoUrl');
		});
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testString(mObj.infoUrl);
		});
	});
}

function checkManufacturerProperty(mObj)
{
	describe("Property - Manufacturer (maker)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(mObj, 'maker');
		});
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testString(mObj.maker);
		});
	});
}

function checkFunctionProperties(mObj)
{
	describe("Property - Functions", function()
	{
		it("Device Data Function Exists (readAndWriteDeviceData)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(mObj, 'readAndWriteDeviceData');
			commonFunctionsFile.testObjectPropertyContent(mObj, 'readAndWriteDeviceData', 'function');
		});
		
		it("Information Parse Function Exists (parseDeviceInfo)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(mObj, 'parseDeviceInfo');
			commonFunctionsFile.testObjectPropertyContent(mObj, 'parseDeviceInfo', 'function');
		});
	});
}


function readModelArray(fPath)
{
	var res = null;
	
	try
	{
		res = require(fPath);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestModelDefinitionFiles = testModelDefinitionFiles;