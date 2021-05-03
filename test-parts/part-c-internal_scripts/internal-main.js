const iValidFile = require("./scripts/s-local_valid");
const iDefineFile = require("./scripts/s-define_api");
const iRequestFile = require("./scripts/s-request_api");
const iRequestPathFile = require("./scripts/s-request_api_paths");
const iDatabaseFile = require("./scripts/s-supported-databases");


function coordinateInternal()
{
	describe("C - Internal Scripts", function()
	{
		//iValidFile.callTestLocalValid();
		//iDefineFile.callTestDefine();
		iRequestFile.callTestRequest();
		iRequestPathFile.callTestRequestPaths();
		//iDatabaseFile.callTestSupportedDatabases();
	});
}

module.exports =
{
	callInternal: coordinateInternal
};