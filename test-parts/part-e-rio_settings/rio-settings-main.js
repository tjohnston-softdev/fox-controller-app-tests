const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

function coordinateSettings()
{
	var cRemoteIoSettingsFile = require("./settings/set-main");
	var cRemoteIoPropertiesFile = require("./settings/set-props");
	var cRemoteIoFunctionsFile = require("./settings/set-functions");
	
	describe("E - Remote IO Settings", function()
	{
		cRemoteIoSettingsFile.callTestRemoteIoSettings();
		//cRemoteIoPropertiesFile.callTestRemoteIoProperties();
		//cRemoteIoFunctionsFile.callTestRemoteIoFunctions();
	});
}

exports.callSettings = coordinateSettings;