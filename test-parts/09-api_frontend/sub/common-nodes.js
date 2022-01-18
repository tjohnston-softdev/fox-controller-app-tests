const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const localValidFile = require(commonPaths.localValid);
const nodeNames = require(commonPaths.nodeNames);


function testNodeObjectArrayStructure(nodeObjArray)
{
	commonFunctions.testPresent(nodeObjArray);
	expect(nodeObjArray).to.be.an("array");
	arrayFunctions.testAllType(nodeObjArray, 'object');
}


function testNodeObjectArrayProperties(nodeObjArray)
{
	arrayFunctions.testAllPropExists(nodeObjArray, 'value');
	arrayFunctions.testAllPropExists(nodeObjArray, 'text');
	arrayFunctions.testAllPropExists(nodeObjArray, 'name');
}

function testNodeObjectArrayContents(nodeObjArray)
{
	arrayFunctions.testAllPropType(nodeObjArray, 'value', 'string');
	arrayFunctions.testAllPropType(nodeObjArray, 'text', 'string');
	arrayFunctions.testAllPropType(nodeObjArray, 'name', 'string');
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
		commonFunctions.testString(currentElement);
	}
}


function testStatusControlArrayStructure(structureObj)
{
	arrayFunctions.testAllPropExists(structureObj, 'value');
	arrayFunctions.testAllPropExists(structureObj, 'text');
	
	arrayFunctions.testAllPropType(structureObj, 'value', 'string');
	arrayFunctions.testAllPropType(structureObj, 'text', 'string');
}

function testStatusControlArraySyntax(structureObj)
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


function testStatusControlArrayIntegrity(structureObj)
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
	var fullText = "";
	
	fullText += nodeNames.parseDataType(firstCharacter);
	fullText += nodeNames.parseDataMode(secondCharacter);
	fullText += nodeNames.parseIndexNumber(enteredPrefix);
	
	fullText = fullText.trim();
	return fullText;
}


module.exports =
{
	testArrayStructure: testNodeObjectArrayStructure,
	testArrayProperties: testNodeObjectArrayProperties,
	testArrayContents: testNodeObjectArrayContents,
	testStorageObject: testNodeStorageObject,
	testStoreCount: testNodeStoreCount,
	testManufacturerArray: testNodeManufacturerArray,
	testStatusControlStructure: testStatusControlArrayStructure,
	testStatusControlSyntax: testStatusControlArraySyntax,
	testStatusControlIntegrity: testStatusControlArrayIntegrity
};