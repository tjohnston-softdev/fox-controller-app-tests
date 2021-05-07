const eOperatingSystemFile = require("./modules/pkg-os");
const eValidatorFile = require("./modules/pkg-validator");

function coordinateExternal()
{
	describe("B - External Modules", function()
	{
		eOperatingSystemFile.callTestOsDependency();
		eValidatorFile.callTestValidatorDependency();
	});
}

module.exports =
{
	callExternal: coordinateExternal
};