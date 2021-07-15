const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommon);
const requestFile = require(commonPaths.requestApi);
const requestInvalid = require("../sub-scripts/request-invalid");


function testRequestURLs()
{
	describe("API Request - URLs", function()
	{
		checkHostUrlString();
		checkWriteUrl();
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


module.exports = testRequestURLs;