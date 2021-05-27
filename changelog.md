# Changelog

**./test/fox-test-main.js**
* 'frontendPart' is called directly.

---

**./test-parts/part-i-api_frontend/front-main.js**
* Renamed global variables:
	* 'cListEmptyFile' to 'checkDatabaseEmpty'
	* 'cAddDevicesFile' to 'addAllDevices'
	* 'cGetListFile' to 'getDeviceList'
	* 'cCheckListFile' to 'checkDeviceList'
	* 'cListAvaliableFile' to 'listNodes'
	* 'cCheckNodeArrayFile' to 'checkNodes'
	* 'cGetDeviceStatusFile' to 'getDevProps'
	* 'cDeleteDevicesFile' to 'deleteAddedDevices'
	* 'cClearCacheFile' to 'clearCache'
* Required files are called directly in 'coordinateFrontendTesting' onwards.
* 'coordinateFrontendTesting' is exported directly.

---

**./test-parts/part-i-api_frontend/parts/**
* These functions are exported directly from their respective files:
	* testNodeDatabaseEmptyApi (a-check_database_empty.js)
	* testNodeAddApis (b-add_all_devices.js)
	* testNodeGetListApi (c-get_device_list.js)
	* testNodeCheckListApi (d-check_device_list.js)
	* testNodeListAvaliableApi (e-list_avaliable_nodes.js)
	* testNodeArrayCheckApi (f-check_node_array.js)
	* testNodeDevicePropertiesApi (g-get_device_properties.js)
	* testNodeDeleteAddedDevicesApi (h-delete_added_devices.js)
	* testNodeClearCacheApi (i-clear_cache.js)
