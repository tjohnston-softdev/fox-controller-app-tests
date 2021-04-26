const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

function coordinateInternal()
{
	var iValidFile = require("./scripts/s-local_valid");
	var iDefineFile = require("./scripts/s-define_api");
	var iRequestFile = require("./scripts/s-request_api");
	var iRequestPathFile = require("./scripts/s-request_api_paths");
	var iDatabaseFile = require("./scripts/s-supported-databases");
	
	describe("C - Internal Scripts", function()
	{
		iValidFile.callTestLocalValid();
		iDefineFile.callTestDefine();
		iRequestFile.callTestRequest();
		iRequestPathFile.callTestRequestPaths();
		iDatabaseFile.callTestSupportedDatabases();
	});
}

exports.callInternal = coordinateInternal;