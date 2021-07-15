//const localValidTests = require("./scripts/s-local_valid");
const localGeneralTests = require("./scripts/s-local_valid-general");
const localSpecificTests = require("./scripts/s-local_valid-specific");
const defineApiTests = require("./scripts/s-define_api");
const requestApiTests = require("./scripts/s-request_api");
const requestPathTests = require("./scripts/s-request_api_paths");
const dbDefinitionTests = require("./scripts/s-supported-databases");


function coordinateInternal()
{
	describe("C - Internal Scripts", function()
	{
		//localValidTests();
		localGeneralTests();
		localSpecificTests();
		//defineApiTests();
		requestApiTests();
		//requestPathTests();
		//dbDefinitionTests();
	});
}

module.exports = coordinateInternal;