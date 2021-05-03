const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const requestFile = require(commonPaths.requestApi);
const requestModule = require("request");

const readNullError = "Cannot read property 'body' of null";
const emptyReplyObject = createReplyObject("");
const validUrl = "http://localhost:3000/api/example";

const commonRequestFunctions = require("../sub-scripts/common-request");

function testRequest()
{
	describe("API Request", function()
	{
		checkNodeRequestExists();
		checkHostUrlString();
		checkWriteUrl();
		checkRequestResponseArray();
		checkRequestResponseObject();
		checkRequestResponseString();
		checkRequestResponseError();
		checkOnlineResult();
		checkRefuseError();
		checkRandomIp();
		checkOptionsObject();
		checkDeleteOptionsObject();
	});
}

function checkNodeRequestExists()
{
	describe("Request File", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(requestFile);
			expect(requestFile).to.be.an("object");
		});
		
	});
}


function checkHostUrlString()
{
	describe("Host URL String (hostUrl)", function()
	{
		it("Property Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'hostUrl');
		});
		
		it("Valid String", function()
		{
			commonFunctionsFile.testString(requestFile.hostUrl);
		});
		
		it("Valid URL", function()
		{
			var urlSyntax = /^http:\/\/localhost:([0-9]{4})$/i;
			var urlResult = urlSyntax.test(requestFile.hostUrl);
			expect(urlResult).to.be.true;
		});
		
	});
}



function checkWriteUrl()
{	
	describe("Request API Address (callWriteApiUrl)", function()
	{
		var folderArg = "example-folder";
		var fileArg = "example-file";
		
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'callWriteApiUrl');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'callWriteApiUrl', 'function');
		});
		
		it("Call - Valid", function()
		{
			var urlSpy = sinon.spy(requestFile, 'callWriteApiUrl');
			
			var linkRoot = requestFile.hostUrl + "/api/";
			var argumentsTogether = folderArg + '/' + fileArg;
			var urlReturn = linkRoot + argumentsTogether;
			
			requestFile.callWriteApiUrl(folderArg, fileArg);
			commonRequestFunctions.callValidateWriteUrl(urlSpy.calledOnce, urlSpy.firstCall, folderArg, fileArg, urlReturn);
			
			urlSpy.restore();
		});
		
		it("Call - Empty", function()
		{
			var emptyErrorString = "URL Write argument strings cannot be empty";
			runRequestUrlInvalid("", fileArg, emptyErrorString);
			runRequestUrlInvalid(folderArg, "", emptyErrorString);
			runRequestUrlInvalid("", "", emptyErrorString);
		});
		
		it("Call - Invalid Type", function()
		{
			var typeErrorString = "URL Write arguments must be strings";
			runRequestUrlInvalid(-1, fileArg, typeErrorString);
			runRequestUrlInvalid(folderArg, -1, typeErrorString);
			runRequestUrlInvalid(-1, -1, typeErrorString);
		});
		
		it("Call - Null", function()
		{
			var nullErrorString = "URL Write arguments missing or null";
			runRequestUrlInvalid(null, fileArg, nullErrorString);
			runRequestUrlInvalid(folderArg, null, nullErrorString);
			runRequestUrlInvalid(null, null, nullErrorString);
		});
		
	});
}

function checkRequestResponseArray()
{
	var posError = commonErrorStringsFile.writeUnexpectedTokenError("u", 0);
	var emptyBodyError = "Unexpected end of JSON input";
	
	describe("Read API Response Array (callReadApiResponseArray)", function()
	{
		
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'callReadApiResponseArray');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'callReadApiResponseArray', 'function');
		});
		
		it("Call - Valid", function()
		{
			var respString = '[{"value":"x","text":"y","name":"z"}]';
			var respArg = createReplyObject(respString);
			var respSpy = sinon.spy(requestFile, 'callReadApiResponseArray');
			
			requestFile.callReadApiResponseArray(respArg);
			commonRequestFunctions.callValidateResponseArray(respSpy.calledOnce, respSpy.firstCall, respArg);
			
			respSpy.restore();
		});
		
		it("Call - Empty Body", function()
		{
			runReadResponseInvalidArray(emptyReplyObject, emptyBodyError);
		});
		
		it("Call - Missing Body", function()
		{
			runReadResponseInvalidArray({}, posError);
		});
		
		it("Call - Null", function()
		{
			runReadResponseInvalidArray(null, readNullError);
		});
		
		it("Call - Invalid Type", function()
		{
			runReadResponseInvalidArray(-1, posError);
		});
		
	});
}

