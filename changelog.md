# Changelog

**./app/paths/files/app-paths.js**
* Renamed export variables:
	* 'testCommonFull' to 'testCommon'
	* 'getModelsFile' to 'getModels'
	* 'checkModelIntegrityFile' to 'checkModelIntegrity'
	* 'rioCommonFile' to 'rioCommon'
	* 'rioCommonInvalidFile' to 'rioInvalid'
	* 'deviceCommonFile' to 'deviceCommon
	* 'httpRequestsFile' to 'httpRequests'

---

**Affected Files**
* ./app/
	* sub-common/
		* files/
			* check-model-integrity.js
			* http-requests.js
			* remote-io-common.js
			* remote-io-invalid_data.js
			* test-device-common.js
* ./test-parts/
	* part-b-external_modules/
		* modules/
			* pkg-needle.js
			* pkg-os.js
			* pkg-request.js
			* pkg-validator.js
	* part-c-internal_scripts/
		* scripts/
			* s-define_api.js
			* s-local_valid.js
			* s-request_api.js
			* s-request_api_paths.js
			* s-supported_databases.js
		* sub-scripts/
			* common-requests.js
	* part-d-online_checks/
		* checks/
			* chk-online.js
	* part-e-rio_settings/
		* settings/
			* set-functions.js
			* set-main.js
			* set-props.js
	* part-f-controller_models/
		* models/
			* m-model_definitions.js
	* part-g-controller_files/
		* files/
			* con-device_classes.js
			* con-device_settings.js
			* con-rio_factories.js
			* con-rio_index_main.js
			* con-rio_index_node_list.js
			* con-rio_index_node_reg.js
			* con-rio_index_node_reg_invalid.js
			* con-service_main.js
			* con-settings.js
			* con-settings_red.js
		* sub-files/
			* rio-factory_return.js
			* rio-spy_functions.js
	* part-h-api_requests/
		* requests/
			* req-admin_health.js
			* req-admin_main.js
			* req-alarm.js
			* req-devices_crud.js
			* req-devices_crud_invalid.js
			* req-devices_modify_invalid.js
			* req-storage.js
		* sub-requests/
			* common-api.js
			* common-database.js
			* common-storage.js
			* common-health.js
	* part-i-api_frontend/
		* parts/
			* a-check_database_empty.js
			* b-add_all_devices.js
			* c-get_device_list.js
			* d-check_device_list.js
			* e-list_avaliable_nodes.js
			* f-check_node_array.js
			* g-get_device_properties.js
			* h-delete_added_devices.js
			* i-clear_cache.js
		* sub-parts/
			* common-nodes.js
	* part-j-restart_controller/
		* modes/
			* mode-reboot.js
			* mode-restart.js
			* mode-factory_reset.js
		* sub-modes/
			* test-restart-return.js
