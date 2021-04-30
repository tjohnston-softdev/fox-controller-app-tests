const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);


function validateSpyObject(sCalledFlag, sCallObject, aString, aEmpty)
{
	expect(sCalledFlag).to.be.true;
	commonFunctionsFile.testPresent(sCallObject);
	
	commonFunctionsFile.testPresent(sCallObject.args);
	commonFunctionsFile.testArray(sCallObject.args);
	expect(sCallObject.args).to.deep.equal([aString, aEmpty]);
	
	expect(sCallObject.exception).to.be.undefined;
	
	commonFunctionsFile.testPresent(sCallObject.returnValue);
	commonFunctionsFile.testType(sCallObject.returnValue, 'boolean');
}

function validateFullPathSpyObject(sCalledFlag, sCallObject, aString, aAbsolute, aFile, aEmpty)
{
	expect(sCalledFlag).to.be.true;
	commonFunctionsFile.testPresent(sCallObject);
	
	commonFunctionsFile.testPresent(sCallObject.args);
	commonFunctionsFile.testArray(sCallObject.args);
	expect(sCallObject.args).to.deep.equal([aString, aAbsolute, aFile, aEmpty]);
	
	expect(sCallObject.exception).to.be.undefined;
	
	commonFunctionsFile.testPresent(sCallObject.returnValue);
	commonFunctionsFile.testType(sCallObject.returnValue, 'boolean');
	
}

function validateExampleSpy(sCallFlag, sCallObject, aString, aSynt, aEmpty)
{
	expect(sCallFlag).to.be.true;
	commonFunctionsFile.testPresent(sCallObject);
	
	commonFunctionsFile.testPresent(sCallObject.args);
	commonFunctionsFile.testArray(sCallObject.args);
	expect(sCallObject.args).to.deep.equal([aString, aSynt, aEmpty]);
}

function validateExampleResult(eRes, eTarget)
{
	commonFunctionsFile.testPresent(eRes);
	commonFunctionsFile.testType(eRes, 'boolean');
	
	if (eTarget === true)
	{
		expect(eRes).to.be.true;
	}
	else
	{
		expect(eRes).to.be.false;
	}
}

exports.callValidateSpyObject = validateSpyObject;
exports.callValidateFullPathSpyObject = validateFullPathSpyObject;
exports.callValidateExampleSpy = validateExampleSpy;
exports.callValidateExampleResult = validateExampleResult;