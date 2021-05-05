const cDeviceSettingsFile = require("./files/con-device_settings");
const cDeviceClassesFile = require("./files/con-device_classes");
const cRioFactoriesFile = require("./files/con-rio_factories");
const cRioIndexMainFile = require("./files/con-rio_index_main");
const cRioIndexNodeListFile = require("./files/con-rio_index_node_list");
const cRioIndexNodeRegisterFile = require("./files/con-rio_index_node_reg");
const cRioIndexNodeRegisterInvalid = require("./files/con-rio_index_node_reg_invalid");
const cServiceMainFile = require("./files/con-service_main");
const cSettingsMainFile = require("./files/con-settings");
const cNodeRedMainFile = require("./files/con-settings_red");


function coordinateController()
{
	describe("G - Controller Files", function()
	{
		//cDeviceSettingsFile.callTestDeviceSettings();
		cDeviceClassesFile.callTestDeviceClasses();
		/*
		cRioFactoriesFile.callTestRemoteIoFactories();
		cRioIndexMainFile.callTestRemoteIoIndexMain();
		cRioIndexNodeListFile.callTestRemoteIoIndexNodeList();
		cRioIndexNodeRegisterFile.callTestRemoteIoIndexNodeReg();
		cRioIndexNodeRegisterInvalid.callTestRemoteIoIndexRegisterInvalid();
		cServiceMainFile.callTestServiceMain();
		cSettingsMainFile.callTestControllerSettings();
		cNodeRedMainFile.callTestNodeRedSettings();
		*/
	});
}

module.exports =
{
	callController: coordinateController
};