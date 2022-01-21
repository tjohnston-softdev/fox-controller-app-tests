const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const localValidFile = require(commonPaths.localValid);
const sysPlatform = require(commonPaths.sysPlatform);


function testHealthDeviceObject(healthObj)
{
	commonFunctions.testObject(healthObj.device);
	
	expect(healthObj.device.WARNING).to.equal("DO NOT MODIFY THIS FILE!");
	commonFunctions.testString(healthObj.device.name);
	commonFunctions.testString(healthObj.device.serialNumber);
	commonFunctions.testString(healthObj.device.hardware);
	commonFunctions.testString(healthObj.device.wifiPass);
}


function testHealthTimezoneCodeValue(tzCode)
{
	var tzValid = localValidFile.validateTimezoneOffset(tzCode, false);
	expect(tzValid).to.be.true;
}

function testHealthNumberMaximum(srcObject, propName, maxVal)
{
	var givenValue = srcObject[propName];
	commonFunctions.testNumber(givenValue);
	expect(givenValue).to.be.within(0, maxVal);
}

function testHealthEnvironmentValue(envObject, propName)
{
	var dummyUsed = sysPlatform.getDummy();
	var givenValue = null;
	
	givenValue = envObject[propName];
	commonFunctions.testNumber(givenValue);
	
	if (dummyUsed === true)
	{
		expect(givenValue).to.be.below(0);
	}
	else
	{
		expect(givenValue).to.be.at.least(0);
	}
}

function testHealthEnvironmentDummy(envObject)
{
	var dummyUsed = sysPlatform.getDummy();
	
	if (dummyUsed === true)
	{
		expect(envObject.isDummy).to.be.true;
	}
	else
	{
		commonFunctions.testPlaceholder();
	}
	
}


function testNetworkInternalArray(netArray)
{
	var networkIndex = 0;
	var currentInterface = {};
	
	for (networkIndex = 0; networkIndex < netArray.length; networkIndex = networkIndex + 1)
	{
		currentInterface = netArray[networkIndex];
		
		if (currentInterface.internal !== undefined)
		{
			expect(currentInterface.internal).to.be.a("boolean");
		}
		else
		{
			commonFunctions.testPlaceholder();
		}
	}
}


module.exports =
{
	testDeviceObject: testHealthDeviceObject,
	testTimezoneCode: testHealthTimezoneCodeValue,
	testMaximumNumber: testHealthNumberMaximum,
	testEnvValue: testHealthEnvironmentValue,
	testEnvDummy: testHealthEnvironmentDummy,
	testNetworkInternal: testNetworkInternalArray
};