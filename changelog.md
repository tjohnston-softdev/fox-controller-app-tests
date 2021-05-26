# Changelog

**./test/fox-test-main.js**
* 'settingsPart' is called directly.

---

**./test-parts/part-e-rio_settings/rio-settings-main.js**
* Renamed global variables:
	* 'cRemoteIoSettingsFile' to 'mainTests'
	* 'cRemoteIoPropertiesFile' to 'propertyTests'
	* 'cRemoteIoFunctionsFile' to 'functionTests'
* Required files are called directly inside 'coordinateSettings'
* 'coordinateSettings' is exported directly.

---

**./test-parts/part-e-rio_settings/settings/**
* The following functions are exported directly from their respective files:
	* testRemoteIoProperties (set-props.js)
	* testRemoteIoSettings (set-main.js)
	* testRemoteIoFunctions (set-functions.js)
