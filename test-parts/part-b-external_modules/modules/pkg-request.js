const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const requireFunctionFile = require("../sub-modules/require-node-module");
const addressFile = require("../sub-modules/ip-strings");
const aReq = requireFunctionFile.requireModuleSafe('request');

var rSpy = null;

function testRequest()
{
	describe("Request", function()
	{
		verifyRequestExists();
		verifyRequestFunction();
	});
}

function verifyRequestExists()
{
	describe("Library", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(aReq);
		});
	});
}

function verifyRequestFunction()
{
	var urlError = "options.uri is a required argument";
	
	describe("Request Function", function()
	{
		it("Exists", function(done)
		{
			commonFunctionsFile.testType(aReq, 'function');
			rSpy = sinon.spy(aReq);
			done();
		});
		
		it("Call - Valid", function(done)
		{
			rSpy(addressFile.pingAddress, function(reqError, reqReturn)
			{
				
				checkRequestSpy(addressFile.pingAddress);
				expect(reqError).to.be.null;
				checkRequestReturn(reqReturn);
				done();
			});
		});
		
		it("Call - Null", function(done)
		{
			rSpy(null, function(nullError, nullReturn)
			{
				checkRequestSpy(null);
				expect(nullError.message).to.equal(urlError);
				expect(nullReturn).to.be.undefined;
				done();
			});
		});
		
		it("Call - Invalid Type", function(done)
		{
			rSpy(-1, function(typeError, typeReturn)
			{
				checkRequestSpy(-1);
				expect(typeError.message).to.equal(urlError);
				expect(typeReturn).to.be.undefined;
				done();
			});
		});
		
		it("Complete", function(done)
		{
			rSpy = null;
			done();
		});
		
		
	});
}


function checkRequestSpy(reqArg)
{
	commonFunctionsFile.testTrue(rSpy.called);
	commonFunctionsFile.testPresent(rSpy.lastCall);
	
	commonFunctionsFile.testPresent(rSpy.lastCall.args);
	commonFunctionsFile.testArray(rSpy.lastCall.args);
	
	expect(rSpy.lastCall.args[0]).to.not.be.undefined;
	expect(rSpy.lastCall.args[0]).to.equal(reqArg);

	commonFunctionsFile.testPresent(rSpy.lastCall.args[1]);
	commonFunctionsFile.testType(rSpy.lastCall.args[1], 'function');

	commonFunctionsFile.testPresent(rSpy.lastCall.callback);
	commonFunctionsFile.testType(rSpy.lastCall.callback, 'function');
}

function checkRequestReturn(r)
{
	commonFunctionsFile.testPresent(r);
	commonFunctionsFile.testType(r, 'object');
	
	validateGivenProperty(r, 'statusCode', 'number');
	validateGivenProperty(r, 'body', 'string');
	validateGivenProperty(r, 'request', 'object');
	
	validateGivenProperty(r.request, 'uri', 'object');
	validateGivenProperty(r.request, 'method', 'string');
	validateGivenProperty(r.request.uri, 'href', 'string');
	
	expect(r.statusCode).to.equal(200);
	commonFunctionsFile.testLeast(r.body.length, 1);
	expect(r.request.method).to.equal('GET');
	expect(r.request.uri.href).to.equal(addressFile.pingAddress);
	
}

function validateGivenProperty(sourceObject, gPropertyName, gPropertyType)
{
	commonFunctionsFile.testObjectPropertyDefinition(sourceObject, gPropertyName);
	commonFunctionsFile.testObjectPropertyContent(sourceObject, gPropertyName, gPropertyType);
}


exports.callTestRequest = testRequest;