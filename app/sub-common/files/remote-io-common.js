const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);


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

function testDeviceIdListed(deviceArr, targetDeviceID)
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

function testLocalDeviceArrayPopulated(locArr)
{
	commonFunctionsFile.testPresent(locArr);
	arrayFunctions.testPopulated(locArr);
}

function testLocalDeviceArrayEmpty(locArr)
{
	commonFunctionsFile.testPresent(locArr);
	arrayFunctions.testEmpty(locArr);
}

function testLocalDeviceArrayNeutral(locArr)
{
	commonFunctionsFile.testPresent(locArr);
	expect(locArr).to.be.an("array");
}


function testLocalDeviceArrayDynamic(localArr, itemsRequiredFlag)
{
	if (itemsRequiredFlag > 0)
	{
		testLocalDeviceArrayPopulated(localArr);
	}
	else if (itemsRequiredFlag < 0)
	{
		testLocalDeviceArrayEmpty(localArr);
	}
	else
	{
		testLocalDeviceArrayNeutral(localArr);
	}
}



function testDeviceListReturnEmpty(dListReturn)
{
	testLocalDeviceArrayEmpty(dListReturn);
	testDeviceListCommon(dListReturn);
}

function testDeviceListReturnPopulated(dListReturn)
{
	testLocalDeviceArrayPopulated(dListReturn);
	testDeviceListCommon(dListReturn);
}

function testDeviceListReturnNeutral(dListReturn)
{
	testLocalDeviceArrayNeutral(dListReturn);
	testDeviceListCommon(dListReturn);
}


function testDeviceListReturnDynamic(dListRet, itemsRequiredFlag)
{
	if (itemsRequiredFlag > 0)
	{
		testDeviceListReturnPopulated(dListRet);
	}
	else if (itemsRequiredFlag < 0)
	{
		testDeviceListReturnEmpty(dListRet);
	}
	else
	{
		testDeviceListReturnNeutral(dListRet);
	}
}


function testDeviceListCommon(dListRet)
{
	arrayFunctions.testAllType(dListRet, 'object');
	testDeviceArrayStructure(dListRet);
}


module.exports =
{
	testDeviceArray: testDeviceArrayStructure,
	testDeviceObject: testDeviceObjectStructure,
	compareToOriginal: compareGetDeviceToOriginal,
	testDeviceDeleted: testDeviceDeletedStructure,
	testNodeConfigObject: testNodeConfigObjectStructure,
	testPropertyArray: testPropertyArrayStructure,
	testIdListed: testDeviceIdListed,
	testLocalArrayPopulated: testLocalDeviceArrayPopulated,
	testLocalArrayEmpty: testLocalDeviceArrayEmpty,
	testLocalArrayNeutral: testLocalDeviceArrayNeutral,
	testLocalArrayDynamic: testLocalDeviceArrayDynamic,
	testDeviceListEmpty: testDeviceListReturnEmpty,
	testDeviceListPopulated: testDeviceListReturnPopulated,
	testDeviceListNeutral: testDeviceListReturnNeutral,
	testDeviceListDynamic: testDeviceListReturnDynamic
};