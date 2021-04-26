const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelativeFile);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrorsFile);
const commonJsonObjectsFile = require(commonPaths.commonObjectFile);
const localValidFile = require(commonPaths.localValid);



function testNodeObjectArrayStructure(nodeObjArray)
{
	commonFunctionsFile.testPresent(nodeObjArray);
	commonFunctionsFile.testArrayNeutral(nodeObjArray);
	commonFunctionsFile.testAllElements(nodeObjArray, 'object');
}

function testNodeObjectArrayProperties(nodeObjArray)
{
	commonFunctionsFile.testPropertyDefinitions(nodeObjArray, 'value');
	commonFunctionsFile.testPropertyDefinitions(nodeObjArray, 'text');
	commonFunctionsFile.testPropertyDefinitions(nodeObjArray, 'name');
}

function testNodeObjectArrayContents(nodeObjArray)
{
	commonFunctionsFile.testPropertyContents(nodeObjArray, 'value', 'string');
	commonFunctionsFile.testPropertyContents(nodeObjArray, 'text', 'string');
	commonFunctionsFile.testPropertyContents(nodeObjArray, 'name', 'string');
}


function testNodeStorageObject(storageObject)
{
	var currentProperty = null;
	
	for (nodeManufacturer in storageObject)
	{
		currentProperty = storageObject[nodeManufacturer];
		
		testNodeObjectArrayStructure(currentProperty);
		testNodeObjectArrayProperties(currentProperty);
		testNodeObjectArrayContents(currentProperty);
	}
}


function testNodeStoreCount(storageObject)
{
	var currentManufacturerArray = null;
	var totalStoreCount = 0;
	
	for (currentManufacturerProperty in storageObject)
	{
		currentManufacturerArray = storageObject[currentManufacturerProperty];
		totalStoreCount = totalStoreCount + currentManufacturerArray.length;
	}
	
	return totalStoreCount;
}



function testNodeManufacturerArray(nmArray)
{
	var manufacturerStringIndex = 0;
	var manufacturerStringElement = null;
	
	for (manufacturerStringIndex = 0; manufacturerStringIndex < nmArray.length; manufacturerStringIndex = manufacturerStringIndex + 1)
	{
		manufacturerStringElement = nmArray[manufacturerStringIndex];
		commonFunctionsFile.testString(manufacturerStringElement);
	}
}


function testStatusControlStructure(sca)
{
	commonFunctionsFile.testPropertyDefinitions(sca, 'value');
	commonFunctionsFile.testPropertyDefinitions(sca, 'text');
	
	commonFunctionsFile.testPropertyContents(sca, 'value', 'string');
	commonFunctionsFile.testPropertyContents(sca, 'text', 'string');
}

function testStatusControlSyntax(sca)
{
	var sIndex = 0;
	var sElement = null;
	
	var currentPrefixValid = false;
	var currentNameValid = false;
	var currentElementValid = false;
	
	var canContinue = true;
	
	while (sIndex >= 0 && sIndex < sca.length && canContinue === true)
	{
		sElement = sca[sIndex];
		currentPrefixValid = localValidFile.validateRioPrefix(sElement.value);
		currentNameValid = localValidFile.validateRioText(sElement.text);
		currentElementValid = false;
		
		if (currentPrefixValid === true && currentNameValid === true)
		{
			currentElementValid = true;
		}
		
		if (currentElementValid !== true)
		{
			canContinue = false;
		}
		
		sIndex = sIndex + 1;
	}
	
	commonFunctionsFile.testTrue(canContinue);
}


function testStatusControlIntegrity(sca)
{
	var sIndex = 0;
	var sElement = null;
	
	var currentPrefixText = null;
	var currentNameText = null;
	var expectedNameText = null;
	
	var currentValid = false;
	var canContinue = true;
	
	while (sIndex >= 0 && sIndex < sca.length && canContinue === true)
	{
		sElement = sca[sIndex];
		currentPrefixText = sElement.value.toLowerCase();
		currentNameText = sElement.text.toLowerCase();
		expectedNameText = writeExpectedNodeName(currentPrefixText);
		currentValid = false;
		
		if (currentNameText === expectedNameText)
		{
			currentValid = true;
		}
		
		if (currentValid !== true)
		{
			canContinue = false;
		}
		
		sIndex = sIndex + 1;
	}
	
	commonFunctionsFile.testTrue(canContinue);
	
}

function writeExpectedNodeName(pFix)
{
	var firstWord = "";
	var secondWord = "";
	var thirdWord = "";
	
	if (pFix[0] === "a")
	{
		firstWord = "analogue ";
	}
	else if (pFix[0] === "d")
	{
		firstWord = "digital ";
	}
	else if (pFix[0] === "r")
	{
		firstWord = "relay ";
	}
	
	if (pFix[1] === "i")
	{
		secondWord = "input ";
	}
	else if (pFix[1] === "o")
	{
		secondWord = "output ";
	}
	
	if (pFix.length > 3)
	{
		thirdWord = pFix.substring(3);
	}
	
	var fullText = firstWord + secondWord + thirdWord;
	fullText = fullText.trim();
	
	return fullText;
}






exports.callTestNodeObjectArrayStructure = testNodeObjectArrayStructure;
exports.callTestNodeObjectArrayProperties = testNodeObjectArrayProperties;
exports.callTestNodeObjectArrayContents = testNodeObjectArrayContents;
exports.callTestNodeStorageObject = testNodeStorageObject;
exports.callTestNodeStoreCount = testNodeStoreCount;
exports.callTestNodeManufacturerArray = testNodeManufacturerArray;
exports.callTestStatusControlStructure = testStatusControlStructure;
exports.callTestStatusControlSyntax = testStatusControlSyntax;
exports.callTestStatusControlIntegrity = testStatusControlIntegrity;