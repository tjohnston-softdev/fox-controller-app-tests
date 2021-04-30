# Changelog

**./app/test-common.js**
* Removed functions:
	* checkType
	* checkArrayNeutral
* checkAllElements
	* Replaced 'checkType' call with direct call to 'expect'
* Renamed 'checkArray' to 'checkArrayPopulated'

---

**Affected Files**
* ./app/
	* sub-common/
		* files
			* remote-io-common.js
			* remote-io-invalid_tests.js
			* test-device-common.js
	* test-parts/
		* part-b-external_modules/
			* modules/
				* pkg-net.js
				* pkg-os.js
				* pkg-request.js
				* pkg-validator.js
		* part-c-internal_scripts/
			* scripts/
				* s-define_api.js
				* s-local_valid.js
				* s-request_api.js
				* s-request_api_paths.js
				* s-supported-databases.js
			* sub-scripts/
				* common-request.js
		* part-e-rio_settings/
			* settings/
				* set-functions.js
				* set-main.js
				* set-props.js
		* part-f-controller_models/
			* models/
				* m-model_definition.js
				* m-settings_integration.js
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
				* con-settings_red.js
			* sub-files/
				* rio-spy_functions.js
		* part-h-api_requests/
			* requests/
				* req-admin_health.js
				* req-admin_main.js
				* req-devices_crud.js
				* req-storage.js
			* sub-requests/
				* common-storage.js
		* part-i-api_frontend/
			* parts/
				* a-check_database_empty.js
				* b-add_all_devices.js
				* c-get_device_list.js
				* d-check_device_list.js
				* f-check_node_array.js
				* g-get_device_properties.js
				* i-clear_cache.js
			* sub-parts/
				* common-nodes.js
		* part-j-restart_controller/
			* sub-modes/
				* test-restart-return.js
