# Changelog

**./app/test-common.js**
* Moved functions to 'test-array.js'
	* 'checkPropertyDefinitions' as 'checkAllPropExists'
	* 'checkPropertyContents' as 'checkAllPropType'
	* 'checkPropertyAbsentDefinitions' as 'checkAllPropAbsent'
* Commented out exports:
	* testPropertyDefinitions
	* testPropertyContents
	* testPropertyAbsentDefinitions

---

**./app/test-array.js**
* Added 'chai-things' module requirement.
* See above for new functions.

---

**Affected Files**
* ./app/
	* sub-common/
		* files/
			* remote-io-common.js
* ./test-parts/
	* part-c-internal_scripts/
		* scripts/
			* s-supported_databases.js
		* sub-scripts/
			* common-request.js
	* part-f-controller_models/
		* models/
			* m-model_definitions.js
	* part-h-api_requests/
		* requests/
			* req-admin_health.js
			* req-admin_main.js
			* req-alarm.js
			* req-storage.js
	* part-i-api_frontend/
		* sub-parts/
			* common-nodes.js