function checkRequestResponseObject()
{
	var posError = commonErrorStringsFile.writeUnexpectedTokenError("u", 0);
	var jsonString = '{"exampleProperty":"exampleValue"}';
	var jsonObject = JSON.parse(jsonString);
	
	var objectSpy = null;
	
	describe("Read API Response Object (callReadApiResponseObject)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'callReadApiResponseObject');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'callReadApiResponseObject', 'function');
			objectSpy = sinon.spy(requestFile, 'callReadApiResponseObject');
		});
		
		it("Call - Valid String", function()
		{
			var objectArg = createReplyObject(jsonString);
			requestFile.callReadApiResponseObject(objectArg);
			commonRequestFunctions.callValidateResponseObject(objectSpy.called, objectSpy.lastCall, objectArg);
		});
		
		it("Call - Valid Object", function()
		{
			var objectArg = createReplyObject(jsonObject);
			requestFile.callReadApiResponseObject(objectArg);
			commonRequestFunctions.callValidateResponseObject(objectSpy.called, objectSpy.lastCall, objectArg);
		});
		
		
		it("Call - Empty Body", function()
		{
			runReadResponseInvalidObject(emptyReplyObject, "Unexpected end of JSON input");
		});
		
		it("Call - Missing Body", function()
		{
			runReadResponseInvalidObject({}, posError);
		});
		
		it("Call - Null", function()
		{
			runReadResponseInvalidObject(null, readNullError);
		});
		
		it("Call - Invalid Type", function()
		{
			runReadResponseInvalidObject(-1, posError);
		});
		
		it("Complete", function()
		{
			objectSpy.restore();
		})
		
		
	});
}

function checkRequestResponseString()
{
	describe("Read API Response String (callReadApiResponseString)", function()
	{
		
		var emptyError = "HTTP Reply is empty";
		var stringTypeError = "Invalid Reply object type";
		
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'callReadApiResponseString');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'callReadApiResponseString', 'function');
		});
		
		it("Call - Valid", function()
		{
			var bodyString = "Example Body";
			var objectArg = createReplyObject(bodyString);
			var stringSpy = sinon.spy(requestFile, 'callReadApiResponseString');
			
			requestFile.callReadApiResponseString(objectArg);
			commonRequestFunctions.callValidateResponseString(stringSpy.calledOnce, stringSpy.firstCall, objectArg, bodyString);
			
			
			stringSpy.restore();
		});
		
		it("Call - Empty Body", function()
		{
			runReadResponseInvalidString(emptyReplyObject, emptyError);
		});
		
		it("Call - Missing Body", function()
		{
			runReadResponseInvalidString({}, emptyError);
		});
		
		it("Call - Null", function()
		{
			runReadResponseInvalidString(null, readNullError);
		});
		
		it("Call - Invalid Type", function()
		{
			runReadResponseInvalidString(-1, stringTypeError);
		});
		
		
		
	});
}


function checkRequestResponseError()
{
	describe("Read API Response Error (callReadApiResponseError)", function()
	{
		var incorrectErrorFormat = "Could not extract error message. HTTP reply body uses incorrect format";
		
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'callReadApiResponseError');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'callReadApiResponseError', 'function');
		});
		
		it("Call - Valid", function()
		{
			var validErrorString = "Example Message";
			var validReplyString = commonRequestFunctions.callWriteReplyErrorExample(validErrorString);
			var objectArg = createReplyObject(validReplyString);
			var errorSpy = sinon.spy(requestFile, 'callReadApiResponseError');
			
			requestFile.callReadApiResponseError(objectArg);
			commonRequestFunctions.callValidateResponseString(errorSpy.calledOnce, errorSpy.firstCall, objectArg, validErrorString);
			
			errorSpy.restore();
		});
		
		it("Call - Empty Message", function()
		{
			var emptyMessageArg = createReplyObject("<h1></h1>");
			runReadResponseInvalidError(emptyMessageArg, "HTTP Error Message is empty");
		});
		
		it("Call - Mismatch", function()
		{
			var mismatchArg = createReplyObject("<html><body></h1>Example<h1></body></html>");
			runReadResponseInvalidError(mismatchArg, incorrectErrorFormat);
		});
		
		it("Call - Invalid Format", function()
		{
			var formatArg = createReplyObject("<b>Example</b>");
			runReadResponseInvalidError(formatArg, incorrectErrorFormat);
		});
		
		
	});
}



