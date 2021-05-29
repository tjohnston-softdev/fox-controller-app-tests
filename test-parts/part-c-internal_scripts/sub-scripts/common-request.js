const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);


function validateResponseBodyArray(resultObj)
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

function validateResponseBodyObject(resultObj)
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


function validateDeleteOptionsReturn(resultObj, desiredPermFlag)
{
	commonFunctionsFile.testPresent(resultObj);
	expect(resultObj).to.be.an("object");
	
	commonFunctionsFile.testObjectPropertyDefinition(resultObj, 'json');
	expect(resultObj.json).to.be.true;
	
	commonFunctionsFile.testObjectPropertyDefinition(resultObj, 'headers');
	commonFunctionsFile.testObjectPropertyContent(resultObj, 'headers', 'object');
	
	commonFunctionsFile.testObjectPropertyDefinition(resultObj.headers, 'content_type');
	commonFunctionsFile.testObjectPropertyDefinition(resultObj.headers, 'delete-permanently');
	
	commonFunctionsFile.testObjectPropertyContent(resultObj.headers, 'content_type', 'string');
	commonFunctionsFile.testObjectPropertyContent(resultObj.headers, 'delete-permanently', 'boolean');
	
	commonFunctionsFile.testString(resultObj.headers['content_type']);
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
	validateBodyArray: validateResponseBodyArray,
	validateBodyObject: validateResponseBodyObject,
	writeErrorExample: writeReplyErrorExample,
	validateDeleteOptions: validateDeleteOptionsReturn,
	createReplyObject: createRequestReplyObject
};