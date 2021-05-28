# Changelog

**./test/fox-test-main.js**
* The 'debug' test mode now only calls 'internalPart'

---

**./app/request_api.js**
* Changed public names:
	* 'writeApiUrl' as 'writeUrl'
	* 'readApiResponseArray' as 'readResponseArray'
	* 'readApiResponseObject' as 'readResponseObject'
	* 'readApiResponseError' as 'readResponseError'
	* 'validateApiResponse' as 'validateResponse'
	* 'requestApplicationOnlineResult' as 'getOnlineResult'
	* 'apiRequestRefusedError' as 'showRefusedError'

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api.js**
* Updated references to refer to new function names.
	* This applies to both the script itself and the test descriptions.

---

**./app/sub-common/files/**
* Updated 'request-api' function name references for:
	* http-requests.js
	* test-device-common.js

---

**./test-parts/part-d-online_checks/checks/chk-online.js**
* Updated 'request-api' function name references.

---

**./test-parts/part-h-api_requests/requests/**
* Updated 'request-api' function name references for all of the files in this folder.

---

**./test-parts/part-i-api_frontend/parts/**
* Updated 'request-api' function name references for:
	* a-check_database_empty.js
	* b-add_all_devices.js
	* c-get_device_list.js
	* e-list_avaliable_nodes.js
	* g-get_device_properties.js
	* i-clear_cache.js

---

**./test-parts/part-j-restart_controller/**
* Updated 'request-api' function name references for:
	* All of the files in the 'modes/' subfolder.
	* sub-modes/test-restart-return.js
