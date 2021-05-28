const chai = require("chai");
const expect = require("chai").expect;
const commonPaths = require("../../../app/paths/files/app-paths");
const commonObjectsFile = require(commonPaths.commonObjects);
const testCommon = require(commonPaths.testCommon);


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
	
	testObjectType(deviceObj);
	
	testObjectProperty(deviceObj, 'id', 'string');
	testObjectProperty(deviceObj, 'deviceType', 'string');
	testObjectProperty(deviceObj, 'maker', 'string');
	testObjectProperty(deviceObj, 'model', 'string');
	testObjectProperty(deviceObj, 'name', 'string');
	testObjectProperty(deviceObj, 'desc', 'string');
	testObjectProperty(deviceObj, 'ipAddress', 'string');
	testObjectProperty(deviceObj, 'username', 'string');
	testObjectProperty(deviceObj, 'password', 'string');
	testObjectProperty(deviceObj, 'isEnabled', 'boolean');
	
	testCommon.testString(deviceObj.id);
	testCommon.testString(deviceObj.deviceType);
	testCommon.testString(deviceObj.maker);
	testCommon.testString(deviceObj.model);
	testCommon.testString(deviceObj.name);
	testCommon.testString(deviceObj.desc);
	testCommon.testString(deviceObj.ipAddress);
	testCommon.testString(deviceObj.username);
	testCommon.testString(deviceObj.password);
}

function handleRegisterNodeObject()
{
	var getRegisterName = 'nodeConfigObject';
	var registerResult = null;
	
	testObjectFunction('getRegisterNode');
	registerResult = commonObjectsFile.getRegisterNode("Example Device", "Example Node", "RO-0");
	
	testObjectType(registerResult);
	
	testObjectProperty(registerResult, 'id', 'string');
	testObjectProperty(registerResult, 'type', 'string');
	testObjectProperty(registerResult, 'z', 'string');
	testObjectProperty(registerResult, 'name', 'string');
	testObjectProperty(registerResult, 'deviceId', 'string');
	testObjectProperty(registerResult, 'ioSetId', 'string');
	testObjectProperty(registerResult, 'x', 'number');
	testObjectProperty(registerResult, 'y', 'number');
	testObjectProperty(registerResult, 'wires', 'array');
	
	testCommon.testString(registerResult.id);
	testCommon.testString(registerResult.type);
	testCommon.testString(registerResult.z);
	testCommon.testString(registerResult.deviceId);
	testCommon.testString(registerResult.ioSetId);
}




function testObjectType(propObject)
{
	testCommon.testPresent(propObject);
	expect(propObject).to.be.an("object");
}

function testObjectFunction(funcName)
{
	var functionValue = commonObjectsFile[funcName];
	expect(functionValue).to.be.a("function");
}

function testObjectProperty(tObject, propName, desiredType)
{	
	testCommon.testObjectPropertyDefinition(tObject, propName);
	testCommon.testObjectPropertyContent(tObject, propName, desiredType);
}

module.exports = testCommonObjects;