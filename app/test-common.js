const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
chai.use(chaiThings);

function checkPlaceholder()
{
	expect(true).to.be.true;
}


function checkFunction(funVal)
{
	expect(funVal).to.exist;
	expect(funVal).to.be.a("function");
}

function checkObject(objVal)
{
	expect(objVal).to.exist;
	expect(objVal).to.be.an("object");
}

function checkBinary(numVal)
{
	expect(numVal).to.exist;
	expect(numVal).to.be.oneOf([0, 1]);
}

function checkBoolean(boolVal)
{
	expect(boolVal).to.exist;
	expect(boolVal).to.be.a("boolean");
}

function checkNumber(numVal)
{
	expect(numVal).to.exist;
	expect(numVal).to.be.a("number");
}


function checkPercent(percVal)
{
	expect(percVal).to.exist;
	expect(percVal).to.be.a("number").within(0, 100);
}


function checkString(strDef)
{
	expect(strDef).to.exist;
	expect(strDef).to.be.a('string');
	expect(strDef.length).to.be.at.least(1);
}


function checkStringOptional(strDef)
{
	expect(strDef).to.exist;
	expect(strDef).to.be.a('string');
}


function checkInvalidFunctionResult(rObject, expMsg)
{	
	expect(rObject.successful, "No error was thrown.").to.be.false;
	expect(rObject.errorText).to.equal(expMsg, "Wrong error thrown.");
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
	testFunction: checkFunction,
	testObject: checkObject,
	testBinary: checkBinary,
	testBoolean: checkBoolean,
	testNumber: checkNumber,
	testPercent: checkPercent,
	testString: checkString,
	testStringOptional: checkStringOptional,
	testInvalidResult: checkInvalidFunctionResult,
	prepareInvalidResult: prepareInvalidFunctionResult,
	cloneObject: cloneJsonObject
};