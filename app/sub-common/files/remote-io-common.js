const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);


function testDeviceArrayStructure(deviceArr)
{
	var deviceIndex = 0;
	var currentObject = {};
	
	for (deviceIndex = 0; deviceIndex < deviceArr.length; deviceIndex = deviceIndex + 1)
	{
		currentObject = deviceArr[deviceIndex];
		testDeviceObjectStructure(currentObject);
	}
}

function testDeviceObjectStructure(deviceObj)
{
	commonFunctionsFile.testObjectPropertyDefinition(deviceObj, 'id');
	commonFunctionsFile.testObjectPropertyDefinition(deviceObj, 'maker');
	commonFunctionsFile.testObjectPropertyDefinition(deviceObj, 'deviceType');
	commonFunctionsFile.testObjectPropertyDefinition(deviceObj, 'model');
	commonFunctionsFile.testObjectPropertyDefinition(deviceObj, 'name');
	commonFunctionsFile.testObjectPropertyDefinition(deviceObj, 'desc');
	commonFunctionsFile.testObjectPropertyDefinition(deviceObj, 'ipAddress');
	commonFunctionsFile.testObjectPropertyDefinition(deviceObj, 'username');
	commonFunctionsFile.testObjectPropertyDefinition(deviceObj, 'password');
	commonFunctionsFile.testObjectPropertyDefinition(deviceObj, 'isEnabled');
	commonFunctionsFile.testObjectPropertyDefinition(deviceObj, '__modified');
	commonFunctionsFile.testObjectPropertyDefinition(deviceObj, 'macAddress');
	
	commonFunctionsFile.testObjectPropertyContent(deviceObj, 'id', 'string');
	commonFunctionsFile.testObjectPropertyContent(deviceObj, 'maker', 'string');
	commonFunctionsFile.testObjectPropertyContent(deviceObj, 'deviceType', 'string');
	commonFunctionsFile.testObjectPropertyContent(deviceObj, 'model', 'string');
	commonFunctionsFile.testObjectPropertyContent(deviceObj, 'name', 'string');
	commonFunctionsFile.testObjectPropertyContent(deviceObj, 'desc', 'string');
	commonFunctionsFile.testObjectPropertyContent(deviceObj, 'ipAddress', 'string');
	commonFunctionsFile.testObjectPropertyContent(deviceObj, 'username', 'string');
	commonFunctionsFile.testObjectPropertyContent(deviceObj, 'password', 'string');
	commonFunctionsFile.testObjectPropertyContent(deviceObj, 'isEnabled', 'boolean');
	commonFunctionsFile.testObjectPropertyContent(deviceObj, '__modified', 'number');
	commonFunctionsFile.testObjectPropertyContent(deviceObj, 'macAddress', 'string');
}

function compareGetDeviceToOriginal(retObj, origObj)
{
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(retObj, origObj, 'deviceType');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(retObj, origObj, 'maker');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(retObj, origObj, 'model');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(retObj, origObj, 'name');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(retObj, origObj, 'desc');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(retObj, origObj, 'ipAddress');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(retObj, origObj, 'username');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(retObj, origObj, 'password');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(retObj, origObj, 'isEnabled');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(retObj, origObj, 'macAddress');
}

function testDeviceDeletedStructure(deviceDelObj)
{
	testDeviceObjectStructure(deviceDelObj);
	
	commonFunctionsFile.testObjectPropertyDefinition(deviceDelObj, 'isDeleted');
	commonFunctionsFile.testObjectPropertyContent(deviceDelObj, 'isDeleted', 'boolean');
}


function testNodeConfigObjectStructure(configObj)
{
	commonFunctionsFile.testObjectPropertyDefinition(configObj, 'id');
	commonFunctionsFile.testObjectPropertyDefinition(configObj, 'type');
	commonFunctionsFile.testObjectPropertyDefinition(configObj, 'z');
	commonFunctionsFile.testObjectPropertyDefinition(configObj, 'name');
	commonFunctionsFile.testObjectPropertyDefinition(configObj, 'deviceId');
	commonFunctionsFile.testObjectPropertyDefinition(configObj, 'ioSetId');
	commonFunctionsFile.testObjectPropertyDefinition(configObj, 'x');
	commonFunctionsFile.testObjectPropertyDefinition(configObj, 'y');
	commonFunctionsFile.testObjectPropertyDefinition(configObj, 'wires');
	
	commonFunctionsFile.testString(configObj.id);
	commonFunctionsFile.testString(configObj.type);
	commonFunctionsFile.testString(configObj.z);
	expect(configObj.name).to.be.a("string");
	commonFunctionsFile.testString(configObj.deviceId);
	commonFunctionsFile.testString(configObj.ioSetId);
	expect(configObj.x).to.be.a('number');
	expect(configObj.y).to.be.a('number');
	expect(configObj.wires).to.be.an("array");
}


