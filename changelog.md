# Changelog

**./test-parts/part-a-common_data/items/itm-app_paths.js**
* Renamed globals:
	* 'commonPathsFox' to 'foxPaths'
	* 'propertyListFox' to 'propertyList'
* Removed '../sub-items/path-lists' requirement.
* 'propertyList' is now assigned using 'writeFoxPropertyNames'
* checkPaths
	* Split 'foxPaths' property value type into its own function 'handlePathType'
	* Removed 'currentType' variable.
	* Declared 'currentStringType' variable - Whether 'currentValue' is a string.
	* Split path validation into its own function 'handleFileExists'
	* Removed 'currentAbsolute' variable.
	* Revised loop IF structures to reflect new error handling.
	* If an element fails, 'allFilesExist' is now set to False.
* handlePathType
	* New function.
	* Validates 'foxPaths' property value type.
	* Must be a non-empty string.
* handleFileExists
	* New function.
	* Checks whether a FOX Controller script file exists.
	* Resolves relative path to absolute.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-a-common_data/sub-items/path-lists.js**
* Removed functions:
	* getAppPathsArray
	* getSubCommonPathsArray
* Moved 'getFoxPathsArray' function into:
	* ../items/itm-app_paths.js
	* Exists as 'writeFoxPropertyNames'
* This file is now empty.
