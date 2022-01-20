# Changelog

**./test-parts/part-09-api_frontend/parts/04-check_device_list.js**
* 'addCount' in 'handleCheckPrepare' is now validated using 'commonFunctions.testNumber'
* Renamed 'e' variable to 'catchErr' in functions:
	* retrieveListFromCache
	* retrieveCountFromCache

---

**./test-parts/part-09-api_frontend/parts/05-list_nodes.js - testCurrentManufacturerApi**
* Removed 'nodeCommonFile.testArrayProperties' call.
* Removed "Correct Properties" test.

---

**./test-parts/part-09-api_frontend/parts/06-check_node_array.js**
* Changes to 'handleStructure'
	* Removed `expect` checks.
	* Added call to 'commonFunctions.testObject' in "Array Structure"
	* Renamed "Correct Array Structure" test to "Correct Structure"
* Renamed 'e' variable to 'catchErr' in 'callNodeCache'

---

**./test-parts/part-09-api_frontend/parts/07-get_device_properties.js**
* Removed "Correct Properties" test from 'testCurrentDeviceStatus'
* Renamed 'e' variable to 'catchErr' in 'callNodeManufacturerPropertyList'

---

**./test-parts/part-09-api_frontend/parts/08-delete_added_devices.js**
* Renamed 'e' variable to 'catchErr' in 'getAddedDeviceCountFromCache'

---

**./test-parts/part-09-api_frontend/sub/common-nodes.js**
* Removed 'testNodeObjectArrayProperties' function.
* Removed 'arrayFunctions.testAllPropExists' calls from 'testStatusControlArrayStructure'

---

**./test-parts/part-09-api_frontend/sub/common-text.js**
* Compressed text writing code in 'writeDeviceDescriptionString'

---

**./test-parts/part-09-api_frontend/sub/test-device-cache.js - clearCache**
* Renamed 'e' variable to 'clearErr'