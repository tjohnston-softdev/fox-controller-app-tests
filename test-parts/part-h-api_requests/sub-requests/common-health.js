const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);
const localValidFile = require(commonPaths.localValid);



function testHealthDeviceObject(hObject, hPlatform)
{
	commonFunctionsFile.testObjectPropertyDefinition(hObject, 'device');
	commonFunctionsFile.testObjectPropertyContent(hObject, 'device', 'object');
	
	commonFunctionsFile.testObjectPropertyDefinition(hObject.device, 'WARNING');
	commonFunctionsFile.testObjectPropertyDefinition(hObject.device, 'name');
	commonFunctionsFile.testObjectPropertyDefinition(hObject.device, 'serialNumber');
	commonFunctionsFile.testObjectPropertyDefinition(hObject.device, 'hardware');
	commonFunctionsFile.testObjectPropertyDefinition(hObject.device, 'wifiPass');
	
	commonFunctionsFile.testString(hObject.device.WARNING);
	commonFunctionsFile.testString(hObject.device.name);
	commonFunctionsFile.testString(hObject.device.serialNumber);
	commonFunctionsFile.testString(hObject.device.hardware);
	commonFunctionsFile.testString(hObject.device.wifiPass);
	
	expect(hObject.device.WARNING).to.equal("DO NOT MODIFY THIS FILE!");
	
}


function testHealthTimezoneCodeValue(tzCode)
{
	var tzValid = localValidFile.validateTimezoneOffset(tzCode, false);
	expect(tzValid).to.be.true;
}

function testHealthNumberMaximum(srcObject, propName, maxVal)
{
	commonFunctionsFile.testObjectPropertyDefinition(srcObject, propName);
	commonFunctionsFile.testObjectPropertyContent(srcObject, propName, 'number');
	commonFunctionsFile.testZeroLeast(srcObject[propName]);
	commonFunctionsFile.testMost(srcObject[propName], maxVal);
}

function testHealthEnvironmentValue(eObject, eProp, ePlatform)
{
	commonFunctionsFile.testObjectPropertyDefinition(eObject, eProp);
	commonFunctionsFile.testObjectPropertyContent(eObject, eProp, 'number');
	
	if (ePlatform === 'win32' || ePlatform === 'mac' || ePlatform === 'darwin')
	{
		commonFunctionsFile.testNegative(eObject[eProp]);
	}
	else
	{
		commonFunctionsFile.testZeroLeast(eObject[eProp]);
	}
}

function testHealthEnvironmentDummy(eObject, ePlatform)
{
	if (ePlatform === 'win32' || ePlatform === 'mac' || ePlatform === 'darwin')
	{
		commonFunctionsFile.testObjectPropertyDefinition(eObject, 'isDummy');
		commonFunctionsFile.testObjectPropertyContent(eObject, 'isDummy', 'boolean');
		expect(eObject.isDummy).to.be.true;
	}
	else
	{
		commonFunctionsFile.testPlaceholder();
	}
	
}





exports.callTestHealthDeviceObject = testHealthDeviceObject;
exports.callTestHealthTimezoneCodeValue = testHealthTimezoneCodeValue;
exports.callTestHealthNumberMaximum = testHealthNumberMaximum;
exports.callTestHealthEnvironmentValue = testHealthEnvironmentValue;
exports.callTestHealthEnvironmentDummy = testHealthEnvironmentDummy;