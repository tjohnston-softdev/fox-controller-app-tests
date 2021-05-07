const eOperatingSystemFile = require("./modules/pkg-os");
const eValidatorFile = require("./modules/pkg-validator");
const eNeedleFile = require("./modules/pkg-needle");

function coordinateExternal()
{
	describe("B - External Modules", function()
	{
		//eOperatingSystemFile.callTestOsDependency();
		//eValidatorFile.callTestValidatorDependency();
		eNeedleFile.callTestNeedle();
	});
}

module.exports =
{
	callExternal: coordinateExternal
};