function testPropertyArrayStructure(pArr)
{	
	commonFunctionsFile.testPropertyDefinitions(pArr, 'value');
	commonFunctionsFile.testPropertyDefinitions(pArr, 'text');
	
	commonFunctionsFile.testPropertyContents(pArr, 'value', 'string');
	commonFunctionsFile.testPropertyContents(pArr, 'text', 'string');
}

function testIdListed(deviceArr, targetDeviceID)
{
	var listIndex = 0;
	var currentListedDevice = null;
	var targetFound = false;
	
	while (listIndex >= 0 && listIndex < deviceArr.length && targetFound !== true)
	{
		currentListedDevice = deviceArr[listIndex];
		
		if (currentListedDevice.id === targetDeviceID)
		{
			targetFound = true;
		}
		
		listIndex = listIndex + 1;
	}
	
	return targetFound;
}

function testLocalArray(locArr)
{
	commonFunctionsFile.testPresent(locArr);
	commonFunctionsFile.testArrayPopulated(locArr);
}

function testLocalArrayEmpty(locArr)
{
	commonFunctionsFile.testPresent(locArr);
	commonFunctionsFile.testArrayEmpty(locArr);
}

function testLocalArrayNeutral(locArr)
{
	commonFunctionsFile.testPresent(locArr);
	expect(locArr).to.be.an("array");
}


function testLocalArrayDynamic(localArr, itemsRequiredFlag)
{
	if (itemsRequiredFlag > 0)
	{
		testLocalArray(localArr);
	}
	else if (itemsRequiredFlag < 0)
	{
		testLocalArrayEmpty(localArr);
	}
	else
	{
		testLocalArrayNeutral(localArr);
	}
}



function testDeviceListValidReturnEmpty(dListReturn)
{
	testLocalArrayEmpty(dListReturn);
	testDeviceListCommon(dListReturn);
}

function testDeviceListValidReturnPopulated(dListReturn)
{
	testLocalArray(dListReturn);
	testDeviceListCommon(dListReturn);
}

function testDeviceListValidReturnNeutral(dListReturn)
{
	testLocalArrayNeutral(dListReturn);
	testDeviceListCommon(dListReturn);
}


function testDeviceListValidReturnDynamic(dListRet, itemsRequiredFlag)
{
	if (itemsRequiredFlag > 0)
	{
		testDeviceListValidReturnPopulated(dListRet);
	}
	else if (itemsRequiredFlag < 0)
	{
		testDeviceListValidReturnEmpty(dListRet);
	}
	else
	{
		testDeviceListValidReturnNeutral(dListRet);
	}
}


function testDeviceListCommon(dListRet)
{
	commonFunctionsFile.testAllElements(dListRet, 'object');
	testDeviceArrayStructure(dListRet);
}


module.exports =
{
	callTestDeviceArrayStructure: testDeviceArrayStructure,
	callTestDeviceObjectStructure: testDeviceObjectStructure,
	callCompareGetDeviceToOriginal: compareGetDeviceToOriginal,
	callTestDeviceDeletedStructure: testDeviceDeletedStructure,
	callTestNodeConfigObjectStructure: testNodeConfigObjectStructure,
	callTestPropertyArrayStructure: testPropertyArrayStructure,
	callTestIdListed: testIdListed,
	callTestLocalArray: testLocalArray,
	callTestLocalArrayEmpty: testLocalArrayEmpty,
	callTestLocalArrayNeutral: testLocalArrayNeutral,
	callTestLocalArrayDynamic: testLocalArrayDynamic,
	callTestDeviceListValidReturnEmpty: testDeviceListValidReturnEmpty,
	callTestDeviceListValidReturnPopulated: testDeviceListValidReturnPopulated,
	callTestDeviceListValidReturnNeutral: testDeviceListValidReturnNeutral,
	callTestDeviceListValidReturnDynamic: testDeviceListValidReturnDynamic
};