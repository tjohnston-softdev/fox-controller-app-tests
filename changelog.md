# Changelog

**Test Status**
* When running the 'request' test mode, some file access related errors still occur.

---

**./app/paths/files/sub-common-paths.js**
* Merged into 'app-paths.js'
* This file is now empty.

---

**./app/paths/files/app-paths.js**
* Removed 'subCommonRelative' property.
---

**Affected Files**
* ./test-parts/
	* part-g-controller_files/files/
		* con-device_classes.js
		* con-rio_factories.js
		* con-rio_index_node_list.js
		* con-rio_index_node_reg.js
		* con-rio_index_node_reg_invalid.js
	* part-h-api_requests/requests/
		* req-devices_crud.js
		* req-devices_crud_invalid.js
		* req-devices_modify_invalid.js
	* part-i-api_frontend/parts/
		* a-check_database_empty.js
		* b-add_all_devices.js
		* c-get_device_list.js
		* d-check_device_list.js
		* e-list_avaliable_nodes.js
		* f-check_node_array.js
		* g-get_device_properties.js
		* h-delete_added_devices.js
