const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const oFormat = "oFormat";
const oValue = "oValue";
const oType = "oType";
const oProp = "oProp";

function getInvalidDeviceTypeObject(originalDefinition)
{
	var iValErr = commonErrorStringsFile.writeRemoteIoPropertyError("deviceType", "Unknown");
	var iTypeErr = commonErrorStringsFile.writeRemoteIoPropertyError("deviceType", "-1");
	var iPropErr = commonErrorStringsFile.writeRemoteIoPropertyError("deviceType", "undefined");
	
	var iValObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iTypeObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iPropObj = commonFunctionsFile.cloneObject(originalDefinition);
			
	iValObj.deviceType = "Unknown";
	iTypeObj.deviceType = -1;
	delete iPropObj.deviceType;
	
	var iValRes = combineErrorObject(iValErr, iValObj);
	var iTypeRes = combineErrorObject(iTypeErr, iTypeObj);
	var iPropRes = combineErrorObject(iPropErr, iPropObj);
	
	var res = getResultObjectVTP(iValRes, iTypeRes, iPropRes);
	return res;
}

function getInvalidManufacturerObject(originalDefinition, propNull)
{
	var propContent = "undefined";
	
	if (propNull === true)
	{
		propContent = "null";
	}
	
	var iValErr = commonErrorStringsFile.writeRemoteIoPropertyError("maker", "Unknown");
	var iTypeErr = commonErrorStringsFile.writeRemoteIoPropertyError("maker", "-1");
	var iPropErr = commonErrorStringsFile.writeRemoteIoPropertyError("maker", propContent);
			
	var iValObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iTypeObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iPropObj = commonFunctionsFile.cloneObject(originalDefinition);
			
	iValObj.maker = "Unknown";
	iTypeObj.maker = -1;
	delete iPropObj.maker;
	
	var iValRes = combineErrorObject(iValErr, iValObj);
	var iTypeRes = combineErrorObject(iTypeErr, iTypeObj);
	var iPropRes = combineErrorObject(iPropErr, iPropObj);
	
	var res = getResultObjectVTP(iValRes, iTypeRes, iPropRes);
	return res;
}

function getInvalidModelObject(originalDefinition)
{
	var iValErr = commonErrorStringsFile.writeRemoteIoPropertyError("model", "Unknown");
	var iTypeErr = commonErrorStringsFile.writeRemoteIoPropertyError("model", "-1");
	var iPropErr = commonErrorStringsFile.writeRemoteIoPropertyError("model", "undefined");
			
	var iValObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iTypeObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iPropObj = commonFunctionsFile.cloneObject(originalDefinition);
			
	iValObj.model = "Unknown";
	iTypeObj.model = -1;
	delete iPropObj.model;
	
	var iValRes = combineErrorObject(iValErr, iValObj);
	var iTypeRes = combineErrorObject(iTypeErr, iTypeObj);
	var iPropRes = combineErrorObject(iPropErr, iPropObj);
	
	var res = getResultObjectVTP(iValRes, iTypeRes, iPropRes);
	return res;
}

function getInvalidIPAddressObject(originalDefinition)
{			
	var iFormObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iValObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iTypeObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iPropObj = commonFunctionsFile.cloneObject(originalDefinition);
			
	iFormObj.ipAddress = "192.168.321.456";
	iValObj.ipAddress = "Unknown";
	iTypeObj.ipAddress = -1;
	delete iPropObj.ipAddress;
	
	var iFormRes = combineErrorObject(commonErrorStringsFile.ipInvalid, iFormObj);
	var iValRes = combineErrorObject(commonErrorStringsFile.ipInvalid, iValObj);
	var iTypeRes = combineErrorObject(commonErrorStringsFile.ipInvalid, iTypeObj);
	var iPropRes = combineErrorObject(commonErrorStringsFile.ipInvalid, iPropObj);
	
	var res = getResultObjectFVTP(iFormRes, iValRes, iTypeRes, iPropRes);
	return res;
}


function getInvalidMacAddressObject(originalDefinition)
{
	var iTypeErr = commonErrorStringsFile.writeRemoteIoPropertyConstruct("macAddress", "string", "-1");
	var iPropErr = commonErrorStringsFile.writeRemoteIoPropertyConstruct("macAddress", "string", "undefined");
	
	var iTypeObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iPropObj = commonFunctionsFile.cloneObject(originalDefinition);
	
	iTypeObj.macAddress = -1;
	delete iPropObj.macAddress;
	
	var iTypeRes = combineErrorObject(iTypeErr, iTypeObj);
	var iPropRes = combineErrorObject(iPropErr, iPropObj);
	
	var res = getResultObjectTP(iTypeRes, iPropRes);
	return res;
}


function getInvalidIDStringObject(originalDefinition, tErr, pErr)
{			
	var iTypeObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iPropObj = commonFunctionsFile.cloneObject(originalDefinition);
			
	iTypeObj.id = -1;
	delete iPropObj.id;
	
	var iTypeRes = combineErrorObject(tErr, iTypeObj);
	var iPropRes = combineErrorObject(pErr, iPropObj);
	
	var res = getResultObjectTP(iTypeRes, iPropRes);
	return res;
}