function checkOnlineResult()
{
	describe("Check Online Result (getApplicationOnlineResult)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'getApplicationOnlineResult');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'getApplicationOnlineResult', 'function');
		});
		
		it("Call - Online", function()
		{
			var onlineArg = {"statusCode":200};
			var onlineSpy = sinon.spy(requestFile, 'getApplicationOnlineResult');
			
			requestFile.getApplicationOnlineResult(onlineArg);
			
			commonRequestFunctions.callValidateOnlineResult(onlineSpy.calledOnce, onlineSpy.firstCall, onlineArg);
			
			onlineSpy.restore();
		});
		
		it("Call - Offline", function()
		{
			runOfflineResult(null);
		});
		
		it("Call - Missing Status Code", function()
		{
			runOfflineResult({});
		});
		
		it("Call - Invalid Type", function()
		{
			runOfflineResult(-1);
		});
		
		
	});
}

function checkRefuseError()
{
	describe("Request Refused Error (showApiRequestRefusedError)", function()
	{
		it("Error Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'showApiRequestRefusedError');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'showApiRequestRefusedError', 'function');
		});
		
		it("Error Flagged Successfully", function()
		{
			runRefuseError("Test");
		});
		
	});
}


function checkRandomIp()
{
	describe("Generate Random IP (generateIpAddress)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'generateIpAddress');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'generateIpAddress', 'function');
		});
		
		it("Function Works", function()
		{
			var randomSpy = sinon.spy(requestFile, 'generateIpAddress');
			
			requestFile.generateIpAddress();
			commonRequestFunctions.callValidateRandomIp(randomSpy.calledOnce, randomSpy.firstCall);
			
			randomSpy.restore();
		});
		
	});
}


function checkOptionsObject()
{
	describe("Get Request Options Object (getRequestOptions)", function()
	{
		var oValidMethod = 'POST';
		var oValidBody = {"objectFlag": true};
		
		var urlFormatError = "Invalid URL format. Must refer to localhost:3000";
		var urlTypeError = "URL must be a non-empty string";
		var urlMissingError = "URL argument missing or null";
		var methodError = "Invalid request method. Must be GET, POST, PUT, or DELETE";
		
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'getRequestOptions');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'getRequestOptions', 'function');
		});
		
		it("Call - Valid", function()
		{
			var optionSpy = sinon.spy(requestFile, 'getRequestOptions');
			
			requestFile.getRequestOptions(validUrl, oValidMethod, oValidBody);
			
			commonRequestFunctions.callValidateOptionsBase(optionSpy.calledOnce, optionSpy.firstCall);
			commonRequestFunctions.callValidateOptionsArguments(optionSpy.firstCall, validUrl, oValidMethod, oValidBody);
			commonRequestFunctions.callValidateOptionsReturn(optionSpy.firstCall, validUrl, oValidMethod, oValidBody);
			
			optionSpy.restore();
		});
		
		it("Call - Invalid URL", function()
		{
			runOptionError("http://localhost:2000", oValidMethod, oValidBody, urlFormatError);
		});
		
		it("Call - Missing URL", function()
		{
			runOptionError("", oValidMethod, oValidBody, urlTypeError);
		});
		
		
		it("Call - Invalid Method", function()
		{
			runOptionError(validUrl, 'INVALID', oValidBody, methodError);
		});
		
		it("Call - Invalid Type", function()
		{
			runOptionError(-1, oValidMethod, oValidBody, urlTypeError);
			runOptionError(validUrl, -1, oValidBody, methodError);
		});
		
		it("Call - Null", function()
		{
			runOptionError(null, oValidMethod, oValidBody, urlMissingError);
			runOptionError(validUrl, null, oValidBody, methodError);
		});
		
	});
}


