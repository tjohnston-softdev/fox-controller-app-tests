const eOperatingSystemFile = require("./modules/pkg-os");
const eValidatorFile = require("./modules/pkg-validator");
const eNetFile = require("./modules/pkg-net");
const eRequestFile = require("./modules/pkg-request");

function coordinateExternal()
{
	describe("B - External Modules", function()
	{
		eOperatingSystemFile.callTestOsDependency();
		eValidatorFile.callTestValidatorDependency();
		eNetFile.callTestNetDependency();
		eRequestFile.callTestRequest();
	});
}

module.exports =
{
	callExternal: coordinateExternal
};