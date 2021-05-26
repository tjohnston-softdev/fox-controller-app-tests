const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const commonFunctionsFile = require(commonPaths.testCommonFull);
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
			commonFunctionsFile.testPresent(controllerRedSettingsFile);
			expect(controllerRedSettingsFile).to.be.an("object");
		});
	});
}


module.exports = testNodeRedSettings;