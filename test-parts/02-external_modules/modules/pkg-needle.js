const needle = require("needle");
const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const ipStrings = require("../sub/ip-strings");
const needleData = require("../sub/needle-data");


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
			commonFunctions.testFunction(needle.get);
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
			commonFunctions.testFunction(needle.post);
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
			commonFunctions.testFunction(needle.put);
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
			var delFunc = needle["delete"];
			commonFunctions.testFunction(delFunc);
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
	commonFunctions.testObject(outputObject);
	commonFunctions.testNumber(replyObject.statusCode);
	commonFunctions.testNumber(replyObject.bytes);
	commonFunctions.testObject(replyObject.req);
	expect(replyObject.body).to.exist;
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
	commonFunctions.testObject(outputObject);
	
	expect(replyObject.statusCode).to.equal(correctStatus);
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


module.exports = testNeedle;