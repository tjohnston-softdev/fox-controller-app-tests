const osModule = require("os");
const chai = require("chai");
const expect = require("chai").expect;

const commonPaths = require("../../../app/paths/files/app-paths");
const commonFunctionsFile = require(commonPaths.testCommonFull);
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
			commonFunctionsFile.testObjectPropertyDefinition(osModule, 'platform');
			commonFunctionsFile.testObjectPropertyContent(osModule, 'platform', 'function');
		});
		
		it("Function Works", function()
		{
			devicePlatform = osModule.platform();
		});
		
		it("Supported Operating System", function()
		{
			var supportFlag = osStrings.checkOsSupported(devicePlatform);
			expect(supportFlag).to.be.true;
		});
		
	});
	
}


module.exports =
{
	callTestOsDependency: testOsDependency
};