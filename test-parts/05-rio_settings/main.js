const mainTests = require("./settings/set-main");
const propertyTests = require("./settings/set-props");
const functionTests = require("./settings/set-functions");


function coordinateSettings()
{
	describe("E - Remote IO Settings", function()
	{
		mainTests();
		propertyTests();
		functionTests();
	});
}

module.exports = coordinateSettings;