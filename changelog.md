# Changelog

**./test/fox-test-main.js**
* 'commonPart' is called directly.

---

**./test-parts/part-a-common_data/common-main.js**
* Renamed global variables:
	* 'cPathFile' to 'pathTests'
	* 'cObjectFile' to 'objectTests'
	* 'cErrorFile' to 'errorTests'
* Required files are called directly inside 'coordinateCommon'
* 'coordinateCommon' is exported directly.

---

**./test-parts/part-a/common_data/items/**
* itm-common_objects.js
	* Removed the 'und' global variable.
	* 'testCommonObjects' is exported directly.
* itm-common_errors.js
	* 'testCommonErrors' is exported directly.
* itm-app_paths.js
	* 'testCommonPaths' is exported directly.
