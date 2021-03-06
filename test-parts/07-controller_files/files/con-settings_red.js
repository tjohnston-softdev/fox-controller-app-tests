const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctions = require(commonPaths.testCommon);
const loadFoxFile = require(commonPaths.loadFox);
const controllerRedSettingsFile = loadFoxFile(foxPath.redSettingsFile);


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
			commonFunctions.testObject(controllerRedSettingsFile);
		});
	});
}


module.exports = testNodeRedSettings;