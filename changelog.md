# Changelog

**Test Status**
* Storage API test results match between both controller builds.

---

**./test-parts/part-h-api_requests/api-main.js**
* Uncommented 'storageTests' call.

---

**./test-parts/part-h-api_requests/sub-requests/common-storage.js**
* defineUserStoragePaths
	* 'localFolder' is now set to the ORIGINAL build's user storage path.
	* This is just a temporary fix.
