const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const commonErrorStringsFile = require(commonPaths.commonErrors);
const requestFile = require(commonPaths.requestApi);
const commonRequestFunctions = require("../sub-scripts/common-request");
const requestInvalid = require("../sub-scripts/request-invalid");

const readNullError = "Cannot read property 'body' of null";
const emptyReplyObject = commonRequestFunctions.createReplyObject(200, "");


function testRequestResponses()
{
	describe("API Request - Responses", function()
	{
		checkRequestResponseArray();
		checkRequestResponseObject();
		checkRequestResponseError();
		checkRequestResponseValidation();
		checkOnlineResult();
		checkRefuseError();
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
			objectFunctions.testPropExists(requestFile, 'readResponseArray');
			objectFunctions.testPropType(requestFile, 'readResponseArray', 'function');
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
			objectFunctions.testPropExists(requestFile, 'readResponseObject');
			objectFunctions.testPropType(requestFile, 'readResponseObject', 'function');
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
			objectFunctions.testPropExists(requestFile, 'readResponseError');
			objectFunctions.testPropType(requestFile, 'readResponseError', 'function');
		});
		
		it("Call - Valid", function()
		{
			var validErrorString = "Example Message";
			var validReplyString = commonRequestFunctions.writeErrorExample(validErrorString);
			var inputReply = commonRequestFunctions.createReplyObject(500, validReplyString);
			var actualError = requestFile.readResponseError(inputReply);
			
			commonFunctions.testString(actualError);
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
			objectFunctions.testPropExists(requestFile, 'validateResponse');
			objectFunctions.testPropType(requestFile, 'validateResponse', 'function');
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
			objectFunctions.testPropExists(requestFile, 'getOnlineResult');
			objectFunctions.testPropType(requestFile, 'getOnlineResult', 'function');
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
			objectFunctions.testPropExists(requestFile, 'showRefusedError');
			objectFunctions.testPropType(requestFile, 'showRefusedError', 'function');
		});
		
		it("Error Flagged Successfully", function()
		{
			requestInvalid.runRefuse("Test");
		});
		
	});
}



module.exports = testRequestResponses;