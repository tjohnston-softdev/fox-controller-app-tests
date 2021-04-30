const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const ioSettingsFile = includeRemoteIoSettings();


function testRemoteIoIntegration()
{
	describe("Remote IO Settings Integration", function()
	{
		checkFileIncluded();
		checkPropertiesValid();
	});
}


function checkFileIncluded()
{
	describe("File", function()
	{
		it("Successfully Included", function()
		{
			commonFunctionsFile.testPresent(ioSettingsFile);
			expect(ioSettingsFile).to.be.an("object");
		});
	});
}

function checkPropertiesValid()
{
	describe("Properties", function()
	{
		it("Types Valid (ioTypes)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(ioSettingsFile, 'ioTypes');
			commonFunctionsFile.testObjectPropertyContent(ioSettingsFile, 'ioTypes', 'object');
			commonFunctionsFile.testObjectAllPropertiesType(ioSettingsFile.ioTypes, 'string');
			commonFunctionsFile.testObjectMatchKVInsensitive(ioSettingsFile.ioTypes);
		});
		
		it("Prefixes Valid (ioPrefixes)", function()
		{
			commonFunctionsFile.testObjectPropertyDefinition(ioSettingsFile, 'ioPrefixes');
			commonFunctionsFile.testObjectPropertyContent(ioSettingsFile, 'ioPrefixes', 'object');
			commonFunctionsFile.testObjectAllPropertiesType(ioSettingsFile.ioPrefixes, 'string');
			commonFunctionsFile.testObjectMatchKV(ioSettingsFile.ioPrefixes);
		});
	});
}





function includeRemoteIoSettings()
{
	var res = null;
	
	try
	{
		res = require(foxPath.rioSettingsFile);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}

exports.callTestRemoteIoIntegration = testRemoteIoIntegration;