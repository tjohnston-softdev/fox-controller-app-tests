const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const arrayFunctions = require(commonPaths.testArray);
const objectFunctions = require(commonPaths.testObject);


function validateResponseBodyArray(resultObj)
{
	arrayFunctions.testPopulated(resultObj);
	loopResponseContents(resultObj);
}

function validateResponseBodyObject(resultObj)
{
	commonFunctions.testObject(resultObj);
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
	var contType = null;
	var delPerm = null;
	
	commonFunctions.testObject(resultObj);
	expect(resultObj.json).to.be.true;
	commonFunctions.testObject(resultObj.headers);
	
	contType = resultObj.headers['content_type'];
	delPerm = resultObj.headers['delete-permanently'];
	commonFunctions.testString(contType);
	expect(delPerm).to.equal(desiredPermFlag);
}


function createRequestReplyObject(rStatus, rBody)
{
	var replyRes = {};
	
	replyRes["statusCode"] = rStatus;
	replyRes["body"] = rBody;
	
	return replyRes;
}


function loopResponseContents(resArr)
{
	var loopIndex = 0;
	var currentObject = null;
	var currentText = "";
	
	for (loopIndex = 0; loopIndex < resArr.length; loopIndex = loopIndex + 1)
	{
		currentObject = resArr[loopIndex];
		currentText = null;
		
		commonFunctions.testObject(currentObject);
		currentText = currentObject["text"];
		
		commonFunctions.testString(currentObject.value);
		commonFunctions.testString(currentText);
		commonFunctions.testString(currentObject.name);
	}
}



module.exports =
{
	validateBodyArray: validateResponseBodyArray,
	validateBodyObject: validateResponseBodyObject,
	writeErrorExample: writeReplyErrorExample,
	validateDeleteOptions: validateDeleteOptionsReturn,
	createReplyObject: createRequestReplyObject
};