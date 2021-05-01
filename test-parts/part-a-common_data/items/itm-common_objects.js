const chai = require("chai");
const expect = require("chai").expect;
const commonPaths = require("../../../app/paths/files/app-paths");
const commonObjectsFile = require(commonPaths.commonObjects);
const und = 'undefined';


function testCommonObjects()
{
	describe("Common Objects", function()
	{
		it("Unknown ID", function()
		{
			testString(commonObjectsFile.unknownID);
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
	
	testString(deviceObj.id);
	testString(deviceObj.deviceType);
	testString(deviceObj.maker);
	testString(deviceObj.model);
	testString(deviceObj.name);
	testString(deviceObj.desc);
	testString(deviceObj.ipAddress);
	testString(deviceObj.username);
	testString(deviceObj.password);
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
	
	testString(registerResult.id);
	testString(registerResult.type);
	testString(registerResult.z);
	testString(registerResult.deviceId);
	testString(registerResult.ioSetId);
}




function testObjectType(propObject)
{
	expect(propObject).to.not.be.undefined;
	expect(propObject).to.not.be.null;
	expect(propObject).to.be.an("object");
}

function testObjectFunction(funcName)
{
	var functionValue = commonObjectsFile[funcName];
	expect(functionValue).to.be.a("function");
}


function testString(strText)
{
	expect(strText).to.be.a("string");
	expect(strText).to.not.be.empty;
}

function testObjectProperty(tObject, propName, desiredType)
{
	var propValue = tObject[propName];
	
	expect(propValue).to.not.be.undefined;
	expect(propValue).to.not.be.null;
	expect(propValue).to.be.a(desiredType);
}


module.exports =
{
	callTestCommonObjects: testCommonObjects
};