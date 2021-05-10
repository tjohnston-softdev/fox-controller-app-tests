const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);


function validateResponseArray(resultObj)
{	
	commonFunctionsFile.testPresent(resultObj);
	commonFunctionsFile.testArrayPopulated(resultObj);
	commonFunctionsFile.testAllElements(resultObj, 'object');
	
	commonFunctionsFile.testPropertyDefinitions(resultObj, 'value');
	commonFunctionsFile.testPropertyDefinitions(resultObj, 'text');
	commonFunctionsFile.testPropertyDefinitions(resultObj, 'name');
			
	commonFunctionsFile.testPropertyContents(resultObj, 'value', 'string');
	commonFunctionsFile.testPropertyContents(resultObj, 'text', 'string');
	commonFunctionsFile.testPropertyContents(resultObj, 'name', 'string');
}

function validateResponseObject(resultObj)
{
	commonFunctionsFile.testPresent(resultObj);
	expect(resultObj).to.be.an("object");
			
	commonFunctionsFile.testObjectPropertyDefinition(resultObj, 'exampleProperty');
	commonFunctionsFile.testObjectPropertyContent(resultObj, 'exampleProperty', 'string');
	commonFunctionsFile.testString(resultObj.exampleProperty);
	expect(resultObj.exampleProperty).to.equal("exampleValue");
}

function writeReplyErrorExample(rMessage)
{
	var htmlPre = "<html><body><h1>";
	var htmlSuf = "</h1><p>Body Text</p></body></html>";
	var htmlRes = htmlPre + rMessage + htmlSuf;
	
	return htmlRes;
}



function validateOptionsReturn(resultObj, desiredUrl, desiredMethod, desiredBody)
{
	commonFunctionsFile.testPresent(resultObj);
	expect(resultObj).to.be.an("object");
	
	commonFunctionsFile.testObjectPropertyDefinition(resultObj, 'url');
	commonFunctionsFile.testObjectPropertyDefinition(resultObj, 'method');
	commonFunctionsFile.testObjectPropertyDefinition(resultObj, 'body');
	commonFunctionsFile.testObjectPropertyDefinition(resultObj, 'json');
	
	expect(resultObj.url).to.equal(desiredUrl);
	expect(resultObj.method).to.equal(desiredMethod);
	expect(resultObj.body).to.equal(desiredBody);
	expect(resultObj.json).to.be.true;
}

function validateDeleteOptionsReturn(resultObj, desiredPermFlag)
{
	commonFunctionsFile.testObjectPropertyDefinition(resultObj, 'headers');
	commonFunctionsFile.testObjectPropertyContent(resultObj, 'headers', 'object');
	
	commonFunctionsFile.testObjectPropertyDefinition(resultObj.headers, 'Content-Type');
	commonFunctionsFile.testObjectPropertyDefinition(resultObj.headers, 'delete-permanently');
	
	commonFunctionsFile.testObjectPropertyContent(resultObj.headers, 'Content-Type', 'string');
	commonFunctionsFile.testObjectPropertyContent(resultObj.headers, 'delete-permanently', 'boolean');
	
	commonFunctionsFile.testString(resultObj.headers['Content-Type']);
	expect(resultObj.headers['delete-permanently']).to.equal(desiredPermFlag);
}


function createRequestReplyObject(rStatus, rBody)
{
	var replyRes = {};
	
	replyRes["statusCode"] = rStatus;
	replyRes["body"] = rBody;
	
	return replyRes;
}



module.exports =
{
	callValidateResponseArray: validateResponseArray,
	callValidateResponseObject: validateResponseObject,
	callWriteReplyErrorExample: writeReplyErrorExample,
	callValidateOptionsReturn: validateOptionsReturn,
	callValidateDeleteOptionsReturn: validateDeleteOptionsReturn,
	createReplyObject: createRequestReplyObject
};