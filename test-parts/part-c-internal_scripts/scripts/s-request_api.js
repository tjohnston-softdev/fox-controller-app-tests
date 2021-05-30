const chai = require("chai");
const expect = require("chai").expect;
const validator = require("validator");

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const requestFile = require(commonPaths.requestApi);
const commonRequestFunctions = require("../sub-scripts/common-request");
const requestInvalid = require("../sub-scripts/request-invalid");

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
	describe("Request API Address (writeUrl)", function()
	{
		var folderArg = "example-folder";
		var fileArg = "example-file";
		
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'writeUrl');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'writeUrl', 'function');
		});
		
		it("Call - Valid", function()
		{
			var linkRoot = requestFile.hostUrl + "/api/";
			var linkPath = folderArg + '/' + fileArg;
			var inputURL = linkRoot + linkPath;
			
			var actualURL = requestFile.writeUrl(folderArg, fileArg);
			expect(actualURL).to.equal(inputURL);
		});
		
		it("Call - Empty", function()
		{
			var emptyErrorString = "URL Write argument strings cannot be empty";
			requestInvalid.runUrl("", fileArg, emptyErrorString);
			requestInvalid.runUrl(folderArg, "", emptyErrorString);
			requestInvalid.runUrl("", "", emptyErrorString);
		});
		
		it("Call - Invalid Type", function()
		{
			var typeErrorString = "URL Write arguments must be strings";
			requestInvalid.runUrl(-1, fileArg, typeErrorString);
			requestInvalid.runUrl(folderArg, -1, typeErrorString);
			requestInvalid.runUrl(-1, -1, typeErrorString);
		});
		
		it("Call - Null", function()
		{
			var nullErrorString = "URL Write arguments missing or null";
			requestInvalid.runUrl(null, fileArg, nullErrorString);
			requestInvalid.runUrl(folderArg, null, nullErrorString);
			requestInvalid.runUrl(null, null, nullErrorString);
		});
		
	});
}

function checkRequestResponseArray()
{
	var posError = commonErrorStringsFile.writeUnexpectedTokenGeneral("u", 0);
	var emptyBodyError = "Unexpected end of JSON input";
	
	describe("Read API Response Array (readResponseArray)", function()
	{
		
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'readResponseArray');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'readResponseArray', 'function');
		});
		
		it("Call - Valid", function()
		{
			var respString = '[{"value":"x","text":"y","name":"z"}]';
			var inputResp = commonRequestFunctions.createReplyObject(200, respString);
			var actualResp = requestFile.readResponseArray(inputResp);
			
			commonRequestFunctions.validateBodyArray(actualResp);
		});
		
		it("Call - Empty Body", function()
		{
			requestInvalid.runResponseArray(emptyReplyObject, emptyBodyError);
		});
		
		it("Call - Missing Body", function()
		{
			requestInvalid.runResponseArray({}, posError);
		});
		
		it("Call - Null", function()
		{
			requestInvalid.runResponseArray(null, readNullError);
		});
		
		it("Call - Invalid Type", function()
		{
			requestInvalid.runResponseArray(-1, posError);
		});
		
	});
}

function checkRequestResponseObject()
{
	var posError = commonErrorStringsFile.writeUnexpectedTokenGeneral("u", 0);
	var jsonString = '{"exampleProperty":"exampleValue"}';
	var jsonObject = JSON.parse(jsonString);
	
	describe("Read API Response Object (readResponseObject)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'readResponseObject');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'readResponseObject', 'function');
		});
		
		it("Call - Valid String", function()
		{
			var inputResp = commonRequestFunctions.createReplyObject(200, jsonString);
			var actualResp = requestFile.readResponseObject(inputResp);
			commonRequestFunctions.validateBodyObject(actualResp);
		});
		
		it("Call - Valid Object", function()
		{
			var inputResp = commonRequestFunctions.createReplyObject(200, jsonObject);
			var actualResp = requestFile.readResponseObject(inputResp);
			commonRequestFunctions.validateBodyObject(actualResp);
		});
		
		
		it("Call - Empty Body", function()
		{
			requestInvalid.runResponseObject(emptyReplyObject, "Unexpected end of JSON input");
		});
		
		it("Call - Missing Body", function()
		{
			requestInvalid.runResponseObject({}, posError);
		});
		
		it("Call - Null", function()
		{
			requestInvalid.runResponseObject(null, readNullError);
		});
		
		it("Call - Invalid Type", function()
		{
			requestInvalid.runResponseObject(-1, posError);
		});
		
	});
}