function checkDeleteOptionsObject()
{
	describe("Get Delete Request Options Object (getDeleteOptions)", function()
	{
		var deleteFlagError = "";
		var deleteOptionsSpy = null;
		
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'getDeleteOptions');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'getDeleteOptions', 'function');
			deleteOptionsSpy = sinon.spy(requestFile, 'getDeleteOptions');
		});
		
		it("Call - True", function()
		{
			requestFile.getDeleteOptions(validUrl, true);
			runDeleteResults(deleteOptionsSpy.calledOnce, deleteOptionsSpy.firstCall, true);
		});
		
		it("Call - False", function()
		{
			requestFile.getDeleteOptions(validUrl, false);
			runDeleteResults(deleteOptionsSpy.calledTwice, deleteOptionsSpy.secondCall, false);
		});
		
		it("Complete", function()
		{
			deleteOptionsSpy.restore();
		});
		
		
		
	});
}

function runDeleteResults(dCalled, dCallObject, dFlagArgument)
{
	commonRequestFunctions.callValidateOptionsBase(dCalled, dCallObject);
	commonRequestFunctions.callValidateDeleteOptionsArguments(dCallObject, validUrl, dFlagArgument);
	
	commonRequestFunctions.callValidateOptionsReturn(dCallObject, validUrl, 'DELETE', null);
	commonRequestFunctions.callValidateDeleteOptionsReturn(dCallObject, dFlagArgument);
}





function runRequestUrlInvalid(foArg, fiArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.callWriteApiUrl(foArg, fiArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var iRes = [comp, msg];
	commonFunctionsFile.testInvalidFunctionResult(iRes, eError);
}

function runReadResponseInvalidArray(iArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.callReadApiResponseArray(iArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var iRes = [comp, msg];
	commonFunctionsFile.testInvalidFunctionResult(iRes, eError);
}

function runReadResponseInvalidObject(iArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.callReadApiResponseObject(iArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var iRes = [comp, msg];
	commonFunctionsFile.testInvalidFunctionResult(iRes, eError);
}

function runReadResponseInvalidString(iArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.callReadApiResponseString(iArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var iRes = [comp, msg];
	commonFunctionsFile.testInvalidFunctionResult(iRes, eError);
}


function runReadResponseInvalidError(iArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.callReadApiResponseError(iArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var iRes = [comp, msg];
	commonFunctionsFile.testInvalidFunctionResult(iRes, eError);
}


function runOfflineResult(offArg)
{
	var offResult = requestFile.getApplicationOnlineResult(offArg);
	commonFunctionsFile.testPresent(offResult);
	expect(offResult).to.be.false;
}

function runRefuseError(reArg)
{
	var supposedText = "API request failed. - " + reArg;
	var rCompleted = false;
	var rMessage = "";
	
	try
	{
		requestFile.showApiRequestRefusedError(reArg);
		rCompleted = true;
	}
	catch(e)
	{
		rCompleted = false;
		rMessage = e.message;
	}
	
	var reResult = [rCompleted, rMessage];
	commonFunctionsFile.testInvalidFunctionResult(reResult, supposedText);
}


function runOptionError(oeUrl, oeMethod, oeBody, oeText)
{
	var oComplete = false;
	var oMessage = "";
	
	try
	{
		requestFile.getRequestOptions(oeUrl, oeMethod, oeBody);
	}
	catch(e)
	{
		oComplete = false;
		oMessage = e.message;
	}
	
	var oResult = [oComplete, oMessage];
	commonFunctionsFile.testInvalidFunctionResult(oResult, oeText);
	
}


function createReplyObject(bContent)
{
	var r = {"body":bContent};
	return r;
}

module.exports =
{
	callTestRequest: testRequest
};
