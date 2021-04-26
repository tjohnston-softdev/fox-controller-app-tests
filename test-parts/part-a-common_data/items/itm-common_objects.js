const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonObjectContentFile = getCommonObjectFile();
const und = 'undefined';

function testCommonObjects()
{
	describe("Common Objects", function()
	{
		verifyObjectFileExists();
		verifyObjectPropertiesValid();
	});
}

function verifyObjectFileExists()
{
	it("File Exists (common-objects)", function()
	{
		expect(commonObjectContentFile).to.not.be.undefined;
		expect(commonObjectContentFile).to.not.be.null;
		expect(commonObjectContentFile).to.be.an('object');
	});
}



function verifyObjectPropertiesValid()
{
	it("Objects Valid", function()
	{
		handleString('unknownID');
		handleDeviceObject('testDevice');
		handleDeviceObject('crudDevice');
		handleDeviceObject('modifiedDevice');
		handleDeviceObject('nodeDevice');
		handleRegisterNodeObject();
	});
}

function handleString(hStringName)
{
	var hStringValue = retrievePropertyObject(hStringName);
	testString(hStringName, hStringValue);
}



function handleDeviceObject(dName)
{
	var deviceObj = retrievePropertyObject(dName);
	
	testObjectType(dName, deviceObj);
	
	testObjectProperty(dName, deviceObj, 'id', 'string');
	testObjectProperty(dName, deviceObj, 'deviceType', 'string');
	testObjectProperty(dName, deviceObj, 'maker', 'string');
	testObjectProperty(dName, deviceObj, 'model', 'string');
	testObjectProperty(dName, deviceObj, 'name', 'string');
	testObjectProperty(dName, deviceObj, 'desc', 'string');
	testObjectProperty(dName, deviceObj, 'ipAddress', 'string');
	testObjectProperty(dName, deviceObj, 'username', 'string');
	testObjectProperty(dName, deviceObj, 'password', 'string');
	testObjectProperty(dName, deviceObj, 'isEnabled', 'boolean');
	
	testObjectStringValue(deviceObj, 'id');
	testObjectStringValue(deviceObj, 'deviceType');
	testObjectStringValue(deviceObj, 'maker');
	testObjectStringValue(deviceObj, 'model');
	testObjectStringValue(deviceObj, 'name');
	testObjectStringValue(deviceObj, 'desc');
	testObjectStringValue(deviceObj, 'ipAddress');
	testObjectStringValue(deviceObj, 'username');
	testObjectStringValue(deviceObj, 'password');
}

function handleRegisterNodeObject()
{
	var getRegisterName = 'nodeConfigObject';
	var getRegisterReturn = null;
	
	testObjectFunction('getRegisterNode');
	getRegisterReturn = executeRegisterNodeObject("Example Device", "Example Node", "RO-0");
	
	testObjectType(getRegisterName, getRegisterReturn);
	
	testObjectProperty(getRegisterName, getRegisterReturn, 'id', 'string');
	testObjectProperty(getRegisterName, getRegisterReturn, 'type', 'string');
	testObjectProperty(getRegisterName, getRegisterReturn, 'z', 'string');
	testObjectProperty(getRegisterName, getRegisterReturn, 'name', 'string');
	testObjectProperty(getRegisterName, getRegisterReturn, 'deviceId', 'string');
	testObjectProperty(getRegisterName, getRegisterReturn, 'ioSetId', 'string');
	testObjectProperty(getRegisterName, getRegisterReturn, 'x', 'number');
	testObjectProperty(getRegisterName, getRegisterReturn, 'y', 'number');
	testObjectProperty(getRegisterName, getRegisterReturn, 'wires', 'array');
	
	testObjectStringValue(getRegisterReturn, 'id');
	testObjectStringValue(getRegisterReturn, 'type');
	testObjectStringValue(getRegisterReturn, 'z');
	testObjectStringValue(getRegisterReturn, 'deviceId');
	testObjectStringValue(getRegisterReturn, 'ioSetId');
}




function testObjectType(propName, propObject)
{
	var propType = typeof propObject;
	var propQuote = quoteName(propName);
	var propSuccess = false;
	
	if (propObject !== null && propType !== und && propType === 'object')
	{
		propSuccess = true;
	}
	else if (propObject !== null && propType !== und)
	{
		propSuccess = false;
		throw new Error(propQuote + " is not an object.");
	}
	else
	{
		propSuccess = false;
		throw new Error(propQuote + " does not exist.");
	}
	
	expect(propSuccess).to.be.true;
}

function testObjectFunction(fName)
{
	var fType = typeof commonObjectContentFile[fName];
	var fQuote = quoteName(fName);
	var fSuccess = false;
	
	if (commonObjectContentFile[fName] !== null && fType !== und && fType === 'function')
	{
		fSuccess = true;
	}
	else if (commonObjectContentFile[fName] !== null && fType !== und)
	{
		fSuccess = false;
		throw new Error(fQuote + " is not a function.");
	}
	else
	{
		fSuccess = false;
		throw new Error(fQuote + " does not exist.");
	}
	
	expect(fSuccess).to.be.true;
}

function testString(strName, strText)
{
	var propType = typeof strText;
	var propQuote = quoteName(strName);
	var stringSuccess = false;
	
	if (strText !== null && propType !== und && propType === 'string' && strText.length >= 1)
	{
		stringSuccess = true;
	}
	else if (strText !== null && propType !== und && propType === 'string')
	{
		stringSuccess = false;
		throw new Error(propQuote + " cannot be empty.");
	}
	else if (strText !== null && propType !== und)
	{
		stringSuccess = false;
		throw new Error(propQuote + " is not a string.");
	}
	else
	{
		stringSuccess = false;
		throw new Error(propQuote + " does not exist.");
	}
	
	expect(stringSuccess).to.be.true;
}

function testObjectProperty(tName, tObject, propName, desiredType)
{
	var propType = typeof tObject[propName];
	var propArray = Array.isArray(tObject[propName]);
	var propSuccess = false;
	
	var objQuote = quoteName(tName);
	var propQuote = quoteName(propName);
	var combinedQuote = quoteProperty(tName, propName);
	
	if (tObject[propName] !== null && propType !== und && propType === 'object' && propArray === true)
	{
		propSuccess = true;
	}
	else if (tObject[propName] !== null && propType !== und && propType === desiredType)
	{
		propSuccess = true;
	}
	else if (tObject[propName] !== null && propType !== und)
	{
		propSuccess = false;
		throw new Error(combinedQuote + " is not a "+ desiredType);
	}
	else
	{
		propSuccess = false;
		throw new Error(objQuote + " does not have the property " + propQuote);
	}
	
	expect(propSuccess).to.be.true;
}

function testObjectStringValue(targetObject, stringPropertyName)
{
	testString(stringPropertyName, targetObject[stringPropertyName]);
}


function retrievePropertyObject(propObjectName)
{
	var vResult = null;
	
	try
	{
		vResult = commonObjectContentFile[propObjectName];
	}
	catch(e)
	{
		vResult = null;
	}
	
	return vResult;
}

function executeRegisterNodeObject(di, ni, ioSet)
{
	var res = null;
	
	try
	{
		res = commonObjectContentFile.getRegisterNode(di, ni, ioSet);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}




function quoteName(n)
{
	var quoted = "'" + n + "'";
	return quoted;
}

function quoteProperty(o, p)
{
	var combined = o + "." + p;
	var cRes = quoteName(combined);
	return cRes;
}


function getCommonObjectFile()
{
	var res = null;
	
	try
	{
		res = require(commonPaths.commonObjectFile);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestCommonObjects = testCommonObjects;