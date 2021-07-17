const osModule = require("os");
const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctions = require(commonPaths.testCommon);
const objectFunctions = require(commonPaths.testObject);
const osStrings = require("../sub-modules/os-strings");

function testOsDependency()
{
	describe("Operating System", function()
	{
		verifyPlatformFunction();
	});
}



function verifyPlatformFunction()
{
	var devicePlatform = "";
	
	describe("Platform (platform)", function()
	{
		it("Function Exists", function()
		{
			objectFunctions.testPropExists(osModule, 'platform');
			objectFunctions.testPropType(osModule, 'platform', 'function');
		});
		
		it("Function Works", function()
		{
			devicePlatform = osModule.platform();
		});
		
		it("Supported Operating System", function()
		{
			var supportFlag = osStrings.checkSupported(devicePlatform);
			expect(supportFlag).to.be.true;
		});
		
	});
	
}

module.exports = testOsDependency;