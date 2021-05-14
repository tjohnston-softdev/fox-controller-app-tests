const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const localValidFile = require(commonPaths.localValid);



function testNodeObjectArrayStructure(nodeObjArray)
{
	commonFunctionsFile.testPresent(nodeObjArray);
	expect(nodeObjArray).to.be.an("array");
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
	var currentArray = [];
	var totalCount = 0;
	
	for (currentManufacturer in storageObject)
	{
		currentArray = storageObject[currentManufacturer];
		totalCount = totalCount + currentArray.length;
	}
	
	return totalCount;
}



function testNodeManufacturerArray(nmArray)
{
	var stringIndex = 0;
	var currentElement = null;
	
	for (stringIndex = 0; stringIndex < nmArray.length; stringIndex = stringIndex + 1)
	{
		currentElement = nmArray[stringIndex];
		commonFunctionsFile.testString(currentElement);
	}
}


function testStatusControlStructure(structureObj)
{
	commonFunctionsFile.testPropertyDefinitions(structureObj, 'value');
	commonFunctionsFile.testPropertyDefinitions(structureObj, 'text');
	
	commonFunctionsFile.testPropertyContents(structureObj, 'value', 'string');
	commonFunctionsFile.testPropertyContents(structureObj, 'text', 'string');
}

function testStatusControlSyntax(structureObj)
{
	var rioIndex = 0;
	var currentElement = null;
	
	var currentPrefixValid = false;
	var currentNameValid = false;
	var currentElementValid = false;
	
	var canContinue = true;
	
	while (rioIndex >= 0 && rioIndex < structureObj.length && canContinue === true)
	{
		currentElement = structureObj[rioIndex];
		currentPrefixValid = localValidFile.validateRioPrefix(currentElement.value);
		currentNameValid = localValidFile.validateRioText(currentElement.text);
		currentElementValid = false;
		
		if (currentPrefixValid === true && currentNameValid === true)
		{
			currentElementValid = true;
		}
		
		if (currentElementValid !== true)
		{
			canContinue = false;
		}
		
		rioIndex = rioIndex + 1;
	}
	
	expect(canContinue).to.be.true;
}


function testStatusControlIntegrity(structureObj)
{
	var rioIndex = 0;
	var currentElement = null;
	
	var currentPrefixText = null;
	var currentNameText = null;
	var expectedNameText = null;
	
	var currentValid = false;
	var canContinue = true;
	
	while (rioIndex >= 0 && rioIndex < structureObj.length && canContinue === true)
	{
		currentElement = structureObj[rioIndex];
		currentPrefixText = currentElement.value.toLowerCase();
		currentNameText = currentElement.text.toLowerCase();
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
		
		rioIndex = rioIndex + 1;
	}
	
	expect(canContinue).to.be.true;
	
}

function writeExpectedNodeName(enteredPrefix)
{
	var firstCharacter = enteredPrefix.charAt(0);
	var secondCharacter = enteredPrefix.charAt(1);
	
	var firstWord = "";
	var secondWord = "";
	var thirdWord = "";
	
	var fullText = "";
	
	
	if (firstCharacter === "a")
	{
		firstWord = "analogue ";
	}
	else if (firstCharacter === "d")
	{
		firstWord = "digital ";
	}
	else if (firstCharacter === "r")
	{
		firstWord = "relay ";
	}
	
	if (secondCharacter === "i")
	{
		secondWord = "input ";
	}
	else if (secondCharacter === "o")
	{
		secondWord = "output ";
	}
	
	if (enteredPrefix.length > 3)
	{
		thirdWord = enteredPrefix.substring(3);
	}
	
	fullText = firstWord + secondWord + thirdWord;
	fullText = fullText.trim();
	
	return fullText;
}


module.exports =
{
	callTestNodeObjectArrayStructure: testNodeObjectArrayStructure,
	callTestNodeObjectArrayProperties: testNodeObjectArrayProperties,
	callTestNodeObjectArrayContents: testNodeObjectArrayContents,
	callTestNodeStorageObject: testNodeStorageObject,
	callTestNodeStoreCount: testNodeStoreCount,
	callTestNodeManufacturerArray: testNodeManufacturerArray,
	callTestStatusControlStructure: testStatusControlStructure,
	callTestStatusControlSyntax: testStatusControlSyntax,
	callTestStatusControlIntegrity: testStatusControlIntegrity
};