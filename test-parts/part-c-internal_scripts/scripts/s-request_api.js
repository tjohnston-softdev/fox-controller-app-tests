const chai = require("chai");
const expect = require("chai").expect;
const validator = require("validator");

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const requestFile = require(commonPaths.requestApi);
const commonRequestFunctions = require("../sub-scripts/common-request");

const readNullError = "Cannot read property 'body' of null";
const emptyReplyObject = commonRequestFunctions.createReplyObject(200, "");
const validUrl = "http://localhost:3000/api/example";

function testRequest()
{
	describe("API Request", function()
	{
		checkHostUrlString();
		checkWriteUrl();
		checkRequestResponseArray();
		checkRequestResponseObject();
		checkRequestResponseError();
		checkRequestResponseValidation();
		checkOnlineResult();
		checkRefuseError();
		checkRandomIp();
		checkDeleteOptionsObject();
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
			var linkRoot = requestFile.hostUrl + "/api/";
			var linkPath = folderArg + '/' + fileArg;
			var inputURL = linkRoot + linkPath;
			
			var actualURL = requestFile.callWriteApiUrl(folderArg, fileArg);
			expect(actualURL).to.equal(inputURL);
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
			var inputResp = commonRequestFunctions.createReplyObject(200, respString);
			var actualResp = requestFile.callReadApiResponseArray(inputResp);
			
			commonRequestFunctions.callValidateResponseArray(actualResp);
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
	
	describe("Read API Response Object (callReadApiResponseObject)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'callReadApiResponseObject');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'callReadApiResponseObject', 'function');
		});
		
		it("Call - Valid String", function()
		{
			var inputResp = commonRequestFunctions.createReplyObject(200, jsonString);
			var actualResp = requestFile.callReadApiResponseObject(inputResp);
			commonRequestFunctions.callValidateResponseObject(actualResp);
		});
		
		it("Call - Valid Object", function()
		{
			var inputResp = commonRequestFunctions.createReplyObject(200, jsonObject);
			var actualResp = requestFile.callReadApiResponseObject(inputResp);
			commonRequestFunctions.callValidateResponseObject(actualResp);
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
			var inputReply = commonRequestFunctions.createReplyObject(500, validReplyString);
			var actualError = requestFile.callReadApiResponseError(inputReply);
			
			commonFunctionsFile.testString(actualError);
			expect(actualError).to.equal(validErrorString);
		});
		
		it("Call - Empty Message", function()
		{
			var emptyMsg = commonRequestFunctions.createReplyObject(500, "<h1></h1>");
			runReadResponseInvalidError(emptyMsg, "HTTP Error Message is empty");
		});
		
		it("Call - Mismatch", function()
		{
			var invalidHTML = commonRequestFunctions.createReplyObject(500, "<html><body></h1>Example<h1></body></html>");
			runReadResponseInvalidError(invalidHTML, incorrectErrorFormat);
		});
		
		it("Call - Invalid Format", function()
		{
			var formatHTML = commonRequestFunctions.createReplyObject(500, "<b>Example</b>");
			runReadResponseInvalidError(formatHTML, incorrectErrorFormat);
		});
		
		
	});
}


function checkRequestResponseValidation()
{
	describe("Validate API Response (callValidateApiResponse)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'callValidateApiResponse');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'callValidateApiResponse', 'function');
		});
		
		it("Call - Valid", function()
		{
			var validResponseObject = commonRequestFunctions.createReplyObject(200, "Successful");
			var validResult = requestFile.callValidateApiResponse(validResponseObject);
			expect(validResult).to.be.true;
		});
		
		it("Call - Invalid", function()
		{
			var errString = "Failure";
			var errHTML = commonRequestFunctions.callWriteReplyErrorExample(errString);
			var invalidResponseObject = commonRequestFunctions.createReplyObject(500, errHTML);
			
			runValidateResponseInvalid(invalidResponseObject, errString);
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
			var inputReply = {"statusCode":200};
			var onlineRes = requestFile.getApplicationOnlineResult(inputReply);
			expect(onlineRes).to.be.true;
		});
		
		it("Call - Offline", function()
		{
			var offlineRes = requestFile.getApplicationOnlineResult(null);
			expect(offlineRes).to.be.false;
		});
		
		it("Call - Missing Status Code", function()
		{
			var emptyObj = {};
			var statusRes = requestFile.getApplicationOnlineResult(emptyObj);
			expect(statusRes).to.be.false;
		});
		
		it("Call - Invalid Type", function()
		{
			var invalidTypeRes = requestFile.getApplicationOnlineResult(-1);
			expect(invalidTypeRes).to.be.false;
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
		
		it("Generation Successful", function()
		{
			var randIP = requestFile.generateIpAddress();
			var ipValid = false;
			commonFunctionsFile.testString(randIP);
			ipValid = validator.isIP(randIP, 4);
			expect(ipValid).to.be.true;
		});
		
	});
}


