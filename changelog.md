# Changelog

**Test Status**
* Offline Controller file testing is successful.
* Controller file lock errors still occur for online testing.
	* When requiring files the conventional way, the Controller files are locked before the test mode is even chosen.
	* We have to reinstate requiring Controller files during testing.
	* This mainly affects Remote IO Index.

---

**./app/sub-common/files/get-models.js**
* 'commonPaths.loadFox' is now required.
* getAllSupportedModels
	* Model definition requirements are now scoped globally using 'loadFoxFile'
	* The try-catch structure remains.
* getManufacturerModels
	* Renamed 'supportedIndex' to 'loopIndex'
	* Replaced 'supportIndex' with 'loopIndex'
	* Renamed 'supportedElement' to 'currentElement'
	* 'currentElement' is now declared as a blank object.
	* 'res' is now declared as a blank object before the loop begins.
	* Removed 'manufacturerArray' variable. Replaced with 'res.manufacturers'
	* Removed 'modelArray' variable. Replaces with 'res.models'
* Replaced `exports` with `module.exports`

---

**./test-parts/part-g-controller_files/files/**
* Changes:
	* 'commonPaths.loadFox' is now required.
	* 'foxPath.rioIndexFile' is now required using 'loadFoxFile'
	* Although the FOX Controller file is required in a safe manner, it is not checked.
* Affected files:
	* con-rio_index_node_list.js
	* con-rio_index_node_reg_invalid.js
