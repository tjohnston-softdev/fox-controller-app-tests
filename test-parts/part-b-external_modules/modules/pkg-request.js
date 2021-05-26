const request = require("request");
const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const ipStrings = require("../sub-modules/ip-strings");


function testRequest()
{
	describe("Request", function()
	{
		var urlError = "options.uri is a required argument";
		
		it("Function Exists", function()
		{
			expect(request).to.be.a("function");
		});
		
		it("Call - Valid", function(done)
		{
			request(ipStrings.pingAddress, function(reqError, reqReturn)
			{
				expect(reqError).to.be.null;
				checkRequestReturn(reqReturn);
				done();
			});
		});
		
		
		it("Call - Null", function(done)
		{
			request(null, function(nullError, nullReturn)
			{
				expect(nullError.message).to.equal(urlError);
				expect(nullReturn).to.be.undefined;
				done();
			});
		});
		
		
		it("Call - Invalid Type", function(done)
		{
			request(-1, function(typeError, typeReturn)
			{
				expect(typeError.message).to.equal(urlError);
				expect(typeReturn).to.be.undefined;
				done();
			});
		});
		
		
	});
}



function checkRequestReturn(replyObj)
{
	commonFunctionsFile.testPresent(replyObj);
	expect(replyObj).to.be.an("object");
	
	validateGivenProperty(replyObj, 'statusCode', 'number');
	validateGivenProperty(replyObj, 'body', 'string');
	validateGivenProperty(replyObj, 'request', 'object');
	
	validateGivenProperty(replyObj.request, 'uri', 'object');
	validateGivenProperty(replyObj.request, 'method', 'string');
	validateGivenProperty(replyObj.request.uri, 'href', 'string');
	
	expect(replyObj.statusCode).to.equal(200);
	expect(replyObj.body.length).to.be.at.least(1);
	expect(replyObj.request.method).to.equal('GET');
	expect(replyObj.request.uri.href).to.equal(ipStrings.pingAddress);
	
}

function validateGivenProperty(sourceObject, gProp, gType)
{
	commonFunctionsFile.testObjectPropertyDefinition(sourceObject, gProp);
	commonFunctionsFile.testObjectPropertyContent(sourceObject, gProp, gType);
}


module.exports = testRequest;