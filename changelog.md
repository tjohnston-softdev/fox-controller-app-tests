# Changelog

**Test Status**
* Device API test results match between both controller builds.

---

**./test-parts/part-h-api_requests/api-main.js**
* All requirement calls are commented out except for:
	* crudTests
	* crudInvalidTests
	* modifyInvalidTests

---

**./test-parts/part-h-api_requests/sub-requests/common-storage.js**
* defineUserStoragePaths
	* Reverted 'localFolder' to original value.
