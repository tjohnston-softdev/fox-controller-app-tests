const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);


function validateSpyObject(sCalledFlag, sCallObject, aString, aEmpty)
{
	commonFunctionsFile.testTrue(sCalledFlag);
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
	commonFunctionsFile.testTrue(sCalledFlag);
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
	commonFunctionsFile.testTrue(sCallFlag);
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
		commonFunctionsFile.testTrue(eRes);
	}
	else
	{
		commonFunctionsFile.testFalse(eRes);
	}
}

exports.callValidateSpyObject = validateSpyObject;
exports.callValidateFullPathSpyObject = validateFullPathSpyObject;
exports.callValidateExampleSpy = validateExampleSpy;
exports.callValidateExampleResult = validateExampleResult;