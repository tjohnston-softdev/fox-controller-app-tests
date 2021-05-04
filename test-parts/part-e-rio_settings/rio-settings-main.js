const cRemoteIoSettingsFile = require("./settings/set-main");
const cRemoteIoPropertiesFile = require("./settings/set-props");
const cRemoteIoFunctionsFile = require("./settings/set-functions");


function coordinateSettings()
{
	describe("E - Remote IO Settings", function()
	{
		cRemoteIoSettingsFile.callTestRemoteIoSettings();
		cRemoteIoPropertiesFile.callTestRemoteIoProperties();
		cRemoteIoFunctionsFile.callTestRemoteIoFunctions();
	});
}

module.exports =
{
	callSettings: coordinateSettings
}