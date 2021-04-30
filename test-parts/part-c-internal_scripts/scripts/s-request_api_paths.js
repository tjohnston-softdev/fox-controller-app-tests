const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonErrorStringsFile = require(commonPaths.commonErrors);

const requestPathFile = getRequestPathFile();


function testRequestPaths()
{
	describe("API Request Paths", function()
	{
		checkPathFileExists();
		checkPathProperties();
	});
}


function checkPathFileExists()
{
	describe("Request Path File", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(requestPathFile);
			expect(requestPathFile).to.be.an("object");
		});
	});
}


function checkPathProperties()
{
	describe("API Path Properties", function()
	{
		handleIndividualPath('adminApi', "Admin");
		handleIndividualPath('alarmApi', "Alarm");
		handleIndividualPath('nodesApi', "Nodes");
		handleIndividualPath('storageApi', "Storage");
		handleIndividualPath('devicesApi', "Devices");
		handleIndividualPath('rioApiSub', "Remote IO");
		
	});
}


function handleIndividualPath(propertyName, descriptionName)
{
	it(descriptionName, function()
	{
		commonFunctionsFile.testObjectPropertyDefinition(requestPathFile, propertyName);
		commonFunctionsFile.testObjectPropertyContent(requestPathFile, propertyName, 'string');
		commonFunctionsFile.testString(requestPathFile[propertyName]);
	});
}




function getRequestPathFile()
{
	var res = null;
	
	try
	{
		res = require(commonPaths.requestApiPaths);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestRequestPaths = testRequestPaths;