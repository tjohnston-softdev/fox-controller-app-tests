const chai = require("chai");
const expect = require("chai").expect;
const commonPaths = require("../../../app/paths/files/app-paths");
const commonObjectsFile = require(commonPaths.commonObjects);
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);


function testCommonObjects()
{
	describe("Common Objects", function()
	{
		it("Unknown ID", function()
		{
			commonFunctions.testString(commonObjectsFile.unknownID);
		});
		
		it("Device Objects", function()
		{
			handleDeviceObject('testDevice');
			handleDeviceObject('crudDevice');
			handleDeviceObject('modifiedDevice');
			handleDeviceObject('nodeDevice');
		});
		
		it("Node Object", function()
		{
			handleRegisterNodeObject();
		});
		
	});
}



function handleDeviceObject(devicePropName)
{
	var deviceObj = commonObjectsFile[devicePropName];
	
	commonFunctions.testObject(deviceObj);
	
	commonFunctions.testString(deviceObj.id);
	commonFunctions.testString(deviceObj.deviceType);
	commonFunctions.testString(deviceObj.maker);
	commonFunctions.testString(deviceObj.model);
	commonFunctions.testString(deviceObj.name);
	commonFunctions.testString(deviceObj.desc);
	commonFunctions.testString(deviceObj.ipAddress);
	commonFunctions.testString(deviceObj.username);
	commonFunctions.testString(deviceObj.password);
	commonFunctions.testBoolean(deviceObj.isEnabled);
}

function handleRegisterNodeObject()
{
	var getRegisterName = 'nodeConfigObject';
	var registerResult = null;
	
	commonFunctions.testFunction(commonObjectsFile.getRegisterNode);
	registerResult = commonObjectsFile.getRegisterNode("Example Device", "Example Node", "RO-0");
	
	commonFunctions.testObject(registerResult);
	
	commonFunctions.testString(registerResult.id);
	commonFunctions.testString(registerResult.type);
	commonFunctions.testString(registerResult.z);
	commonFunctions.testString(registerResult.deviceId);
	commonFunctions.testString(registerResult.ioSetId);
	commonFunctions.testNumber(registerResult.x);
	commonFunctions.testNumber(registerResult.y);
	arrayFunctions.testNeutral(registerResult.wires);
}

module.exports = testCommonObjects;