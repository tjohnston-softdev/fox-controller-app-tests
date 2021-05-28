# Changelog

**./test-parts/part-a-common_data/items/itm-app_paths.js**
* Added requirements:
	* ../../../app/paths/files/app-paths
	* appPaths.testCommon
* foxPaths' is required using 'appPaths.foxRelative' instead of a literal string.
* testCommonPaths
	* "Property Array Retrieved" now calls 'testCommon.testArrayPopulated' instead of using chai expectations directly.

---

**./test-parts/part-a-common_data/items/itm-common_objects.js**
* Added 'commonPaths.testCommon' requirement.
* testObjectType
	* Merged 'undefined' and 'null' checks into 'testCommon.testPresent'
* Removed 'testString' function
	* Replaced calls with 'testCommon.testString'
* Rewrote 'testObjectProperty' to use 'testCommon' functions.

---

**./test-parts/part-a-common_data/items/itm-common_errors.js**
* Added 'commonPaths.testCommon' requirement.
* Rewrote 'testStringProperty' to use 'testCommon.testString'
