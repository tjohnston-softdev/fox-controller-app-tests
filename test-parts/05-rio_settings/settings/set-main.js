const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const foxPath = require(commonPaths.foxRelative);
const loadFoxFile = require(commonPaths.loadFox);
const settingsFile = loadFoxFile(foxPath.rioSettingsFile);


function testRemoteIoSettings()
{
	describe("Main", function()
	{
		checkFile();
		checkExports();
	});
}


function checkFile()
{
	describe("Remote IO Settings File", function()
	{
		it("Loaded", function()
		{
			expect(settingsFile).to.exist;
		});
	});
}

module.exports = testRemoteIoSettings;