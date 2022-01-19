# Changelog

**./test-parts/01-common_data/items/itm-common_objects.js**
* Added requirement for 'commonPaths.testArray'
* Removed the 'testObjectProperty' function.
* Changes to 'handleDeviceObject'
	* Removed calls to 'testObjectProperty'
	* 'deviceObj.isEnabled' is validated using 'testCommon.testBoolean'
* Changes to 'handleRegisterNodeObject'
	* Removed calls to 'testObjectProperty'
	* Placeholders for X and Y property validation.
	* 'wires.array' is validated using 'testArray.testNeutral'
