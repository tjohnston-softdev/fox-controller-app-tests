const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

function checkPlaceholder()
{
	expect(true).to.be.true;
}

function checkPresent(preVal)
{
	expect(preVal).to.not.be.undefined;
	expect(preVal).to.not.be.null;
}

function checkBinary(numVal)
{
	expect(numVal).to.be.oneOf([0, 1]);
}


function checkPercent(percVal)
{
	expect(percVal).to.be.within(0, 100);
}


function checkString(strDef)
{
	expect(strDef).to.be.a('string');
	expect(strDef.length).to.be.at.least(1);
}


function checkObjectSearchValue(oDef, tgtVal)
{
	var valueArray = getJsonObjectValues(oDef);
	var valueIndex = valueArray.indexOf(tgtVal);
	
	expect(valueIndex).to.be.at.least(0);
	expect(valueIndex).to.be.below(valueArray.length);
}

function checkPropertySearchValues(aDef, pName, srcObject)
{
	var oInd = 0;
	var currentObject = null;
	var currentVal = null;
	
	while (oInd >= 0 && oInd < aDef.length && aDef !== null)
	{
		currentObject = aDef[oInd];
		currentVal = currentObject[pName];
		checkObjectSearchValue(srcObject, currentVal);
		oInd = oInd + 1;
	}
}

function checkInvalidFunctionResult(rObject, expMsg)
{	
	expect(rObject.successful).to.be.false;
	expect(rObject.errorText).to.equal(expMsg);
}


function prepareInvalidFunctionResult(executedSuccessfully, flaggedMessage)
{
	var prepRes = {};
	prepRes["successful"] = executedSuccessfully;
	prepRes["errorText"] = flaggedMessage;
	return prepRes;
}


function cloneJsonObject(originalObject)
{
	var originalDefinition = JSON.stringify(originalObject);
	var newObject = JSON.parse(originalDefinition);
	return newObject;
}

function getJsonObjectProperties(intendedObject)
{
	var res = [];
	
	for (prop in intendedObject)
	{
		res.push(prop);
	}
	
	return res;
}

function getJsonObjectValues(intendedObject)
{
	var retValue = null;
	var res = [];
	
	for (prop in intendedObject)
	{
		retValue = intendedObject[prop];
		res.push(retValue);
	}
	
	return res;
}


module.exports =
{
	testPlaceholder: checkPlaceholder,
	testPresent: checkPresent,
	testBinary: checkBinary,
	testPercent: checkPercent,
	//testArrayPopulated: checkArrayPopulated,
	//testArrayEmpty: checkArrayEmpty,
	//testArrayDynamic: checkArrayDynamic,
	testString: checkString,
	//testAllElements: checkAllElements,
	//testObjectAllPropertiesType: checkObjectAllPropertiesType,
	//testObjectMatchKV: checkObjectMatchKV,
	//testObjectMatchKVInsensitive: checkObjectMatchKVInsensitive,
	//testBothObjectsSameProperties: checkBothObjectsSameProperties,
	//testBothObjectsHaveSamePropertyValue: checkBothObjectsHaveSamePropertyValue,
	//testObjectPropertyDefinition: checkObjectPropertyDefinition,
	//testObjectPropertyContent: checkObjectPropertyContent,
	//testObjectPropertyAbsent: checkObjectPropertyAbsent,
	testObjectSearchValue: checkObjectSearchValue,
	testPropertySearchValues: checkPropertySearchValues,
	//testPropertyDefinitions: checkPropertyDefinitions,
	//testPropertyContents: checkPropertyContents,
	//testPropertyAbsentDefinitions: checkPropertyAbsentDefinitions,
	
	//testPropertyStringRequiredArray: checkPropertyStringRequiredArray,
	testInvalidFunctionResult: checkInvalidFunctionResult,
	prepareInvalidResult: prepareInvalidFunctionResult,
	cloneObject: cloneJsonObject,
	getObjectProperties: getJsonObjectProperties,
	getObjectValues: getJsonObjectValues
};