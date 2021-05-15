const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);


function testDeviceArrayStructure(da)
{
	var deviceArrayIndex = 0;
	var currentArrayObject = null;
	
	for (deviceArrayIndex = 0; deviceArrayIndex < da.length; deviceArrayIndex = deviceArrayIndex + 1)
	{
		currentArrayObject = da[deviceArrayIndex];
		testDeviceObjectStructure(currentArrayObject);
	}
}

function testDeviceObjectStructure(dObj)
{
	commonFunctionsFile.testObjectPropertyDefinition(dObj, 'id');
	commonFunctionsFile.testObjectPropertyDefinition(dObj, 'maker');
	commonFunctionsFile.testObjectPropertyDefinition(dObj, 'deviceType');
	commonFunctionsFile.testObjectPropertyDefinition(dObj, 'model');
	commonFunctionsFile.testObjectPropertyDefinition(dObj, 'name');
	commonFunctionsFile.testObjectPropertyDefinition(dObj, 'desc');
	commonFunctionsFile.testObjectPropertyDefinition(dObj, 'ipAddress');
	commonFunctionsFile.testObjectPropertyDefinition(dObj, 'username');
	commonFunctionsFile.testObjectPropertyDefinition(dObj, 'password');
	commonFunctionsFile.testObjectPropertyDefinition(dObj, 'isEnabled');
	commonFunctionsFile.testObjectPropertyDefinition(dObj, '__modified');
	commonFunctionsFile.testObjectPropertyDefinition(dObj, 'macAddress');
	
	commonFunctionsFile.testObjectPropertyContent(dObj, 'id', 'string');
	commonFunctionsFile.testObjectPropertyContent(dObj, 'maker', 'string');
	commonFunctionsFile.testObjectPropertyContent(dObj, 'deviceType', 'string');
	commonFunctionsFile.testObjectPropertyContent(dObj, 'model', 'string');
	commonFunctionsFile.testObjectPropertyContent(dObj, 'name', 'string');
	commonFunctionsFile.testObjectPropertyContent(dObj, 'desc', 'string');
	commonFunctionsFile.testObjectPropertyContent(dObj, 'ipAddress', 'string');
	commonFunctionsFile.testObjectPropertyContent(dObj, 'username', 'string');
	commonFunctionsFile.testObjectPropertyContent(dObj, 'password', 'string');
	commonFunctionsFile.testObjectPropertyContent(dObj, 'isEnabled', 'boolean');
	commonFunctionsFile.testObjectPropertyContent(dObj, '__modified', 'number');
	commonFunctionsFile.testObjectPropertyContent(dObj, 'macAddress', 'string');
}

function compareGetDeviceToOriginal(dGet, dOrig)
{
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(dGet, dOrig, 'deviceType');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(dGet, dOrig, 'maker');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(dGet, dOrig, 'model');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(dGet, dOrig, 'name');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(dGet, dOrig, 'desc');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(dGet, dOrig, 'ipAddress');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(dGet, dOrig, 'username');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(dGet, dOrig, 'password');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(dGet, dOrig, 'isEnabled');
	commonFunctionsFile.testBothObjectsHaveSamePropertyValue(dGet, dOrig, 'macAddress');
}

function testDeviceDeletedStructure(deviceDelObj)
{
	testDeviceObjectStructure(deviceDelObj);
	
	commonFunctionsFile.testObjectPropertyDefinition(deviceDelObj, 'isDeleted');
	commonFunctionsFile.testObjectPropertyContent(deviceDelObj, 'isDeleted', 'boolean');
}


function testNodeConfigObjectStructure(confObj)
{
	commonFunctionsFile.testObjectPropertyDefinition(confObj, 'id');
	commonFunctionsFile.testObjectPropertyDefinition(confObj, 'type');
	commonFunctionsFile.testObjectPropertyDefinition(confObj, 'z');
	commonFunctionsFile.testObjectPropertyDefinition(confObj, 'name');
	commonFunctionsFile.testObjectPropertyDefinition(confObj, 'deviceId');
	commonFunctionsFile.testObjectPropertyDefinition(confObj, 'ioSetId');
	commonFunctionsFile.testObjectPropertyDefinition(confObj, 'x');
	commonFunctionsFile.testObjectPropertyDefinition(confObj, 'y');
	commonFunctionsFile.testObjectPropertyDefinition(confObj, 'wires');
	
	commonFunctionsFile.testString(confObj.id);
	commonFunctionsFile.testString(confObj.type);
	commonFunctionsFile.testString(confObj.z);
	expect(confObj.name).to.be.a("string");
	commonFunctionsFile.testString(confObj.deviceId);
	commonFunctionsFile.testString(confObj.ioSetId);
	expect(confObj.x).to.be.a('number');
	expect(confObj.y).to.be.a('number');
	expect(confObj.wires).to.be.an("array");
}


function testPropertyArrayStructure(pArr)
{	
	commonFunctionsFile.testPropertyDefinitions(pArr, 'value');
	commonFunctionsFile.testPropertyDefinitions(pArr, 'text');
	
	commonFunctionsFile.testPropertyContents(pArr, 'value', 'string');
	commonFunctionsFile.testPropertyContents(pArr, 'text', 'string');
}

function testIdListed(da, targetDeviceID)
{
	var listedDeviceIndex = 0;
	var currentListedDevice = null;
	var targetFound = false;
	
	while (listedDeviceIndex >= 0 && listedDeviceIndex < da.length && targetFound !== true)
	{
		currentListedDevice = da[listedDeviceIndex];
		
		if (currentListedDevice.id === targetDeviceID)
		{
			targetFound = true;
		}
		
		listedDeviceIndex = listedDeviceIndex + 1;
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


exports.callTestDeviceArrayStructure = testDeviceArrayStructure;
exports.callTestDeviceObjectStructure = testDeviceObjectStructure;
exports.callCompareGetDeviceToOriginal = compareGetDeviceToOriginal;
exports.callTestDeviceDeletedStructure = testDeviceDeletedStructure;
exports.callTestNodeConfigObjectStructure = testNodeConfigObjectStructure;
exports.callTestPropertyArrayStructure = testPropertyArrayStructure;
exports.callTestIdListed = testIdListed;
exports.callTestLocalArray = testLocalArray;
exports.callTestLocalArrayEmpty = testLocalArrayEmpty;
exports.callTestLocalArrayNeutral = testLocalArrayNeutral;
exports.callTestLocalArrayDynamic = testLocalArrayDynamic;
exports.callTestDeviceListValidReturnEmpty = testDeviceListValidReturnEmpty;
exports.callTestDeviceListValidReturnPopulated = testDeviceListValidReturnPopulated;
exports.callTestDeviceListValidReturnNeutral = testDeviceListValidReturnNeutral;
exports.callTestDeviceListValidReturnDynamic = testDeviceListValidReturnDynamic;
