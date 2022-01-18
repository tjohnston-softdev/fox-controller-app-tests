const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const objectFunctions = require(commonPaths.testObject);
const referenceFunctions = require(commonPaths.testRef);
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
			expect(ioFile).to.exist;
		});
		
		it("Model Definitions Loaded", function()
		{
			expect(advantechModels).to.exist;
			expect(moxaModels).to.exist;
			expect(sonoffModels).to.exist;
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
			arrayFunctions.testPopulated(modelArr);
		});
		
		it("Correct Structure", function()
		{
			arrayFunctions.testAllType(modelArr, 'object');
		});
		
		it("Model Types Defined", function()
		{
			arrayFunctions.testAllPropExists(modelArr, 'modelType');
			arrayFunctions.testAllPropType(modelArr, 'modelType', 'string');
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
			commonFunctions.testString(modelObj.commsType);
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
			arrayFunctions.testAllPropExists(modelObj.ioConfigs, 'ioType');
			arrayFunctions.testAllPropExists(modelObj.ioConfigs, 'ioPrefix');
			arrayFunctions.testAllPropExists(modelObj.ioConfigs, 'length');
			
			arrayFunctions.testAllPropType(modelObj.ioConfigs, 'ioType', 'string');
			arrayFunctions.testAllPropType(modelObj.ioConfigs, 'ioPrefix', 'string');
			arrayFunctions.testAllPropType(modelObj.ioConfigs, 'length', 'number');
		});
		
		it("IO Type Referental Integrity", function()
		{
			referenceFunctions.testPropSearchValues(modelObj.ioConfigs, 'ioType', ioFile.ioTypes);
		});
		
		it("IO Prefix Referental Integrity", function()
		{
			referenceFunctions.testPropSearchValues(modelObj.ioConfigs, 'ioPrefix', ioFile.ioPrefixes);
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
			commonFunctions.testString(modelObj.infoUrl);
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
			commonFunctions.testString(modelObj.maker);
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