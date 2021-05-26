function defineFoxPaths()
{
	var useEmulator = true;
	var foxRoot = getFoxRoot(useEmulator);
	var defineRes = {};
	
	defineRes["serviceMainFile"] = foxRoot + "service.main.js";
	defineRes["settingsFile"] = foxRoot + "settings.js";
	defineRes["redSettingsFile"] = foxRoot + "node-red-settings.js";
	defineRes["rioSettingsFile"] = foxRoot + "fox-devices/remote_io/remote_io.settings.js";
	defineRes["advantechFile"] = foxRoot + "fox-devices/remote_io/advantech.models.js";
	defineRes["moxaFile"] = foxRoot + "fox-devices/remote_io/moxa.models.js";
	defineRes["sonoffFile"] = foxRoot + "fox-devices/remote_io/sonoff.models.js";
	defineRes["deviceSettingsFile"] = foxRoot + "fox-devices/device.settings.js";
	defineRes["storedDeviceClassFile"] = foxRoot + "fox-devices/_classes/device-model.class.js";
	defineRes["connectedDeviceClassFile"] = foxRoot + "fox-devices/_classes/device.class.js";
	defineRes["rioFactoriesFile"] = foxRoot + "fox-devices/remote_io/remote-io.factories.js";
	defineRes["rioIndexFile"] = foxRoot + "fox-devices/remote_io/remote-io.index.js";
	
	return defineRes;
}


function getFoxRoot(foxEmu)
{
	var pathRes = "";
	
	if (foxEmu === true)
	{
		pathRes = "../../../../fox-controller-app/";
	}
	else
	{
		pathRes = "../../../../original/fox-controller-app/";
	}
	
	return pathRes;
}



module.exports = defineFoxPaths();