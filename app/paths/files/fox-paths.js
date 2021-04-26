const foxRootFolder = "../../../../fox-controller-app/";

const serviceMainFilePath = "service.main";
const settingsFilePath = "settings";
const redSettingsFilePath = "node-red-settings";
const rioSettingsFilePath = "fox-devices/remote_io/remote_io.settings";
const advantechFilePath = "fox-devices/remote_io/advantech.models";
const moxaFilePath = "fox-devices/remote_io/moxa.models";
const sonoffFilePath = "fox-devices/remote_io/sonoff.models";
const deviceSettingsFilePath = "fox-devices/device.settings";
const storedDeviceClassFilePath = "fox-devices/_classes/device-model.class";
const connectedDeviceClassFilePath = "fox-devices/_classes/device.class";
const rioFactoriesFilePath = "fox-devices/remote_io/remote-io.factories";
const rioIndexFilePath = "fox-devices/remote_io/remote-io.index";

exports.serviceMainFile = foxRootFolder + serviceMainFilePath;
exports.settingsFile = foxRootFolder + settingsFilePath;
exports.redSettingsFile = foxRootFolder + redSettingsFilePath;
exports.rioSettingsFile = foxRootFolder + rioSettingsFilePath;
exports.advantechFile = foxRootFolder + advantechFilePath;
exports.moxaFile = foxRootFolder + moxaFilePath;
exports.sonoffFile = foxRootFolder + sonoffFilePath;
exports.deviceSettingsFile = foxRootFolder + deviceSettingsFilePath;
exports.storedDeviceClassFile = foxRootFolder + storedDeviceClassFilePath;
exports.connectedDeviceClassFile = foxRootFolder + connectedDeviceClassFilePath;
exports.rioFactoriesFile = foxRootFolder + rioFactoriesFilePath;
exports.rioIndexFile = foxRootFolder + rioIndexFilePath;
exports.relativePaths = true;