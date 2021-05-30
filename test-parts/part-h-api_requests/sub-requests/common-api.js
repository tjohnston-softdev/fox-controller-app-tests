const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const validator = require("validator");

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const localValidFile = require(commonPaths.localValid);


function testArrayIpFourValue(objectArray, ipProp, ipEmptyAllowed)
{
	var loopIndex = 0;
	var currentObject = {};
	var currentIP = "";
	var currentValid = false;
	
	for (loopIndex = 0; loopIndex < objectArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = objectArray[loopIndex];
		currentIP = currentObject[ipProp];
		currentValid = false;
		
		if (currentIP.length > 0)
		{
			currentValid = validator.isIP(currentIP, 4);
		}
		else if (ipEmptyAllowed === true)
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

function testArrayIpSixValue(objectArray, ipProp, ipEmptyAllowed)
{
	var loopIndex = 0;
	var currentObject = {};
	var currentIP = "";
	var currentValid = false;
	
	for (loopIndex = 0; loopIndex < objectArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = objectArray[loopIndex];
		currentIP = currentObject[ipProp];
		currentValid = false;
		
		if (currentIP === "::1")
		{
			currentValid = true;
		}
		else if (currentIP.length > 0)
		{
			currentValid = validator.isIP(currentIP, 6);
		}
		else if (ipEmptyAllowed === true)
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


function testArrayMacValue(objectArray, macProp, macEmptyAllowed)
{
	var loopIndex = 0;
	var currentObject = null;
	var currentMac = null;
	var currentValid = null;
	
	for (loopIndex = 0; loopIndex < objectArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = objectArray[loopIndex];
		currentMac = currentObject[macProp];
		currentValid = false;
		
		if (currentMac.length > 0)
		{
			currentValid = validator.isMACAddress(currentMac);
		}
		else if (currentMac === "" && macEmptyAllowed === true)
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




function testArrayDhcpLeaseExpireValues(dhcpArray)
{
	var dhcpIndex = 0;
	var dhcpObject = null;
	
	for (dhcpIndex = 0; dhcpIndex < dhcpArray.length; dhcpIndex = dhcpIndex + 1)
	{
		dhcpObject = dhcpArray[dhcpIndex];
		expect(dhcpObject.leaseExpiry).to.be.at.least(1);
	}
}

function testDhcpMacLongValue(dhcpArray, dhcpMacOptional)
{
	testArrayMacValue(dhcpArray, 'mac', dhcpMacOptional);
}

function testDhcpMacShortValue(dhcpArray)
{
	var dhcpIndex = 0;
	var currentObject = {};
	var currentSubstring = "";
	var currentOrigLower = "";
	var currentSubLower = "";
	
	for (dhcpIndex = 0; dhcpIndex < dhcpArray.length; dhcpIndex = dhcpIndex + 1)
	{
		currentObject = dhcpArray[dhcpIndex];
		currentSubstring = currentObject.mac.substring(12);
		currentOrigLower = currentObject.shortMac.toLowerCase();
		currentSubLower = currentSubstring.toLowerCase();
		
		expect(currentOrigLower).to.equal(currentSubLower);
	}
}

function testWriteTimestampValue(writeObject, modifiedProperty, createdProperty)
{
	var modifiedValue = writeObject[modifiedProperty];
	var createdValue = writeObject[createdProperty];
	
	expect(modifiedValue).to.be.above(0);
	expect(createdValue).to.be.above(0);
	expect(modifiedValue).to.be.at.least(createdValue);
}

function testWriteTimestampArrayValues(writeArray, arrayModifyProperty, arrayCreateProperty)
{
	var loopIndex = 0;
	var currentObject = {};
	
	for (loopIndex = 0; loopIndex < writeArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = writeArray[loopIndex];
		testWriteTimestampValue(currentObject, arrayModifyProperty, arrayCreateProperty);
	}
}

function testFileNameArray(objectArray, nameProp)
{
	var loopIndex = 0;
	var currentObject = {};
	var currentName = "";
	var currentValid = false;
	
	for (loopIndex = 0; loopIndex < objectArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = objectArray[loopIndex];
		currentName = currentObject[nameProp];
		currentValid = localValidFile.validateFilename(currentName);
		
		expect(currentValid).to.be.true;
	}
}

function testZeroLeastArray(objectArray, numberProp)
{
	var loopIndex = 0;
	var currentObject = {};
	var currentValue = -1;
	
	for (loopIndex = 0; loopIndex < objectArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = objectArray[loopIndex];
		currentValue = currentObject[numberProp];
		expect(currentValue).to.be.at.least(0);
	}
}


function testPositiveNumberProperty(parentObject, propName)
{
	var givenValue = -1;
	
	commonFunctionsFile.testObjectPropertyDefinition(parentObject, propName);
	commonFunctionsFile.testObjectPropertyContent(parentObject, propName, 'number');
	givenValue = parentObject[propName];
	expect(givenValue).to.be.above(0);
}

function testPositiveNumberPropertyArray(parentArray, propName)
{
	var loopIndex = 0;
	var currentObject = {};
	var currentValue = -1;
	
	for (loopIndex = 0; loopIndex < parentArray.length; loopIndex = loopIndex + 1)
	{
		currentObject = parentArray[loopIndex];
		currentValue = currentObject[propName];
		expect(currentValue).to.be.above(0);
	}
}

function testAlarmStateFlags(objectArray)
{
	var loopIndex = 0;
	var currentAlarmObject = {};
	
	for (loopIndex = 0; loopIndex < objectArray.length; loopIndex = loopIndex + 1)
	{
		currentAlarmObject = objectArray[loopIndex];
		commonFunctionsFile.testBinary(currentAlarmObject.state);
	}
}



module.exports =
{
	testArrayIpFour: testArrayIpFourValue,
	testArrayIpSix: testArrayIpSixValue,
	testArrayMac: testArrayMacValue,
	testArrayDhcpLeaseExpire: testArrayDhcpLeaseExpireValues,
	testDhcpMacLong: testDhcpMacLongValue,
	testDhcpMacShort: testDhcpMacShortValue,
	testWriteTimestamp: testWriteTimestampValue,
	testWriteTimestampArray: testWriteTimestampArrayValues,
	testFileNames: testFileNameArray,
	testZeroLeastNumbers: testZeroLeastArray,
	testPositiveNumber: testPositiveNumberProperty,
	testPositiveNumberArray: testPositiveNumberPropertyArray,
	testAlarmStates: testAlarmStateFlags
};