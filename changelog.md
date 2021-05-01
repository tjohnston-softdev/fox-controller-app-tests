# Changelog

**Test Status**
* FOX Controller file paths are being read and resolved correctly.
* New file path tests are successful.

---

**./app/paths/files/**
* These files are now exempt from testing:
	* app-paths.js
	* sub-common-paths.js

---

**./app/paths/files/fox-paths.js**
* Added `.js` file extension to the file names for 'defineRes' properties.
* Removed 'relativePaths' result property.

---

**./test-parts/part-a-common_data/items/itm-app_paths.js**
* Added 'fs' requirement.
* Added 'path' requirement.
* Removed 'chai-things' requirement.
* Removed 'sinon' requirement.
* Removed globals:
	* 'relativeTarget' - Merged into 'commonPathsFox'.
	* commonPathsSub
	* propertyListApp
	* propertyListSub
* 'commonPathsFox' is now required directly
	* ../../../app/paths/files/fox-paths
* 'listFile' is now required directly
	* ../sub-items/path-lists
* Changes to 'propertyListFox' global:
	* Now a constant.
	* Assigned inline by calling 'listFile'

---

**./test-parts/part-a-common_data/items/itm-app_paths.js - Removed Functions**
* verifyAppFileExists
* verifyFoxFileExists
* verifySubFileExists
* verifyPropertyListFileExists
* verifyPropertyListsRetrieved
* verifyPropertyListsValid
* verifyPathsValid
* getCommonPathsFile
* getPropertyListFile
* writeArrayError
* writePathError

---

**./test-parts/part-a-common_data/items/itm-app_paths.js - checkPropertyListArray**
* Removed parameters:
	* 'pArray' - Now uses 'propertyListFox'
	* 'aName' - Strings are defined locally.
* Removed 'aErrorString' variable
* Renamed variables:
	* 'currentElementIndex' to 'elementIndex'
	* 'currentElementType' to 'currentType'
	* 'currentElementValid' to 'currentValid'
	* 'overallValid' to 'allElementsValid'
* Declared 'currentValue' variable - Stores element value.
* 'currentType' is assigned using 'currentValue'
* Rewrote loop iteration IF condition for simplicity.
* Removed structures:
	* `if (currentValid !== true)`
	* `if (allElementsValid !== true)`
* Rewrote error message without relying on variables.

---

**./test-parts/part-a-common_data/items/itm-app_paths.js - checkPaths**
* This function has been rewritten from the ground up.
	* Loops through 'propertyListFox' for property names.
	* Reads property from 'commonPathsFox'
	* Checks whether the file actually exists.
	* Uses a generic error message for now.
