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
	objectFunctions.testPropExists(deviceObj, 'id');
	objectFunctions.testPropExists(deviceObj, 'maker');
	objectFunctions.testPropExists(deviceObj, 'deviceType');
	objectFunctions.testPropExists(deviceObj, 'model');
	objectFunctions.testPropExists(deviceObj, 'name');
	objectFunctions.testPropExists(deviceObj, 'desc');
	objectFunctions.testPropExists(deviceObj, 'ipAddress');
	objectFunctions.testPropExists(deviceObj, 'username');
	objectFunctions.testPropExists(deviceObj, 'password');
	objectFunctions.testPropExists(deviceObj, 'isEnabled');
	objectFunctions.testPropExists(deviceObj, '__modified');
	objectFunctions.testPropExists(deviceObj, 'macAddress');
	
	objectFunctions.testPropType(deviceObj, 'id', 'string');
	objectFunctions.testPropType(deviceObj, 'maker', 'string');
	objectFunctions.testPropType(deviceObj, 'deviceType', 'string');
	objectFunctions.testPropType(deviceObj, 'model', 'string');
	objectFunctions.testPropType(deviceObj, 'name', 'string');
	objectFunctions.testPropType(deviceObj, 'desc', 'string');
	objectFunctions.testPropType(deviceObj, 'ipAddress', 'string');
	objectFunctions.testPropType(deviceObj, 'username', 'string');
	objectFunctions.testPropType(deviceObj, 'password', 'string');
	objectFunctions.testPropType(deviceObj, 'isEnabled', 'boolean');
	objectFunctions.testPropType(deviceObj, '__modified', 'number');
	objectFunctions.testPropType(deviceObj, 'macAddress', 'string');
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
	
	objectFunctions.testPropExists(deviceDelObj, 'isDeleted');
	objectFunctions.testPropType(deviceDelObj, 'isDeleted', 'boolean');
}


function testNodeConfigObjectStructure(configObj)
{
	objectFunctions.testPropExists(configObj, 'id');
	objectFunctions.testPropExists(configObj, 'type');
	objectFunctions.testPropExists(configObj, 'z');
	objectFunctions.testPropExists(configObj, 'name');
	objectFunctions.testPropExists(configObj, 'deviceId');
	objectFunctions.testPropExists(configObj, 'ioSetId');
	objectFunctions.testPropExists(configObj, 'x');
	objectFunctions.testPropExists(configObj, 'y');
	objectFunctions.testPropExists(configObj, 'wires');
	
	commonFunctions.testString(configObj.id);
	commonFunctions.testString(configObj.type);
	commonFunctions.testString(configObj.z);
	expect(configObj.name).to.be.a("string");
	commonFunctions.testString(configObj.deviceId);
	commonFunctions.testString(configObj.ioSetId);
	expect(configObj.x).to.be.a('number');
	expect(configObj.y).to.be.a('number');
	expect(configObj.wires).to.be.an("array");
}


function testPropertyArrayStructure(pArr)
{	
	arrayFunctions.testAllPropExists(pArr, 'value');
	arrayFunctions.testAllPropExists(pArr, 'text');
	
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
	expect(locArr).to.exist;
	arrayFunctions.testEmpty(locArr);
}

function testLocalDeviceArrayNeutral(locArr)
{
	expect(locArr).to.exist;
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