function getInvalidNameStringObject(originalDefinition)
{
	var iTypeErr = commonErrorStringsFile.writeRemoteIoPropertyConstruct("name", "string", "-1");
	var iPropErr = commonErrorStringsFile.writeRemoteIoPropertyConstruct("name", "string", "undefined");
			
	var iTypeObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iPropObj = commonFunctionsFile.cloneObject(originalDefinition);
			
	iTypeObj.name = -1;
	delete iPropObj.name;
	
	var iTypeRes = combineErrorObject(iTypeErr, iTypeObj);
	var iPropRes = combineErrorObject(iPropErr, iPropObj);
	
	var res = getResultObjectTP(iTypeRes, iPropRes);
	return res;
}

function getInvalidEnabledFlagObject(originalDefinition)
{
	var iTypeErr = commonErrorStringsFile.writeRemoteIoPropertyConstruct("isEnabled", "boolean", "-1");
	var iPropErr = commonErrorStringsFile.writeRemoteIoPropertyConstruct("isEnabled", "boolean", "undefined");
			
	var iTypeObj = commonFunctionsFile.cloneObject(originalDefinition);
	var iPropObj = commonFunctionsFile.cloneObject(originalDefinition);
			
	iTypeObj.isEnabled = -1;
	delete iPropObj.isEnabled;
	
	var iTypeRes = combineErrorObject(iTypeErr, iTypeObj);
	var iPropRes = combineErrorObject(iPropErr, iPropObj);
	
	var res = getResultObjectTP(iTypeRes, iPropRes);
	return res;
}

function getInvalidDeviceTypeObjectFactory(oDef)
{
	var resultFull = getInvalidDeviceTypeObject(oDef);
	var resultFact = getResultObjectTP(resultFull.oType, resultFull.oProp);
	return resultFact;
}

function getInvalidManufacturerObjectFactory(oDef)
{
	var resultFull = getInvalidManufacturerObject(oDef, false);
	var resultFact = getResultObjectTP(resultFull.oType, resultFull.oProp);
	return resultFact;
}

function getInvalidModelObjectFactory(oDef)
{
	var resultFull = getInvalidModelObject(oDef);
	var resultFact = getResultObjectTP(resultFull.oType, resultFull.oProp);
	return resultFact;
}

function getInvalidIPAddressObjectFactory(oDef)
{
	var resultFull = getInvalidIPAddressObject(oDef);
	var resultFact = getResultObjectTP(resultFull.oType, resultFull.oProp);
	return resultFact;
}

function getInvalidIDStringObjectFactory(oDef)
{
	var iTypeErr = commonErrorStringsFile.writeRemoteIoPropertyConstruct("id", "string", "-1");
	var iPropErr = commonErrorStringsFile.writeRemoteIoPropertyConstruct("id", "string", "undefined");
	
	var resultFull = getInvalidIDStringObject(oDef, iTypeErr, iPropErr);
	return resultFull;
}

function getInvalidIDStringObjectModify(oDef)
{
	var missingErrorString = commonErrorStringsFile.idMissing;
	var resultFull = getInvalidIDStringObject(oDef, missingErrorString, missingErrorString);
	return resultFull;
}


function getResultObjectTP(t, p)
{
	var rObj =
	{
		oType: t,
		oProp: p
	};
	
	return rObj;
}

function getResultObjectVTP(v, t, p)
{
	var rObj =
	{
		oValue: v,
		oType: t,
		oProp: p
	};
	
	return rObj;
}

function getResultObjectFVTP(f, v, t, p)
{
	var rObj =
	{
		oFormat: f,
		oValue: v,
		oType: t,
		oProp: p
	};
	
	return rObj;
}

function combineErrorObject(aError, aObject)
{
	var combineResult = {"errorMessage": aError, "jsonObject": aObject};
	return combineResult;
}


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
	commonFunctionsFile.testStringNeutral(confObj.name);
	commonFunctionsFile.testString(confObj.deviceId);
	commonFunctionsFile.testString(confObj.ioSetId);
	commonFunctionsFile.testType(confObj.x, 'number');
	commonFunctionsFile.testType(confObj.y, 'number');
	commonFunctionsFile.testArrayNeutral(confObj.wires);
	
	
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
	commonFunctionsFile.testArray(locArr);
}

function testLocalArrayEmpty(locArr)
{
	commonFunctionsFile.testPresent(locArr);
	commonFunctionsFile.testArrayEmpty(locArr);
}

function testLocalArrayNeutral(locArr)
{
	commonFunctionsFile.testPresent(locArr);
	commonFunctionsFile.testArrayNeutral(locArr);
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



exports.callInvalidDeviceTypeObject = getInvalidDeviceTypeObject;
exports.callInvalidManufacturerObject = getInvalidManufacturerObject;
exports.callInvalidModelObject = getInvalidModelObject;
exports.callInvalidIPAddressObject = getInvalidIPAddressObject;
exports.callInvalidMacAddressObject = getInvalidMacAddressObject;
exports.callInvalidNameStringObject = getInvalidNameStringObject;
exports.callInvalidEnabledFlagObject = getInvalidEnabledFlagObject;
exports.callInvalidDeviceTypeObjectFactory = getInvalidDeviceTypeObjectFactory;
exports.callInvalidManufacturerObjectFactory = getInvalidManufacturerObjectFactory;
exports.callInvalidModelObjectFactory = getInvalidModelObjectFactory;
exports.callInvalidIPAddressObjectFactory = getInvalidIPAddressObjectFactory;
exports.callInvalidIDStringObjectFactory = getInvalidIDStringObjectFactory;
exports.callInvalidIDStringObjectModify = getInvalidIDStringObjectModify;
exports.callCombineErrorObject = combineErrorObject;
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
