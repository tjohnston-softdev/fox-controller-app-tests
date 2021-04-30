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
			elementIpValid = validatorModule.isIP(elementIP, 4);
		}
		else if (iEmpty === true)
		{
			elementIpValid = true;
		}
		else
		{
			elementIpValid = false;
		}
		
		expect(elementIpValid).to.be.true;
	}
}

function testArrayIpSixValue(iArray, iProp, iEmpty)
{
	var elementIndex = 0;
	var currentObject = null;
	var currentIP = null;
	var currentValid = null;
	
	for (elementIndex = 0; elementIndex < iArray.length; elementIndex = elementIndex + 1)
	{
		currentObject = iArray[elementIndex];
		currentIP = currentObject[iProp];
		currentValid = false;
		
		if (currentIP === "::1")
		{
			currentValid = true;
		}
		else if (currentIP.length > 0)
		{
			currentValid = validatorModule.isIP(currentIP, 6);
		}
		else if (iEmpty === true)
		{
			currentValid = true;
		}
		else
		{
			currentValid = false;
		}
		
		expect(currentValid).to.be.true;
	}
}


function testArrayMacValue(iArray, iProp, iEmpty)
{
	var elementIndex = 0;
	var currentObject = null;
	var currentMac = null;
	var currentValid = null;
	
	for (elementIndex = 0; elementIndex < iArray.length; elementIndex = elementIndex + 1)
	{
		currentObject = iArray[elementIndex];
		currentMac = currentObject[iProp];
		currentValid = false;
		
		if (currentMac.length > 0)
		{
			currentValid = validatorModule.isMACAddress(currentMac);
		}
		else if (currentMac === "" && iEmpty === true)
		{
			currentValid = true;
		}
		else
		{
			currentValid = false;
		}
		
		expect(currentValid).to.be.true;
	}
}




function testDhcpLeaseExpireValues(dhcpArray)
{
	var dhcpIndex = 0;
	var dhcpObject = null;
	
	for (dhcpIndex = 0; dhcpIndex < dhcpArray.length; dhcpIndex = dhcpIndex + 1)
	{
		dhcpObject = dhcpArray[dhcpIndex];
		expect(dhcpObject.leaseExpiry).to.be.at.least(1);
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
		
		expect(dhcpShortValid).to.be.true;
	}
}

function testWriteTimestamp(wObject, modifiedProperty, createdProperty)
{
	var modifiedValue = wObject[modifiedProperty];
	var createdValue = wObject[createdProperty];
	
	expect(modifiedValue).to.be.above(0);
	expect(createdValue).to.be.above(0);
	expect(modifiedValue).to.be.at.least(createdValue);
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
		
		expect(elementValid).to.be.true;
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
		expect(elementValue).to.be.at.least(0);
	}
}


function testPositiveNumberProperty(parentObject, propName)
{
	commonFunctionsFile.testObjectPropertyDefinition(parentObject, propName);
	commonFunctionsFile.testObjectPropertyContent(parentObject, propName, 'number');
	expect(parentObject[propName]).to.be.above(0);
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
		expect(aValue).to.be.above(0);
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