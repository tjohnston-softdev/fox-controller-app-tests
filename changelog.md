# Changelog

**./app/test-common.js**
* Moved functions to 'test-object.js'
	* 'checkObjectPropertyDefinition' as 'checkPropExists'
	* 'checkObjectPropertyContent' as 'checkPropType'
	* 'checkObjectPropertyAbsent' as 'checkPropAbsent'
* Commented out exports:
	* testObjectPropertyDefinition
	* testObjectPropertyContent
	* testObjectPropertyAbsent

---

**Affected Files**
* ./app/
	* sub-common/
		* files/
			* http-requests.js
			* remote-io-common.js
			* test-device-common.js
* ./test-parts/
	* part-a-common_data/
		* items/
			* itm-common_objects.js
	* part-b-external_modules/
		* modules/
			* pkg-needle.js
			* pkg-os.js
			* pkg-validator.js
	* part-c-internal_scripts/
		* scripts/
			* s-define_api.js
			* s-local_valid-general.js
			* s-local_valid-specific.js
			* s-request_api_paths.js
			* s-request_api-other.js
			* s-request_api-responses.js
			* s-request_api-urls.js
			* s-supported-databases.js
		* sub-scripts/
			* common-request.js
	* part-e-rio_settings/
		* settings/
			* set-main.js
			* set-props.js
	* part-f-controller_models/
		* models/
			* m-model_definitions.js
	* part-g-controller_files/
		* files/
			* con-device_classes.js
			* con-device_settings.js
			* con-rio_index_node_reg.js
			* con-service_main.js
			* con-settings.js
		* sub-files/
			* rio-factory_return.js
	* part-h-api_requests/
		* requests/
			* req-admin_health.js
			* req-admin_main.js
			* req-devices_crud.js
			* req-storage.js
		* sub-requests/
			* common-api.js
			* common-health.js
			* common-storage.js
	* part-i-api_frontend/
		* parts/
			* g-get_device_properties.js
	* part-j-restart_controller/
		* sub-modes/
			* test-restart-return.js
