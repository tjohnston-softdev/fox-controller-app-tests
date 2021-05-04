const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const ioFile = require(foxPath.rioSettingsFile);

const advantechDefinitions = require(foxPath.advantechFile);
const moxaDefinitions = require(foxPath.moxaFile);
const sonoffDefinitions = require(foxPath.sonoffFile);


function testModelDefinitionFiles()
{
	describe("Model Definitions", function()
	{
		handleManufacturerFile(advantechDefinitions, "Advantech");
		handleManufacturerFile(moxaDefinitions, "Moxa");
		handleManufacturerFile(sonoffDefinitions, "Sonoff");
	});
}



function handleManufacturerFile(manufacturerArray, manufacturerName)
{
	var manufacturerDesc = manufacturerName + " Model Definitions";
	
	describe(manufacturerDesc, function()
	{
		checkManufacturerArrayRead(manufacturerArray);
		checkModelsLoop(manufacturerArray);
	});
}

function checkManufacturerArrayRead(modelArr)
{
	describe("Definition File", function()
	{
		it("Successfully Read", function()
		{
			commonFunctionsFile.testPresent(modelArr);
		});
		
		it("Array Returned", function()
		{
			commonFunctionsFile.testArrayPopulated(modelArr);
			commonFunctionsFile.testAllElements(modelArr, 'object');
		});
		
		it("Model Types Defined", function()
		{
			commonFunctionsFile.testPropertyDefinitions(modelArr, 'modelType');
			commonFunctionsFile.testPropertyContents(modelArr, 'modelType', 'string');
		});
	});
}

function checkModelsLoop(modelArr)
{
	var mIndex = 0;
	var mObject = null;
	var mQuote = "";
	var mDesc = "";
	
	while (mIndex >= 0 && mIndex < modelArr.length && modelArr !== null)
	{
		mObject = modelArr[mIndex];
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
			commonFunctionsFile.testArrayPopulated(mObj.ioConfigs);
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

module.exports =
{
	callTestModelDefinitionFiles: testModelDefinitionFiles
};