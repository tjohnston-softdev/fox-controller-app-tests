# Changelog

**./app/test-common.js**
* Removed functions:
	* checkTrue
	* checkFalse
* Replaced with direct calls to `expect`

---

**Affected Files**
* ./app/
	* sub-common/
		* files/
			* check-model-integrity.js
			* remote-io-invalid_tests.js
			* test-device-common.js
* ./test-parts/
	* part-b-external_modules/
		* modules/
			* pkg-net.js
			* pkg-os.js
			* pkg-request.js
			* pkg-validator.js
	* part-c-internal_scripts/
		* scripts/
			* s-local_valid.js
			* s-request_api.js
		* sub-scripts/
			* common-local_valid.js
			* common-request.js
	* part-e-rio_settings/
		* settings/
			* set-functions.js
	* part-g-controller_files/
		* files/
			* con-device_classes.js
			* con-device_settings.js
			* con-rio_factories.js
			* con-rio_index_main.js
			* con-rio_index_node_list.js
			* con-rio_index_node_reg.js
			* con-rio_index_node_reg_invalid.js
		* sub-files/
			* rio-spy_functions.js
	* part-h-api_requests/
		* requests/
			* req-admin_health.js
			* req-admin_main.js
			* req-devices_crud.js
			* req-storage.js
		* sub-requests/
			* common-api.js
			* common-database.js
			* common-health.js
			* common-storage.js
	* part-i-api_frontend/
		* parts/
			* d-check_device_list.js
			* i-clear_cache.js
		* sub-parts/
			* common-nodes.js
	* part-j-controller_reset/
		* sub-modes/
			* test-restart-return.js

---

**./app/sub-common/files/check-model-integrity.js**
* Added 'chai' requirement.
