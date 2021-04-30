const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
const localValidFile = require(commonPaths.localValid);
const commonJsonObjectsFile = require(commonPaths.commonObjects);

const controllerRedSettingsFile = getRedSettingsMainRequirement();


function testNodeRedSettings()
{
	describe("Node RED Settings", function()
	{
		checkSettingsFile();
	});
}

function checkSettingsFile()
{
	describe("Settings File (node-red-settings)", function()
	{
		it("Exists", function()
		{
			commonFunctionsFile.testPresent(controllerRedSettingsFile);
			expect(controllerRedSettingsFile).to.be.an("object");
		});
	});
}


function getRedSettingsMainRequirement()
{
	var res = null;
	
	try
	{
		res = require(foxPath.redSettingsFile);
	}
	catch(e)
	{
		res = null;
	}
	
	return res;
}


exports.callTestNodeRedSettings = testNodeRedSettings;