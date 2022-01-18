const operatingSystemTests = require("./modules/pkg-os");
const validatorTests = require("./modules/pkg-validator");
const needleTests = require("./modules/pkg-needle");

function coordinateExternal()
{
	describe("B - External Modules", function()
	{
		operatingSystemTests();
		validatorTests();
		needleTests();
	});
}

module.exports = coordinateExternal;