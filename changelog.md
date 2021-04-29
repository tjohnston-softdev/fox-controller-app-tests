# Changelog

**Test Status**
* 'common' test mode passes.
* Minor errors in 'local' test mode.
	* Some IP Address validation tests for the 'validator' library fail.
	* Internal script testing passes.
* 'cont' test mode passes.
* 'request' test mode passes.
* 'front' test mode results are unchanged.
* Factory reset is unchanged.

---

**./app/paths/files/app-paths.js**
* Paths are now defined using the function 'defineAppPaths'
	* Public paths are defined inside result object.
* Moved the following globals into 'defineAppPaths'
		* 'testAppFolder' as 'appRoot'
		* 'testCommonFile' as 'testCommonName'
* Replaced `exports` with `module.exports = defineAppPaths();`

---

**./app/paths/files/fox-paths.js**
* Paths are now defined using the function 'defineFoxPaths'
	* Public paths are defined inside result object.
	* Included global variable 'foxRootFolder' as 'foxRoot'
* Replaced `exports` with `module.exports = defineFoxPaths();`

---

**./app/paths/files/sub-common-paths.js**
* Paths are now defined using the function 'defineSubCommonPaths'
	* Public paths are defined inside result object.
	* Included global variable 'subCommonFolder'
* Replaced `exports` with `module.exports = defineSubCommonPaths();`

---

**./app/sub-common/**
* Replaced the following for the files in this folder where applicable:
	* foxRelativeFile' with 'foxRelative'
	* 'commonErrorsFile' with 'commonErrors'
	* 'commonObjectFile' with 'commonObjects'

---

**./test-parts/part-a-common_data/sub-items/path-lists.js**
* getAppPathsArray
	* 'arrayResult' is declared as a blank array.
	* Updated property list to use new names.
	* Removed Try-Catch structure.
	* Added multiple elements in a single `push`
* getFoxPathsArray
	* 'arrayResult' is declared as a blank array.
	* Removed Try-Catch structure.
	* Added multiple elements in a single `push`
* getSubCommonPathsArray
	* 'arrayResult' is declared and populated on a single line.
	* Removed Try-Catch structure.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-a-common_data/items/**
* Replaced 'commonErrorsFile' with 'commonErrors' (common-errors.js)
* Replaced 'commonObjectFile' with 'commonObjects' (common-objects.js)

---

**./test-parts/part-c-internal_scripts/scripts/**
* Replaced 'commonErrorsFile' with 'commonErrors' in files:
	* s-request_api.js
	* s-request_api_paths.js
* Replaced 'supportedDatabasesPath' with 'supportedDatabases' in file:
	* s-supported_databases.js

---

**./test-parts/part-e-rio_settings/**
* Replaced 'foxRelativeFile' with 'foxRelative' for the script files in these folders:
	* settings
	* sub-settings

---

**./test-parts/part-f-controller_models/models/**
* Replaced the following for the files in this folder:
	* 'foxRelativeFile' with 'foxRelative'
	* 'commonObjectFile' with 'commonObjects'

---

**./test-parts/part-g-controller_files/files/**
* Replaced the following for the files in this folder where applicable:
	* 'foxRelativeFile' with 'foxRelative'
	* 'subCommonFile' with 'subCommonRelative'
	* 'commonErrorsFile' with 'commonErrors'
	* 'commonObjectFile' with 'commonObjects'

---

**./test-parts/part-g-controller_files/sub-files/**
* Replaced the following for the files in this folder where applicable:
	* foxRelativeFile' with 'foxRelative'
	* 'commonErrorsFile' with 'commonErrors'
	* 'commonObjectFile' with 'commonObjects'

---

**./test-parts/part-h-api_requests/sub-requests/**
* Replaced the following for the files in this folder where applicable:
	* foxRelativeFile' with 'foxRelative'
	* 'commonErrorsFile' with 'commonErrors'
	* 'commonObjectFile' with 'commonObjects'
	* 'supportedDatabasesPath' with 'supportedDatabases'

---

**./test-parts/part-h-api_requests/requests/**
* Replaced the following for the files in this folder where applicable:
	* 'foxRelativeFile' with 'foxRelative'
	* 'subCommonFile' with 'subCommonRelative'
	* 'commonErrorsFile' with 'commonErrors'
	* 'commonObjectFile' with 'commonObjects'

---

**./test-parts/part-i-frontend/sub-parts/common-nodes.js**
* Replaced the following:
	* 'foxRelativeFile' with 'foxRelative'
	* 'commonErrorsFile' with 'commonErrors'
	* 'commonObjectFile' with 'commonObjects'

---

**./test-parts/part-i-frontend/parts/**
* Replaced the following for the files in this folder where applicable:
	* 'subCommonFile' with 'subCommonRelative'
	* 'commonObjectFile' with 'commonObjects'