function checkRequestResponseError()
{
	describe("Read API Response Error (readResponseError)", function()
	{
		var incorrectErrorFormat = "Could not extract error message. HTTP reply body uses incorrect format";
		
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'readResponseError');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'readResponseError', 'function');
		});
		
		it("Call - Valid", function()
		{
			var validErrorString = "Example Message";
			var validReplyString = commonRequestFunctions.writeErrorExample(validErrorString);
			var inputReply = commonRequestFunctions.createReplyObject(500, validReplyString);
			var actualError = requestFile.readResponseError(inputReply);
			
			commonFunctionsFile.testString(actualError);
			expect(actualError).to.equal(validErrorString);
		});
		
		it("Call - Empty Message", function()
		{
			var emptyMsg = commonRequestFunctions.createReplyObject(500, "<h1></h1>");
			requestInvalid.runResponseError(emptyMsg, "HTTP Error Message is empty");
		});
		
		it("Call - Mismatch", function()
		{
			var invalidHTML = commonRequestFunctions.createReplyObject(500, "<html><body></h1>Example<h1></body></html>");
			requestInvalid.runResponseError(invalidHTML, incorrectErrorFormat);
		});
		
		it("Call - Invalid Format", function()
		{
			var formatHTML = commonRequestFunctions.createReplyObject(500, "<b>Example</b>");
			requestInvalid.runResponseError(formatHTML, incorrectErrorFormat);
		});
		
		
	});
}


function checkRequestResponseValidation()
{
	describe("Validate API Response (validateResponse)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'validateResponse');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'validateResponse', 'function');
		});
		
		it("Call - Valid", function()
		{
			var validResponseObject = commonRequestFunctions.createReplyObject(200, "Successful");
			var validResult = requestFile.validateResponse(validResponseObject);
			expect(validResult).to.be.true;
		});
		
		it("Call - Invalid", function()
		{
			var errString = "Failure";
			var errHTML = commonRequestFunctions.writeErrorExample(errString);
			var invalidResponseObject = commonRequestFunctions.createReplyObject(500, errHTML);
			
			requestInvalid.runValidate(invalidResponseObject, errString);
		});
		
		
	});
}



function checkOnlineResult()
{
	describe("Check Online Result (getOnlineResult)", function()
	{
		it("Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'getOnlineResult');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'getOnlineResult', 'function');
		});
		
		it("Call - Online", function()
		{
			var inputReply = {"statusCode":200};
			var onlineRes = requestFile.getOnlineResult(inputReply);
			expect(onlineRes).to.be.true;
		});
		
		it("Call - Offline", function()
		{
			var offlineRes = requestFile.getOnlineResult(null);
			expect(offlineRes).to.be.false;
		});
		
		it("Call - Missing Status Code", function()
		{
			var emptyObj = {};
			var statusRes = requestFile.getOnlineResult(emptyObj);
			expect(statusRes).to.be.false;
		});
		
		it("Call - Invalid Type", function()
		{
			var invalidTypeRes = requestFile.getOnlineResult(-1);
			expect(invalidTypeRes).to.be.false;
		});
		
		
	});
}

function checkRefuseError()
{
	describe("Request Refused Error (showRefusedError)", function()
	{
		it("Error Function Exists", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(requestFile, 'showRefusedError');
			commonFunctionsFile.testObjectPropertyContent(requestFile, 'showRefusedError', 'function');
		});
		
		it("Error Flagged Successfully", function()
		{
			requestInvalid.runRefuse("Test");
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
			commonRequestFunctions.validateDeleteOptions(trueRes, true);
		});
		
		it("Call - False", function()
		{
			falseRes = requestFile.getDeleteOptions(false);
			commonRequestFunctions.validateDeleteOptions(falseRes, false);
		});
		
		it("Call - Invalid", function()
		{
			requestInvalid.runOptions(null, "Invalid permanant flag. Must be True or False");
		});
		
		
		
	});
}

module.exports = testRequest;