const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const localValidFile = require(commonPaths.localValid);
const sysPlatform = require(commonPaths.sysPlatform);


function testHealthDeviceObject(healthObj)
{
	commonFunctionsFile.testObjectPropertyDefinition(healthObj, 'device');
	commonFunctionsFile.testObjectPropertyContent(healthObj, 'device', 'object');
	
	commonFunctionsFile.testObjectPropertyDefinition(healthObj.device, 'WARNING');
	commonFunctionsFile.testObjectPropertyDefinition(healthObj.device, 'name');
	commonFunctionsFile.testObjectPropertyDefinition(healthObj.device, 'serialNumber');
	commonFunctionsFile.testObjectPropertyDefinition(healthObj.device, 'hardware');
	commonFunctionsFile.testObjectPropertyDefinition(healthObj.device, 'wifiPass');
	
	commonFunctionsFile.testString(healthObj.device.WARNING);
	commonFunctionsFile.testString(healthObj.device.name);
	commonFunctionsFile.testString(healthObj.device.serialNumber);
	commonFunctionsFile.testString(healthObj.device.hardware);
	commonFunctionsFile.testString(healthObj.device.wifiPass);
	
	expect(healthObj.device.WARNING).to.equal("DO NOT MODIFY THIS FILE!");
	
}


function testHealthTimezoneCodeValue(tzCode)
{
	var tzValid = localValidFile.validateTimezoneOffset(tzCode, false);
	expect(tzValid).to.be.true;
}

function testHealthNumberMaximum(srcObject, propName, maxVal)
{
	var givenValue = -1;
	
	commonFunctionsFile.testObjectPropertyDefinition(srcObject, propName);
	commonFunctionsFile.testObjectPropertyContent(srcObject, propName, 'number');
	givenValue = srcObject[propName];
	
	expect(givenValue).to.be.at.least(0);
	expect(givenValue).to.be.at.most(maxVal);
}

function testHealthEnvironmentValue(envObject, propName)
{
	var dummyUsed = sysPlatform.getDummy();
	var givenValue = null;
	
	commonFunctionsFile.testObjectPropertyDefinition(envObject, propName);
	commonFunctionsFile.testObjectPropertyContent(envObject, propName, 'number');
	givenValue = envObject[propName];
	
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
		commonFunctionsFile.testObjectPropertyDefinition(envObject, 'isDummy');
		expect(envObject.isDummy).to.be.true;
	}
	else
	{
		commonFunctionsFile.testPlaceholder();
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
			commonFunctionsFile.testPlaceholder();
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