# Changelog

**./test-parts/part-e-rio_settings/settings/set-functions.js**
* Removed requirements:
	* sinon
	* ../sub-settings/get-rio-set
* Removed spy testing from these functions:
	* checkGetSignalTypeFunction
	* checkParsePrefixFunction
	* checkParseIndexFunction

---

**./test-parts/part-g-controller_files/files/con-device_settings.js**
* Removed 'sinon' requirement.
* Removed spy testing from these functions:
	* checkScaleDecimalValueFunction
	* checkGetModelFunction

---

**./test-parts/part-g-controller_files/files/con-device_classes.js**
* Removed 'sinon' requirement.
* handleDeviceClasses
	* Removed spy testing.
	* Removed 'storeDeviceInvalid' variable.
* callStoredDeviceUnsupported
	* Declared 'storedDeviceObject' variable. - Consumes function result.
* callConnectedDeviceUnsupported
	* Declared 'connectObject' variable. - Consumes function result.

---

**./test-parts/part-g-controller_files/files/con-rio_factories.js**
* Removed 'sinon' requirement.
* Removed spy testing from 'handleRemoteIoModuleFunction'
