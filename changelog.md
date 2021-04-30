# Changelog

**./app/test-common.js**
* Removed 'checkNull' function.

---

**./test-parts/**
* Replaced `commonFunctionsFile.testNull` with direct call to `expect`
* Affected Files:
	* part-b-external_modules/modules/pkg-request.js
	* part-e-rio_settings/settings/set-functions.js
	* part-g-controller-files/sub-files/rio-spy_functions.js
	* part-g-controller-files/files/
		* con-device_settings.js
		* con-rio_index_node_list.js
		* con-rio_index_node_reg.js
		* con-rio_index_node_reg_invalid.js
	* part-h-api_requests/requests/
		* req-admin_health.js
		* req-admin_main.js
		* req-alarm.js
		* req-devices_crud.js
		* req-devices_crud_invalid.js
		* req-devices_modify_invalid.js
		* req-storage.js
	* part-i-frontend/parts/
		* a-check_database_empty.js
		* b-add_all_devices.js
		* c-get_device_list.js
		* e-list_avaliable_nodes.js
		* g-get_device_properties.js
		* h-delete_added_devices.js
		* i-clear_cache.js
	* part-j-reset_controller/modes/
		* mode-factory_reset.js
		* mode-reboot.js
		* mode-restart.js
