const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const commonJsonObjectsFile = require(commonPaths.commonObjects);



function verifyDeviceListRefIntegrity(dList, sList)
{
	var deviceIndex = 0;
	var currentDevice = null;
	var currentErrorDesc = "";
	var currentMatch = false;
	var canContinue = true;
	
	while (deviceIndex >= 0 && deviceIndex < dList.length && canContinue === true)
	{
		currentDevice = dList[deviceIndex];
		currentErrorDesc = writeCurrentDeviceDescription(currentDevice);
		currentMatch = matchCurrentDevice(currentDevice, sList);
		
		if (currentMatch !== true)
		{
			canContinue = false;
			throw new Error(currentErrorDesc);
		}
		
		deviceIndex = deviceIndex + 1;
	}
	
	commonFunctionsFile.testTrue(canContinue);
}



function matchCurrentDevice(cDevice, sModels)
{
	var cManufacturerLower = cDevice.maker.toLowerCase();
	var cModelLower = cDevice.model.toLowerCase();
	
	var supportIndex = 0;
	var currentSupportEntry = null;
	var sManufacturerLower = "";
	var sModelLower = "";
	var matched = false;
	
	while (supportIndex >= 0 && supportIndex < sModels.length && matched !== true)
	{
		currentSupportEntry = sModels[supportIndex];
		sManufacturerLower = currentSupportEntry.maker.toLowerCase();
		sModelLower = currentSupportEntry.modelType.toLowerCase();
		
		if (cManufacturerLower === sManufacturerLower && cModelLower === sModelLower)
		{
			matched = true;
		}
		
		supportIndex = supportIndex + 1;
	}
	
	return matched;
}

function writeCurrentDeviceDescription(dv)
{
	var p1 = "'" + dv.maker + "'";
	var p2 = " - ";
	var p3 = "'" + dv.model + "'";
	var p4 = ", ";
	var p5 = "is not a supported device";
	
	var dRes = p1 + p2 + p3 + p4 + p5;
	return dRes;
}


exports.checkRefIntegrity = verifyDeviceListRefIntegrity;