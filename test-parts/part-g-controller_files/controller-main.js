const chai = require("chai");
const expect = require("chai").expect;
const chaiThings = require('chai-things');
const sinon = require('sinon');

function coordinateController()
{
	var cDeviceSettingsFile = require("./files/con-device_settings");
	var cDeviceClassesFile = require("./files/con-device_classes");
	var cRioFactoriesFile = require("./files/con-rio_factories");
	var cRioIndexMainFile = require("./files/con-rio_index_main");
	var cRioIndexNodeListFile = require("./files/con-rio_index_node_list");
	var cRioIndexNodeRegisterFile = require("./files/con-rio_index_node_reg");
	var cRioIndexNodeRegisterInvalid = require("./files/con-rio_index_node_reg_invalid");
	var cServiceMainFile = require("./files/con-service_main");
	var cSettingsMainFile = require("./files/con-settings");
	var cNodeRedMainFile = require("./files/con-settings_red");
	
	describe("G - Controller Files", function()
	{
		cDeviceSettingsFile.callTestDeviceSettings();
		cDeviceClassesFile.callTestDeviceClasses();
		cRioFactoriesFile.callTestRemoteIoFactories();
		cRioIndexMainFile.callTestRemoteIoIndexMain();
		cRioIndexNodeListFile.callTestRemoteIoIndexNodeList();
		cRioIndexNodeRegisterFile.callTestRemoteIoIndexNodeReg();
		cRioIndexNodeRegisterInvalid.callTestRemoteIoIndexRegisterInvalid();
		cServiceMainFile.callTestServiceMain();
		cSettingsMainFile.callTestControllerSettings();
		cNodeRedMainFile.callTestNodeRedSettings();
	});
}

exports.callController = coordinateController;