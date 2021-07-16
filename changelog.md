# Changelog

**./test-parts/part-i-api_frontend/parts/**
* a-check_database_empty.js
	* Removed 'commonPaths.getModels' requirement.
	* Removed 'modelArray' global.
* d-check_device_list.js
	* Removed 'commonPaths.deviceCommon' requirement.
* e-list_avaliable_nodes.js
	* Removed whitespace at the start of 'listDevicesLoop'
* f-check_node_array.js
	* Removed 'commonPaths.requestApiPaths' requirement.
* g-get_device_properties.js
	* Removed string check on 'deviceRead.name' in 'testCurrentDeviceStatus'
* h-delete_added_devices.js
	* Removed 'commonPaths.requestApiPaths' requirement.
	* Removed 'commonPaths.requestApi' requirement
* i-clear_cache.js
	* Removed whitespace in "Cache Cleared Successfully" test.

---

**./test-parts/part-i-api_frontend/sub-parts/**
* common-nodes.js
	* Removed 'commonPaths.foxRelative' requirement.
* common-text.js
	* Renamed 'd' global to 'dash'
