const deviceSettingsTests = require("./files/con-device_settings");
const classTests = require("./files/con-device_classes");
const factoryTests = require("./files/con-rio_factories");
const settingsMainTests = require("./files/con-settings");
const redTests = require("./files/con-settings_red");


function coordinateController()
{
	describe("G - Controller Files", function()
	{
		var rioIndexMainTests = require("./files/con-rio_index_main");
		var rioIndexNodeListTests = require("./files/con-rio_index_node_list");
		var rioIndexRegisterTests = require("./files/con-rio_index_node_reg");
		var rioIndexRegisterInvalidTests = require("./files/con-rio_index_node_reg_invalid");
		var serviceTests = require("./files/con-service_main");
		
		//deviceSettingsTests();
		//classTests();
		//factoryTests();
		//rioIndexMainTests();
		//rioIndexNodeListTests();
		rioIndexRegisterTests();
		rioIndexRegisterInvalidTests();
		//serviceTests();
		//settingsMainTests();
		//redTests();
	});
}

module.exports = coordinateController;