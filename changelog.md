# Changelog

**Test Status**
* All front-end tests so far execute successfully.
* Moxa control error is flagged as expected.
* Fixed bug in which delete result validation is not handled properly.

---

**./test-parts/part-i-api_frontend/parts/g-get_device_properties.js**
* nodeManufacturerArray
	* Moved from global scope to 'getPropertiesLoop'

---

**./test-parts/part-i-api_frontend/parts/h-delete_added_devices.js - deleteCurrentDevice**
* Removed the "Results Read" test.
* httpRequests.checkDeleteResult
	* Replaced 'deleteOutcome' with 'deleteReturn'
* Removed the 'deleteOutcome' variable.
