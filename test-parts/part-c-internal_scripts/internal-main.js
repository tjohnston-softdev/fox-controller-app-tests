const localValidTests = require("./scripts/s-local_valid");
const defineApiTests = require("./scripts/s-define_api");
const requestApiTests = require("./scripts/s-request_api");
const requestPathTests = require("./scripts/s-request_api_paths");
const dbDefinitionTests = require("./scripts/s-supported-databases");


function coordinateInternal()
{
	describe("C - Internal Scripts", function()
	{
		localValidTests();
		defineApiTests();
		requestApiTests();
		requestPathTests();
		dbDefinitionTests();
	});
}

module.exports = coordinateInternal;