# Changelog

**./app/test-array.js**
* New file - Functions for checking array objects.
* Split from 'test-common.js'
* Functions are called publicly as 'test_____'

---

**./app/test-common.js**
* Moved functions to 'test-array.js'
	* 'checkArrayPopulated' as 'checkPopulated'
	* 'checkArrayEmpty' as 'checkEmpty'
	* 'checkArrayDynamic' as 'checkDynamic'
	* 'checkAllElements' as 'checkAllType'
* Commented out exports:
	* testArrayPopulated
	* testArrayEmpty
	* testArrayDynamic
	* testAllElements

---

**./app/paths/files/app-paths.js**
* Added property for '../../test-array.js'

---

**Affected Files**
* ./app/
	* sub-common/
		* files/
			* remote-io-common.js
* ./test-parts/
	* part-a-common_data/
		* items/
			* itm-app_paths.js
	* part-c-internal_scripts/
		* scripts/
			* s-define_api.js
			* s-supported_databases.js
		* sub-scripts/
			* common-request.js
	* part-f-controller_models/
		* models/
			* m-model_definitions.js
	* part-g-controller_files/
		* files/
			* con-device_settings.js
			* con-rio_index_main.js
			* con-rio_index_node_list.js
			* con-rio_index_node_reg.js
		* sub-files/
			* rio-spy_functions.js
	* part-h-api_requests/
		* requests/
			* req-admin_health.js
			* req-admin_main.js
			* req-alarm.js
			* req-devices_crud.js
			* req-storage.js
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
