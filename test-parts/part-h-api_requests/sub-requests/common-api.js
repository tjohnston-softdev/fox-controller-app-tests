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

const validatorModule = require("validator");


function testArrayIpFourValue(iArray, iProp, iEmpty)
{
	var elementIndex = 0;
	var elementObject = null;
	var elementIP = null;
	var elementIpValid = null;
	
	for (elementIndex = 0; elementIndex < iArray.length; elementIndex = elementIndex + 1)
	{
		elementObject = iArray[elementIndex];
		elementIP = elementObject[iProp];
		elementIpValid = false;
		
		if (elementIP.length > 0)
		{
			elementIpValid = validatorModule.isIP(elementIP);
		}
		else if (iEmpty === true)
		{
			elementIpValid = true;
		}
		else
		{
			elementIpValid = false;
		}
		
		commonFunctionsFile.testTrue(elementIpValid);
	}
}

function testArrayIpSixValue(iArray, iProp, iEmpty)
{
	var elementIndex = 0;
	var elementObject = null;
	var elementIP = null;
	var elementIpValid = null;
	
	for (elementIndex = 0; elementIndex < iArray.length; elementIndex = elementIndex + 1)
	{
		elementObject = iArray[elementIndex];
		elementIP = elementObject[iProp];
		elementIpValid = localValidFile.validateIpAddressSix(elementIP, iEmpty);
		commonFunctionsFile.testTrue(elementIpValid);
	}
}


function testArrayMacValue(iArray, iProp, iEmpty)
{
	var elementIndex = 0;
	var elementObject = null;
	var elementMAC = null;
	var elementMacValid = null;
	
	for (elementIndex = 0; elementIndex < iArray.length; elementIndex = elementIndex + 1)
	{
		elementObject = iArray[elementIndex];
		elementMAC = elementObject[iProp];
		elementMacValid = localValidFile.validateMac(elementMAC, iEmpty);
		commonFunctionsFile.testTrue(elementMacValid);
	}
}




function testDhcpLeaseExpireValues(dhcpArray)
{
	var dhcpIndex = 0;
	var dhcpObject = null;
	
	for (dhcpIndex = 0; dhcpIndex < dhcpArray.length; dhcpIndex = dhcpIndex + 1)
	{
		dhcpObject = dhcpArray[dhcpIndex];
		commonFunctionsFile.testPositive(dhcpObject.leaseExpiry);
	}
}

function testDhcpMacLongValue(dhcpArray, emptyMacAllowed)
{
	testArrayMacValue(dhcpArray, 'mac', emptyMacAllowed);
}

function testDhcpMacShortValue(dhcpArray)
{
	var dhcpIndex = 0;
	var dhcpObject = null;
	var dhcpSub = null;
	var originalLower = null;
	var subLower = null;
	var dhcpShortValid = false;
	
	for (dhcpIndex = 0; dhcpIndex < dhcpArray.length; dhcpIndex = dhcpIndex + 1)
	{
		dhcpObject = dhcpArray[dhcpIndex];
		dhcpSub = dhcpObject.mac.substring(12);
		originalLower = dhcpObject.shortMac.toLowerCase();
		subLower = dhcpSub.toLowerCase();
		dhcpShortValid = false;
		
		if (subLower === originalLower)
		{
			dhcpShortValid = true;
		}
		
		commonFunctionsFile.testTrue(dhcpShortValid);
	}
}

function testWriteTimestamp(wObject, modifiedProperty, createdProperty)
{
	var modifiedValue = wObject[modifiedProperty];
	var createdValue = wObject[createdProperty];
	
	commonFunctionsFile.testPositive(modifiedValue);
	commonFunctionsFile.testPositive(createdValue);
	
	commonFunctionsFile.testLeast(modifiedValue, createdValue);
}

function testWriteTimestampArray(wArray, arrayModifyProperty, arrayCreateProperty)
{
	var elementIndex = 0;
	var elementObject = null;
	
	for (elementIndex = 0; elementIndex < wArray.length; elementIndex = elementIndex + 1)
	{
		elementObject = wArray[elementIndex];
		testWriteTimestamp(elementObject, arrayModifyProperty, arrayCreateProperty);
	}
}

function testFileNameArray(fnArray, fnProperty)
{
	var elementIndex = 0;
	var elementObject = null;
	var elementName = "";
	var elementValid = false;
	
	for (elementIndex = 0; elementIndex < fnArray.length; elementIndex = elementIndex + 1)
	{
		elementObject = fnArray[elementIndex];
		elementName = elementObject[fnProperty];
		elementValid = localValidFile.validateFilename(elementName);
		
		commonFunctionsFile.testTrue(elementValid);
	}
}

function testZeroLeastArray(objectArray, numberProperty)
{
	var elementIndex = 0;
	var elementObject = null;
	var elementValue = null;
	
	for (elementIndex = 0; elementIndex < objectArray.length; elementIndex = elementIndex + 1)
	{
		elementObject = objectArray[elementIndex];
		elementValue = elementObject[numberProperty];
		
		commonFunctionsFile.testZeroLeast(elementValue);
	}
}


function testPositiveNumberProperty(parentObject, propName)
{
	commonFunctionsFile.testObjectPropertyDefinition(parentObject, propName);
	commonFunctionsFile.testObjectPropertyContent(parentObject, propName, 'number');
	commonFunctionsFile.testPositive(parentObject[propName]);
}

function testPositiveNumberPropertyArray(parentArray, propName)
{
	var aIndex = 0;
	var aObject = null;
	var aValue = null;
	
	for (aIndex = 0; aIndex < parentArray.length; aIndex = aIndex + 1)
	{
		aObject = parentArray[aIndex];
		aValue = aObject[propName];
		commonFunctionsFile.testPositive(aValue);
	}
}

function testAlarmStateFlags(alarmObjectArray)
{
	var alarmObjectIndex = 0;
	var currentAlarmObject = null;
	
	for (alarmObjectIndex = 0; alarmObjectIndex < alarmObjectArray.length; alarmObjectIndex = alarmObjectIndex + 1)
	{
		currentAlarmObject = alarmObjectArray[alarmObjectIndex];
		commonFunctionsFile.testBinary(currentAlarmObject.state);
	}
}






exports.callTestArrayIpFourValue = testArrayIpFourValue;
exports.callTestArrayIpSixValue = testArrayIpSixValue;
exports.callTestArrayMacValue = testArrayMacValue;
exports.callTestDhcpLeaseExpireValues = testDhcpLeaseExpireValues;
exports.callTestDhcpMacLongValue = testDhcpMacLongValue;
exports.callTestDhcpMacShortValue = testDhcpMacShortValue;
exports.callTestWriteTimestamp = testWriteTimestamp;
exports.callTestWriteTimestampArray = testWriteTimestampArray;
exports.callTestFileNameArray = testFileNameArray;
exports.callTestZeroLeastArray = testZeroLeastArray;
exports.callTestPositiveNumberProperty = testPositiveNumberProperty;
exports.callTestPositiveNumberPropertyArray = testPositiveNumberPropertyArray;
exports.callTestAlarmStateFlags = testAlarmStateFlags;