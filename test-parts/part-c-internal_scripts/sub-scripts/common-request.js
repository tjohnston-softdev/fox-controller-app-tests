const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const validModule = require("validator");



function validateWriteUrl(writeCalled, writeObject, writeFolder, writeFile, writtenReturn)
{
	expect(writeCalled).to.be.true;
	commonFunctionsFile.testPresent(writeObject);
	
	expect(writeObject.args).to.deep.equal([writeFolder, writeFile]);
	expect(writeObject.exception).to.be.undefined;
	
	commonFunctionsFile.testPresent(writeObject.returnValue);
	commonFunctionsFile.testString(writeObject.returnValue);
	expect(writeObject.returnValue).to.equal(writtenReturn);
}

function validateResponseArray(arrayCalled, callObject, callArg)
{
	expect(arrayCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	expect(callObject.args).to.deep.equal([callArg]);
	expect(callObject.exception).to.be.undefined;
	
	commonFunctionsFile.testPresent(callObject.returnValue);
	commonFunctionsFile.testArray(callObject.returnValue);
	commonFunctionsFile.testAllElements(callObject.returnValue, 'object');
	
	commonFunctionsFile.testPropertyDefinitions(callObject.returnValue, 'value');
	commonFunctionsFile.testPropertyDefinitions(callObject.returnValue, 'text');
	commonFunctionsFile.testPropertyDefinitions(callObject.returnValue, 'name');
			
	commonFunctionsFile.testPropertyContents(callObject.returnValue, 'value', 'string');
	commonFunctionsFile.testPropertyContents(callObject.returnValue, 'text', 'string');
	commonFunctionsFile.testPropertyContents(callObject.returnValue, 'name', 'string');
}

function validateResponseObject(objectCalled, callObject, callArg)
{
	expect(objectCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
			
	expect(callObject.args).to.deep.equal([callArg]);
	expect(callObject.exception).to.be.undefined;
			
	commonFunctionsFile.testPresent(callObject.returnValue);
	commonFunctionsFile.testType(callObject.returnValue, 'object');
			
	commonFunctionsFile.testObjectPropertyDefinition(callObject.returnValue, 'exampleProperty');
	commonFunctionsFile.testObjectPropertyContent(callObject.returnValue, 'exampleProperty', 'string');
	commonFunctionsFile.testString(callObject.returnValue.exampleProperty);
	expect(callObject.returnValue.exampleProperty).to.equal("exampleValue");
}

function validateResponseString(stringCalled, callObject, callArg, expectedResult)
{
	expect(stringCalled).to.be.true;
	commonFunctionsFile.testPresent(callObject);
	
	expect(callObject.args).to.deep.equal([callArg]);
	expect(callObject.exception).to.be.undefined;
	
	commonFunctionsFile.testPresent(callObject.returnValue);
	commonFunctionsFile.testString(callObject.returnValue);
	expect(callObject.returnValue).to.equal(expectedResult);
}

function writeReplyErrorExample(rMessage)
{
	var htmlPre = "<html><body><h1>";
	var htmlSuf = "</h1><p>Body Text</p></body></html>";
	var htmlRes = htmlPre + rMessage + htmlSuf;
	
	return htmlRes;
}


function validateOnlineResult(oCalledFlag, oCallObject, oArg)
{
	expect(oCalledFlag).to.be.true;
	commonFunctionsFile.testPresent(oCallObject);
	
	expect(oCallObject.args).to.deep.equal([oArg]);
	expect(oCallObject.exception).to.be.undefined;
	
	commonFunctionsFile.testPresent(oCallObject.returnValue);
	expect(oCallObject.returnValue).to.be.true;
}

function validateRandomIp(ipCalled, ipCallObject)
{
	var returnValid = null;
	
	expect(ipCalled).to.be.true;
	commonFunctionsFile.testPresent(ipCallObject);
	expect(ipCallObject.exception).to.be.undefined;
	
	commonFunctionsFile.testPresent(ipCallObject.returnValue);
	commonFunctionsFile.testString(ipCallObject.returnValue);
	
	returnValid = validModule.isIP(ipCallObject.returnValue);
	expect(returnValid).to.be.true;
}


function validateOptionsBase(optCalledFlag, optCallObject)
{
	expect(optCalledFlag).to.be.true;
	commonFunctionsFile.testPresent(optCallObject);
	
	commonFunctionsFile.testPresent(optCallObject.args);
	commonFunctionsFile.testArray(optCallObject.args);
	
	expect(optCallObject.exception).to.be.undefined;
}

function validateOptionsArguments(optCallObject, aUrl, aMethod, aBody)
{
	expect(optCallObject.args).to.deep.equal([aUrl, aMethod, aBody]);
}

function validateDeleteOptionsArguments(optCallObject, aUrl, aFlag)
{
	expect(optCallObject.args).to.deep.equal([aUrl, aFlag]);
}

function validateOptionsReturn(optCallObject, desiredUrl, desiredMethod, desiredBody)
{
	commonFunctionsFile.testPresent(optCallObject.returnValue);
	commonFunctionsFile.testType(optCallObject.returnValue, 'object');
	
	commonFunctionsFile.testObjectPropertyDefinition(optCallObject.returnValue, 'url');
	commonFunctionsFile.testObjectPropertyDefinition(optCallObject.returnValue, 'method');
	commonFunctionsFile.testObjectPropertyDefinition(optCallObject.returnValue, 'body');
	commonFunctionsFile.testObjectPropertyDefinition(optCallObject.returnValue, 'json');
	
	expect(optCallObject.returnValue.url).to.equal(desiredUrl);
	expect(optCallObject.returnValue.method).to.equal(desiredMethod);
	expect(optCallObject.returnValue.body).to.equal(desiredBody);
	
	commonFunctionsFile.testObjectPropertyContent(optCallObject.returnValue, 'json', 'boolean');
	expect(optCallObject.returnValue.json).to.be.true;
}

function validateDeleteOptionsReturn(optCallObject, desiredPermFlag)
{
	commonFunctionsFile.testObjectPropertyDefinition(optCallObject.returnValue, 'headers');
	commonFunctionsFile.testObjectPropertyContent(optCallObject.returnValue, 'headers', 'object');
	
	commonFunctionsFile.testObjectPropertyDefinition(optCallObject.returnValue.headers, 'Content-Type');
	commonFunctionsFile.testObjectPropertyDefinition(optCallObject.returnValue.headers, 'delete-permanently');
	
	commonFunctionsFile.testObjectPropertyContent(optCallObject.returnValue.headers, 'Content-Type', 'string');
	commonFunctionsFile.testObjectPropertyContent(optCallObject.returnValue.headers, 'delete-permanently', 'boolean');
	
	commonFunctionsFile.testString(optCallObject.returnValue.headers['Content-Type']);
	expect(optCallObject.returnValue.headers['delete-permanently']).to.equal(desiredPermFlag);
}





exports.callValidateWriteUrl = validateWriteUrl;
exports.callValidateResponseArray = validateResponseArray;
exports.callValidateResponseObject = validateResponseObject;
exports.callValidateResponseString = validateResponseString;
exports.callWriteReplyErrorExample = writeReplyErrorExample;
exports.callValidateOnlineResult = validateOnlineResult;
exports.callValidateRandomIp = validateRandomIp;
exports.callValidateOptionsBase = validateOptionsBase;
exports.callValidateOptionsArguments = validateOptionsArguments;
exports.callValidateDeleteOptionsArguments = validateDeleteOptionsArguments;
exports.callValidateOptionsReturn = validateOptionsReturn;
exports.callValidateDeleteOptionsReturn = validateDeleteOptionsReturn;