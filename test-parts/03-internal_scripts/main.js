const localGeneralTests = require("./scripts/s-local_valid-general");
const localSpecificTests = require("./scripts/s-local_valid-specific");
const defineApiTests = require("./scripts/s-define_api");
const requestApiUrlTests = require("./scripts/s-request_api-urls");
const requestApiResponseTests = require("./scripts/s-request_api-responses");
const requestApiOtherTests = require("./scripts/s-request_api-other");
const requestPathTests = require("./scripts/s-request_api_paths");
const dbDefinitionTests = require("./scripts/s-supported-databases");


function coordinateInternal()
{
	describe("C - Internal Scripts", function()
	{
		localGeneralTests();
		localSpecificTests();
		defineApiTests();
		requestApiUrlTests();
		requestApiResponseTests();
		requestApiOtherTests();
		requestPathTests();
		dbDefinitionTests();
	});
}

module.exports = coordinateInternal;