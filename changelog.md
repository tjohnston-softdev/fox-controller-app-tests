# Changelog

**./test/fox-test-main.js**
* 'controllerPart' is called directly.

---

**./test-parts/part-g-controller_files/controller-main.js**
* Renamed global variables:
	* 'cDeviceSettingsFile' to 'deviceSettingsTests'
	* 'cDeviceClassesFile' to 'classTests'
	* 'cRioFactoriesFile' to 'factoryTests'
	* 'cSettingsMainFile' to 'settingsMainTests'
	* 'cNodeRedMainFile' to 'redTests'
* Renamed variables in 'coordinateController'
	* cRioIndexMainFile' to 'rioIndexMainTests'
	* 'cRioIndexNodeListFile' to 'rioIndexNodeListTests'
	* 'cRioIndexNodeRegisterFile' to 'rioIndexRegisterTests'
	* 'cRioIndexNodeRegisterInvalid' to 'rioIndexRegisterInvalidTests'
	* 'cServiceMainFile' to 'serviceTests'
* All required files are called directly in 'coordinateController'
* 'coordinateController' is exported directly.

---

**./test-parts/part-g-controller_files/files/**
* These functions are exported directly from their respective files:
	* testNodeRedSettings (con-settings_red.js)
	* testControllerSettings (con-settings.js)
	* testServiceMain (con-service_main.js)
	* testDeviceClasses (con-device_classes.js)
	* testDeviceSettings (con-device_settings.js)
	* testRemoteIoFactories (con-rio_factories.js)
	* testRemoteIoIndexMain (con-rio_index_main.js)
	* testRemoteIoIndexNodeList (con-rio_index_node_list.js)
	* testRemoteIoIndexNodeReg (con-rio_index_node_reg.js)
	* testRemoteIoIndexRegisterInvalid (con-rio_index_node_reg_invalid.js)
