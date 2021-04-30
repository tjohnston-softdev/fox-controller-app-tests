# Changelog

**./app/test-common.js**
* Removed functions:
	* checkAbove
	* checkBelow
	* checkLeast
	* checkMost
	* checkZero
	* checkZeroLeast
	* checkWithin
* Replaced with direct calls to `expect` where applicable.

---

**Affected Files**
* ./test-parts/
	* part-b-external_modules/
		* modules/
			* pkg-request.js
	* part-c-internal_scripts/
		* scripts/
			* s-supported_databases.js
	* part-h-api_requests/
		* requests/
			* req-admin_health.js
		* sub-requests/
			* common-health.js
			* common-storage.js
	* part-i-api_frontend/
		* parts/
			* f-check_node_array.js
