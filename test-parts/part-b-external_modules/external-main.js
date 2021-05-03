const eOperatingSystemFile = require("./modules/pkg-os");
const eValidatorFile = require("./modules/pkg-validator");
const eRequestFile = require("./modules/pkg-request");

function coordinateExternal()
{
	describe("B - External Modules", function()
	{
		eOperatingSystemFile.callTestOsDependency();
		eValidatorFile.callTestValidatorDependency();
		eRequestFile.callTestRequest();
	});
}

module.exports =
{
	callExternal: coordinateExternal
};