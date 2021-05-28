const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const needle = require("needle");

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const apiRequestScript = require(commonPaths.requestApi);
const apiPaths = require(commonPaths.requestApiPaths);


function defineOutputObject()
{
	var defineRes = {"body": null, "statusCode": null};
	return defineRes;
}


function requestGetSuccessful(endpointURL, outputObject, reqDone)
{
	sendGet(endpointURL, function(requestErr, requestRes)
	{
		handleCallbackArguments(requestErr, requestRes);
		apiRequestScript.validateResponse(requestRes);
		
		outputObject.body = requestRes.body;
		outputObject.statusCode = requestRes.statusCode;
		
		reqDone();
	});
}


function requestPostSuccessful(endpointURL, postBody, outputObject, reqDone)
{
	sendPost(endpointURL, postBody, function(requestErr, requestRes)
	{
		handleCallbackArguments(requestErr, requestRes);
		apiRequestScript.validateResponse(requestRes);
		
		outputObject.body = requestRes.body;
		outputObject.statusCode = requestRes.statusCode;
		
		reqDone();
	});
}


function requestPutSuccessful(endpointURL, putBody, outputObject, reqDone)
{
	sendPut(endpointURL, putBody, function(requestErr, requestRes)
	{
		handleCallbackArguments(requestErr, requestRes);
		apiRequestScript.validateResponse(requestRes);
		
		outputObject.body = requestRes.body;
		outputObject.statusCode = requestRes.statusCode;
		
		reqDone();
	});
}


function requestDeleteSuccessful(endpointURL, deletePermStatus, outputObject, reqDone)
{
	sendDelete(endpointURL, deletePermStatus, function(requestErr, requestRes)
	{
		handleCallbackArguments(requestErr, requestRes);
		apiRequestScript.validateResponse(requestRes);
		
		outputObject.body = requestRes.body;
		outputObject.statusCode = requestRes.statusCode;
		
		reqDone();
	});
}


function requestGetInvalid(endpointURL, invalidMessage, reqDone)
{
	sendGet(endpointURL, function(requestErr, requestRes)
	{
		handleCallbackArguments(requestErr, requestRes);
		handleErrorMessage(requestRes, invalidMessage);
		reqDone();
	});
}


function requestPostInvalid(endpointURL, postBody, invalidMessage, reqDone)
{
	sendPost(endpointURL, postBody, function(requestErr, requestRes)
	{
		handleCallbackArguments(requestErr, requestRes);
		handleErrorMessage(requestRes, invalidMessage);
		reqDone();
		
	});
}


function requestPutInvalid(endpointURL, putBody, invalidMessage, reqDone)
{
	sendPut(endpointURL, putBody, function(requestErr, requestRes)
	{
		handleCallbackArguments(requestErr, requestRes);
		handleErrorMessage(requestRes, invalidMessage);
		reqDone();
	});
}


function requestDeleteInvalid(endpointURL, reqDone)
{
	sendDelete(endpointURL, false, function(requestErr, requestRes)
	{
		handleCallbackArguments(requestErr, requestRes);
		handleInvalidDelete(requestRes);
		reqDone();
	});
}


function requestStatusInvalid(endpointURL, statusEntry, reqDone)
{
	sendGet(endpointURL, function(requestErr, requestRes)
	{
		handleCallbackArguments(requestErr, requestRes);
		handleInvalidStatus(requestRes, statusEntry);
		reqDone();
	});
}


function requestPing(outputObject, reqDone)
{	
	needle.get(apiRequestScript.hostUrl, {timeout: 1750}, function(pingErr, pingRes)
	{
		if (pingRes !== undefined && pingRes !== null)
		{
			outputObject.body = pingRes.body;
			outputObject.statusCode = pingRes.statusCode;
		}
		
		reqDone();
	});
}


function requestFactoryReset(outputObject, reqDone)
{
	var factoryURL = apiRequestScript.writeUrl(apiPaths.adminApi, "factory-reset");
	
	needle.post(factoryURL, null, {json: true}, function(requestErr, requestRes)
	{
		outputObject["error"] = requestErr;
		outputObject["reply"] = requestRes;
	});
	
	reqDone();
}


function checkFactoryResetResult(outputObject)
{
	handleCallbackArguments(outputObject.error, outputObject.reply);
	apiRequestScript.validateResponse(outputObject.reply);
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


function handleErrorMessage(respObj, tgtMsg)
{
	var extractedMessage = apiRequestScript.readResponseError(respObj);
	expect(extractedMessage).to.equal(tgtMsg);
}


function handleInvalidStatus(respObj, sInput)
{
	var extractedObject = apiRequestScript.readResponseObject(respObj);
	
	commonFunctionsFile.testPresent(extractedObject);
	expect(extractedObject).to.be.an("object");
	
	commonFunctionsFile.testObjectPropertyDefinition(extractedObject, 'id');
	commonFunctionsFile.testObjectPropertyDefinition(extractedObject, 'isRunning');
	
	expect(extractedObject.id).to.equal(sInput);
	expect(extractedObject.isRunning).to.be.false;
}


function handleInvalidDelete(respObj)
{
	var extractedObject = apiRequestScript.readResponseObject(respObj);
	
	commonFunctionsFile.testPresent(extractedObject);
	expect(extractedObject).to.be.an("object");
	commonFunctionsFile.testObjectPropertyDefinition(extractedObject, 'success');
	expect(extractedObject.success).to.be.true;
}



module.exports =
{
	defineOutput: defineOutputObject,
	getSuccessful: requestGetSuccessful,
	postSuccessful: requestPostSuccessful,
	putSuccessful: requestPutSuccessful,
	deleteSuccessful: requestDeleteSuccessful,
	getInvalid: requestGetInvalid,
	postInvalid: requestPostInvalid,
	putInvalid: requestPutInvalid,
	deleteInvalid: requestDeleteInvalid,
	statusInvalid: requestStatusInvalid,
	ping: requestPing,
	factoryReset: requestFactoryReset,
	checkFactoryReset: checkFactoryResetResult,
	checkDeleteResult: handleInvalidDelete
};