const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const objectFunctions = require(commonPaths.testObject);


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
	var passVal = deviceObj["password"];
	var modVal = deviceObj["__modified"];
	
	commonFunctions.testString(deviceObj.id);
	commonFunctions.testString(deviceObj.maker);
	commonFunctions.testString(deviceObj.deviceType);
	commonFunctions.testString(deviceObj.model);
	commonFunctions.testString(deviceObj.name);
	commonFunctions.testString(deviceObj.desc);
	commonFunctions.testString(deviceObj.ipAddress);
	commonFunctions.testString(deviceObj.username);
	commonFunctions.testString(passVal);
	commonFunctions.testBoolean(deviceObj.isEnabled);
	commonFunctions.testNumber(modVal);
	commonFunctions.testStringOptional(deviceObj.macAddress);
}

function compareGetDeviceToOriginal(retObj, origObj)
{
	objectFunctions.testSameValues(retObj, origObj, 'deviceType');
	objectFunctions.testSameValues(retObj, origObj, 'maker');
	objectFunctions.testSameValues(retObj, origObj, 'model');
	objectFunctions.testSameValues(retObj, origObj, 'name');
	objectFunctions.testSameValues(retObj, origObj, 'desc');
	objectFunctions.testSameValues(retObj, origObj, 'ipAddress');
	objectFunctions.testSameValues(retObj, origObj, 'username');
	objectFunctions.testSameValues(retObj, origObj, 'password');
	objectFunctions.testSameValues(retObj, origObj, 'isEnabled');
	objectFunctions.testSameValues(retObj, origObj, 'macAddress');
}

function testDeviceDeletedStructure(deviceDelObj)
{
	testDeviceObjectStructure(deviceDelObj);
	commonFunctions.testBoolean(deviceDelObj.isDeleted);
}


function testNodeConfigObjectStructure(configObj)
{	
	commonFunctions.testString(configObj.id);
	commonFunctions.testString(configObj.type);
	commonFunctions.testString(configObj.z);
	commonFunctions.testStringOptional(configObj.name);
	commonFunctions.testString(configObj.deviceId);
	commonFunctions.testString(configObj.ioSetId);
	commonFunctions.testNumber(configObj.x);
	commonFunctions.testNumber(configObj.y);
	arrayFunctions.testNeutral(configObj.wires);
}


function testPropertyArrayStructure(pArr)
{
	arrayFunctions.testAllPropType(pArr, 'value', 'string');
	arrayFunctions.testAllPropType(pArr, 'text', 'string');
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
	arrayFunctions.testPopulated(locArr);
}

function testLocalDeviceArrayEmpty(locArr)
{
	arrayFunctions.testEmpty(locArr);
}

function testLocalDeviceArrayNeutral(locArr)
{
	arrayFunctions.testNeutral(locArr);
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



function testDeviceListReturnEmpty(devListReturn)
{
	testLocalDeviceArrayEmpty(devListReturn);
	testDeviceListCommon(devListReturn);
}

function testDeviceListReturnPopulated(devListReturn)
{
	testLocalDeviceArrayPopulated(devListReturn);
	testDeviceListCommon(devListReturn);
}

function testDeviceListReturnNeutral(devListReturn)
{
	testLocalDeviceArrayNeutral(devListReturn);
	testDeviceListCommon(devListReturn);
}


function testDeviceListReturnDynamic(devListRet, itemsRequiredFlag)
{
	if (itemsRequiredFlag > 0)
	{
		testDeviceListReturnPopulated(devListRet);
	}
	else if (itemsRequiredFlag < 0)
	{
		testDeviceListReturnEmpty(devListRet);
	}
	else
	{
		testDeviceListReturnNeutral(devListRet);
	}
}


function testDeviceListCommon(devListRet)
{
	arrayFunctions.testAllType(devListRet, 'object');
	testDeviceArrayStructure(devListRet);
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