function checkDeleteOptionsObject()
{
	describe("Get Delete Request Options Object (getDeleteOptions)", function()
	{	
		var trueRes = null;
		var falseRes = null;
		
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'getDeleteOptions');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'getDeleteOptions', 'function');
		});
		
		it("Call - True", function()
		{
			trueRes = requestFile.getDeleteOptions(true);
			commonRequestFunctions.callValidateDeleteOptionsReturn(trueRes, true);
		});
		
		it("Call - False", function()
		{
			falseRes = requestFile.getDeleteOptions(false);
			commonRequestFunctions.callValidateDeleteOptionsReturn(falseRes, false);
		});
		
		it("Call - Invalid", function()
		{
			runOptionError(null, "Invalid permanant flag. Must be True or False");
		});
		
		
		
	});
}


function runRequestUrlInvalid(folderArg, fileArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.callWriteApiUrl(folderArg, fileArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var invalidUrlRes = [comp, msg];
	commonFunctionsFile.testInvalidFunctionResult(invalidUrlRes, eError);
}

function runReadResponseInvalidArray(invalidArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.callReadApiResponseArray(invalidArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var invalidArrayRes = [comp, msg];
	commonFunctionsFile.testInvalidFunctionResult(invalidArrayRes, eError);
}

function runReadResponseInvalidObject(invalidArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.callReadApiResponseObject(invalidArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var invalidObjectRes = [comp, msg];
	commonFunctionsFile.testInvalidFunctionResult(invalidObjectRes, eError);
}

function runReadResponseInvalidString(invalidArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.callReadApiResponseString(invalidArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var invalidStringRes = [comp, msg];
	commonFunctionsFile.testInvalidFunctionResult(invalidStringRes, eError);
}


function runReadResponseInvalidError(invalidArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.callReadApiResponseError(invalidArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var invalidRes = [comp, msg];
	commonFunctionsFile.testInvalidFunctionResult(invalidRes, eError);
}



function runValidateResponseInvalid(invalidArg, eError)
{
	var comp = false;
	var msg = null;
	
	try
	{
		requestFile.callValidateApiResponse(invalidArg);
		comp = true;
	}
	catch(e)
	{
		comp = false;
		msg = e.message;
	}
	
	var invalidRes = [comp, msg];
	commonFunctionsFile.testInvalidFunctionResult(invalidRes, eError);
}



function runRefuseError(refuseArg)
{
	var supposedText = "API request failed. - " + refuseArg;
	var refComplete = false;
	var refMsg = "";
	
	try
	{
		requestFile.showApiRequestRefusedError(refuseArg);
		refComplete = true;
	}
	catch(e)
	{
		refComplete = false;
		refMsg = e.message;
	}
	
	var reResult = [refComplete, refMsg];
	commonFunctionsFile.testInvalidFunctionResult(reResult, supposedText);
}


function runOptionError(deleteArg, eError)
{
	var oComplete = false;
	var oMessage = "";
	
	try
	{
		requestFile.getDeleteOptions(deleteArg);
		oComplete = true;
	}
	catch(e)
	{
		oComplete = false;
		oMessage = e.message;
	}
	
	var oResult = [oComplete, oMessage];
	commonFunctionsFile.testInvalidFunctionResult(oResult, eError);
	
}



module.exports = testRequest;