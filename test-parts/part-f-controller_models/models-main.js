const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

function coordinateModels()
{
	var cSettingsIntegrationFile = require("./models/m-settings_integration");
	var cModelDefinitionsFile = require("./models/m-model_definitions");
	
	describe("F - Controller Models", function()
	{
		cSettingsIntegrationFile.callTestRemoteIoIntegration();
		cModelDefinitionsFile.callTestModelDefinitionFiles();
	});
}

exports.callModels = coordinateModels;