# Changelog

**./test-parts/part-i-api_frontend/sub-parts/test-device-cache.js**
* Added new global variable 'modelsCache'
	* Stores list of supported models.
* Wrote function 'setModels'
	* Used to assign 'modelsCache'
	* Called publicly as 'storeSupportedModels'
* Wrote function 'getModels'
	* Used to retrieve 'modelsCache'
	* Called publicly as 'getSupportedModels'
* Updated 'clearCache' to dispose of 'modelsCache'

---

**./test-parts/part-i-api_frontend/parts/b-add_all_devices.js**
* Changes to 'modelArray' global:
	* Moved declaration to after 'deviceCreateUrl'
	* Is now a variable instead of a constant.
* The 'deviceCreateUrl' global is now a variable and not a constant.
* Renamed functions:
	* 'addPrepare' to 'handlePrepare'
	* 'addModelsLoop' to 'handleModelsLoop'
* Wrote new function 'handleModelStorage'
	* Saves 'modelArray' to 'testCacheFile'
	* Needs to be accessed in 'c-get_device_list.js'
	* Disposes both 'modelArray' and 'deviceCreateUrl'

---

**./test-parts/part-i-api_frontend/parts/c-get_device_list.js**
* Changes to 'modelReferenceArray' global:
	* Is now a variable instead of a constant.
	* Declared as null.
	* Assigned during 'handleRetrieve' with 'testCacheFile.getSupportedModels'
* handleStore
	* Changed main description to "Cache Device List"
	* Renamed "Local Copy Disposed" test to "Local Variables Disposed"
	* Updated "Local Variables Disposed" test to dispose 'modelReferenceArray'
