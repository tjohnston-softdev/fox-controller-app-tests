const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const needle = require("needle");

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const apiRequestScript = require(commonPaths.requestApi);


function defineOutputObject()
{
	var defineRes = {"body": null};
	return defineRes;
}


function requestGetSuccessful(endpointURL, outputObject, reqDone)
{
	sendGet(endpointURL, function(requestErr, requestRes)
	{
		handleCallbackArguments(requestErr, requestRes);
		apiRequestScript.callValidateApiResponse(requestRes);
		outputObject.body = requestRes.body;
		reqDone();
	});
}



function sendGet(httpURL, httpCallback)
{
	needle.get(httpURL, function(httpErr, httpRes)
	{
		return httpCallback(httpErr, httpRes);
	});
}


function sendPost(httpURL, reqBody, httpCallback)
{
	needle.post(httpURL, reqBody, {json: true}, function(httpErr, httpRes)
	{
		return httpCallback(httpErr, httpRes);
	});
}


function sendPut(httpURL, reqBody, httpCallback)
{
	needle.put(httpURL, reqBody, {json: true}, function(httpErr, httpRes)
	{
		return httpCallback(httpErr, httpRes);
	});
}


function sendDelete(httpURL, permHeader, httpCallback)
{
	var deleteOptions = apiRequestScript.getDeleteOptions(permHeader);
	
	needle.delete(httpURL, null, deleteOptions, function(httpErr, httpRes)
	{
		return httpCallback(httpErr, httpRes);
	});
}



function handleCallbackArguments(argError, argResp)
{
	expect(argError).to.be.null;
	commonFunctionsFile.testPresent(argResp);
	expect(argResp).to.be.an("object");
}



module.exports =
{
	defineOutput: defineOutputObject,
	getSuccessful: requestGetSuccessful
};