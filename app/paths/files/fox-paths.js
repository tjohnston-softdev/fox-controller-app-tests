function defineFoxPaths()
{
	var foxRoot = "../../../../fox-controller-app/";
	var defineRes = {};
	
	defineRes["serviceMainFile"] = foxRoot + "service.main";
	defineRes["settingsFile"] = foxRoot + "settings";
	defineRes["redSettingsFile"] = foxRoot + "node-red-settings";
	defineRes["rioSettingsFile"] = foxRoot + "fox-devices/remote_io/remote_io.settings";
	defineRes["advantechFile"] = foxRoot + "fox-devices/remote_io/advantech.models";
	defineRes["moxaFile"] = foxRoot + "fox-devices/remote_io/moxa.models";
	defineRes["sonoffFile"] = foxRoot + "fox-devices/remote_io/sonoff.models";
	defineRes["deviceSettingsFile"] = foxRoot + "fox-devices/device.settings";
	defineRes["storedDeviceClassFile"] = foxRoot + "fox-devices/_classes/device-model.class";
	defineRes["connectedDeviceClassFile"] = foxRoot + "fox-devices/_classes/device.class";
	defineRes["rioFactoriesFile"] = foxRoot + "fox-devices/remote_io/remote-io.factories";
	defineRes["rioIndexFile"] = foxRoot + "fox-devices/remote_io/remote-io.index";
	defineRes["relativePaths"] = true;
	
	return defineRes;
}



module.exports = defineFoxPaths();