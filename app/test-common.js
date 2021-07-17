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
	//testObjectSearchValue: checkObjectSearchValue,
	//testPropertySearchValues: checkPropertySearchValues,
	//testPropertyDefinitions: checkPropertyDefinitions,
	//testPropertyContents: checkPropertyContents,
	//testPropertyAbsentDefinitions: checkPropertyAbsentDefinitions,
	//testPropertyStringRequiredArray: checkPropertyStringRequiredArray,
	testInvalidFunctionResult: checkInvalidFunctionResult,
	prepareInvalidResult: prepareInvalidFunctionResult,
	cloneObject: cloneJsonObject,
	//getObjectProperties: getJsonObjectProperties,
	//getObjectValues: getJsonObjectValues
};