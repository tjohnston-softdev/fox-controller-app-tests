const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const objectFunctions = require(commonPaths.testObject);
const loadFoxFile = require(commonPaths.loadFox);
const ioFile = loadFoxFile(foxPath.rioSettingsFile);

const advantechModels = loadFoxFile(foxPath.advantechFile);
const moxaModels = loadFoxFile(foxPath.moxaFile);
const sonoffModels = loadFoxFile(foxPath.sonoffFile);


function testModelDefinitionFiles()
{
	describe("Model Definitions", function()
	{
		checkFiles();
		handleManufacturerFile(advantechModels, "Advantech");
		handleManufacturerFile(moxaModels, "Moxa");
		handleManufacturerFile(sonoffModels, "Sonoff");
	});
}


function checkFiles()
{
	describe("Controller Files", function()
	{
		it("Remote IO Settings Loaded", function()
		{
			commonFunctionsFile.testPresent(ioFile);
		});
		
		it("Model Definitions Loaded", function()
		{
			commonFunctionsFile.testPresent(advantechModels);
			commonFunctionsFile.testPresent(moxaModels);
			commonFunctionsFile.testPresent(sonoffModels);
		});
		
	});
}



function handleManufacturerFile(modelArray, manufacturerName)
{
	var manufacturerDesc = manufacturerName + " Model Definitions";
	
	describe(manufacturerDesc, function()
	{
		checkManufacturerArrayRead(modelArray);
		checkModelsLoop(modelArray);
	});
}

function checkManufacturerArrayRead(modelArr)
{
	describe("Definition File", function()
	{
		it("Successfully Read", function()
		{
			commonFunctionsFile.testPresent(modelArr);
			arrayFunctions.testPopulated(modelArr);
		});
		
		it("Correct Structure", function()
		{
			arrayFunctions.testAllType(modelArr, 'object');
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
	var modelIndex = 0;
	var currentModel = null;
	var currentDesc = "";
	
	for (modelIndex = 0; modelIndex < modelArr.length; modelIndex = modelIndex + 1)
	{
		currentModel = modelArr[modelIndex];
		currentDesc = "Model - '" + currentModel.modelType + "'";
		
		describe(currentDesc, function()
		{
			checkCommunicationTypeProperty(currentModel);
			checkIoConfigArrayProperty(currentModel);
			checkTotalPollProperty(currentModel);
			checkPollIntervalProperty(currentModel);
			checkInfoUrlProperty(currentModel);
			checkManufacturerProperty(currentModel);
			checkFunctionProperties(currentModel);
		});
	}
}

function checkCommunicationTypeProperty(modelObj)
{
	describe("Property - Communication Type (commsType)", function()
	{
		it("Exists", function()
		{
			objectFunctions.testPropExists(modelObj, 'commsType');
		});
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testString(modelObj.commsType);
		});
	});
}

function checkIoConfigArrayProperty(modelObj)
{
	describe("Property - IO Config Array (ioConfigs)", function()
	{
		it("Exists", function()
		{
			objectFunctions.testPropExists(modelObj, 'ioConfigs');
		});
		
		it("Valid Type", function()
		{
			arrayFunctions.testPopulated(modelObj.ioConfigs);
		});
		
		it("All Elements Objects", function()
		{
			arrayFunctions.testAllType(modelObj.ioConfigs, 'object');
		});
		
		it("Object Structures Valid", function()
		{
			commonFunctionsFile.testPropertyDefinitions(modelObj.ioConfigs, 'ioType');
			commonFunctionsFile.testPropertyDefinitions(modelObj.ioConfigs, 'ioPrefix');
			commonFunctionsFile.testPropertyDefinitions(modelObj.ioConfigs, 'length');
			
			commonFunctionsFile.testPropertyContents(modelObj.ioConfigs, 'ioType', 'string');
			commonFunctionsFile.testPropertyContents(modelObj.ioConfigs, 'ioPrefix', 'string');
			commonFunctionsFile.testPropertyContents(modelObj.ioConfigs, 'length', 'number');
		});
		
		it("IO Type Referental Integrity", function()
		{
			commonFunctionsFile.testPropertySearchValues(modelObj.ioConfigs, 'ioType', ioFile.ioTypes);
		});
		
		it("IO Prefix Referental Integrity", function()
		{
			commonFunctionsFile.testPropertySearchValues(modelObj.ioConfigs, 'ioPrefix', ioFile.ioPrefixes);
		});
	});
}

function checkTotalPollProperty(modelObj)
{
	describe("Property - Total Polls (totalPolls)", function()
	{
		it("Exists", function()
		{
			objectFunctions.testPropExists(modelObj, 'totalPolls');
		});
		
		it("Valid Type", function()
		{
			objectFunctions.testPropType(modelObj, 'totalPolls', 'number');
		});
	});
}

function checkPollIntervalProperty(modelObj)
{
	describe("Property - Polling Interval (pollingInterval)", function()
	{
		it("Exists", function()
		{
			objectFunctions.testPropExists(modelObj, 'pollingInterval');
		});
		
		it("Valid Type", function()
		{
			objectFunctions.testPropType(modelObj, 'pollingInterval', 'number');
		});
	});
}

function checkInfoUrlProperty(modelObj)
{
	describe("Property - Information URL (infoUrl)", function()
	{
		it("Exists", function()
		{
			objectFunctions.testPropExists(modelObj, 'infoUrl');
		});
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testString(modelObj.infoUrl);
		});
	});
}

function checkManufacturerProperty(modelObj)
{
	describe("Property - Manufacturer (maker)", function()
	{
		it("Exists", function()
		{
			objectFunctions.testPropExists(modelObj, 'maker');
		});
		
		it("Valid Type", function()
		{
			commonFunctionsFile.testString(modelObj.maker);
		});
	});
}

function checkFunctionProperties(modelObj)
{
	describe("Functions", function()
	{
		it("Device Data Function Exists (readAndWriteDeviceData)", function()
		{
			objectFunctions.testPropExists(modelObj, 'readAndWriteDeviceData');
			objectFunctions.testPropType(modelObj, 'readAndWriteDeviceData', 'function');
		});
		
		it("Information Parse Function Exists (parseDeviceInfo)", function()
		{
			objectFunctions.testPropExists(modelObj, 'parseDeviceInfo');
			objectFunctions.testPropType(modelObj, 'parseDeviceInfo', 'function');
		});
	});
}



module.exports = testModelDefinitionFiles;