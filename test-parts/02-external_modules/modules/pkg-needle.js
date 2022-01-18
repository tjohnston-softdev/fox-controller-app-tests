const needle = require("needle");
const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const ipStrings = require("../sub-modules/ip-strings");
const needleData = require("../sub-modules/needle-data");


function testNeedle()
{
	describe("Needle", function()
	{
		verifyGetRequest();
		verifyPostRequest();
		verifyPutRequest();
		verifyDeleteRequest();
		verifyTimeoutRequest();
	});
}


function verifyGetRequest()
{
	describe("GET", function()
	{
		it("Function Exists", function()
		{
			objectFunctions.testPropExists(needle, "get");
			objectFunctions.testPropType(needle, "get", "function");
		});
		
		it("Request Successful", function(done)
		{
			needle.get(ipStrings.pingAddress, function (getError, getRes)
			{
				expect(getError).to.be.null;
				checkRequestReturn(getRes);
				checkReadOutcome(getRes);
				done();
			});
		});
		
	});
}


function verifyPostRequest()
{
	describe("POST", function()
	{
		it("Function Exists", function()
		{
			objectFunctions.testPropExists(needle, "post");
			objectFunctions.testPropType(needle, "post", "function");
		});
		
		it("Request Successful", function(done)
		{
			needle.post(ipStrings.createAddress, needleData.newObject, function(postErr, postRes)
			{
				expect(postErr).to.be.null;
				checkRequestReturn(postRes);
				checkModifyOutcome(postRes, 201, "POST");
				compareDataObjects(needleData.newObject, postRes, 101);
				done();
			});
		});
		
	});
}


function verifyPutRequest()
{
	describe("PUT", function()
	{
		it("Function Exists", function()
		{
			objectFunctions.testPropExists(needle, "put");
			objectFunctions.testPropType(needle, "put", "function");
		});
		
		it("Request Successful", function(done)
		{
			needle.put(ipStrings.updateAddress, needleData.updateObject, function(putErr, putRes)
			{
				expect(putErr).to.be.null;
				checkRequestReturn(putRes);
				checkModifyOutcome(putRes, 200, "PUT");
				compareDataObjects(needleData.updateObject, putRes, 1);
				done();
			});
		});
		
	});
}


function verifyDeleteRequest()
{
	describe("DELETE", function()
	{
		it("Function Exists", function()
		{
			objectFunctions.testPropExists(needle, "delete");
			objectFunctions.testPropType(needle, "delete", "function");
		});
		
		it("Request Successful", function(done)
		{
			needle.delete(ipStrings.deleteAddress, null, function (deleteErr, deleteRes)
			{
				expect(deleteErr).to.be.null;
				checkRequestReturn(deleteRes);
				checkModifyOutcome(deleteRes, 200, "DELETE");
				done();
			});
		});
	});
	
}


function verifyTimeoutRequest()
{
	describe("Timeout", function()
	{
		it("Caught", function(done)
		{
			needle.get("http://", {timeout: 1000}, function (timeoutErr, timeoutRes)
			{
				expect(timeoutErr).to.be.an.instanceof(Error);
				expect(timeoutErr.message).to.equal("connect ECONNREFUSED 127.0.0.1:80");
				expect(timeoutErr.code).to.equal("ECONNREFUSED");
				expect(timeoutRes).to.be.undefined;
				
				done();
			});
		});
	});
}


function checkRequestReturn(replyObject)
{
	commonFunctions.testPresent(replyObject);
	expect(replyObject).to.be.an("object");
	
	validateCommonProperty(replyObject, "statusCode", "number");
	validateCommonProperty(replyObject, "bytes", "number");
	validateCommonProperty(replyObject, "req", "object");
	objectFunctions.testPropExists(replyObject, "body");
	expect(replyObject.bytes).to.be.above(0);
}


function checkReadOutcome(replyObject)
{
	commonFunctions.testString(replyObject.body);
	expect(replyObject.statusCode).to.equal(200);
	expect(replyObject.req).to.have.deep.property("method", "GET");
}


function checkModifyOutcome(replyObject, correctStatus, correctMethod)
{
	var outputObject = replyObject.body;
	
	commonFunctions.testPresent(outputObject);
	expect(outputObject).to.be.an("object");
	expect(replyObject.statusCode).to.equal(correctStatus);
	
	validateCommonProperty(replyObject, "parser", "string");
	expect(replyObject.parser).to.equal("json");
	expect(replyObject.req).to.have.deep.property("method", correctMethod);
}


function compareDataObjects(inputObject, replyObject, correctID)
{
	var outputObject = replyObject.body;
	objectFunctions.testSameProps(outputObject, inputObject);
	
	expect(outputObject.id).to.equal(correctID);
	expect(outputObject.title).to.equal(inputObject.title);
	expect(outputObject.body).to.equal(inputObject.body);
	expect(outputObject.userId).to.equal('1');
}



function validateCommonProperty(sourceObj, gProp, gType)
{
	objectFunctions.testPropExists(sourceObj, gProp);
	objectFunctions.testPropType(sourceObj, gProp, gType);
}


module.exports = testNeedle;