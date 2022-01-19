const chai = require("chai");
const expect = require("chai").expect;
const commonPaths = require("../../../app/paths/files/app-paths");
const commonObjectsFile = require(commonPaths.commonObjects);
const testCommon = require(commonPaths.testCommon);
const testObject = require(commonPaths.testObject);
const testArray = require(commonPaths.testArray);


function testCommonObjects()
{
	describe("Common Objects", function()
	{
		it("Unknown ID", function()
		{
			testCommon.testString(commonObjectsFile.unknownID);
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
	
	testCommon.testObject(deviceObj);
	
	testCommon.testString(deviceObj.id);
	testCommon.testString(deviceObj.deviceType);
	testCommon.testString(deviceObj.maker);
	testCommon.testString(deviceObj.model);
	testCommon.testString(deviceObj.name);
	testCommon.testString(deviceObj.desc);
	testCommon.testString(deviceObj.ipAddress);
	testCommon.testString(deviceObj.username);
	testCommon.testString(deviceObj.password);
	testCommon.testBoolean(deviceObj.isEnabled);
}

function handleRegisterNodeObject()
{
	var getRegisterName = 'nodeConfigObject';
	var registerResult = null;
	
	testCommon.testFunction(commonObjectsFile.getRegisterNode);
	registerResult = commonObjectsFile.getRegisterNode("Example Device", "Example Node", "RO-0");
	
	testCommon.testObject(registerResult);
	
	testCommon.testString(registerResult.id);
	testCommon.testString(registerResult.type);
	testCommon.testString(registerResult.z);
	testCommon.testString(registerResult.deviceId);
	testCommon.testString(registerResult.ioSetId);
	// X
	// Y
	testArray.testNeutral(wires.array);
}

module.exports = testCommonObjects;