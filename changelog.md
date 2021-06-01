# Changelog

**Test Status**
* Admin Health API test results match between both controller builds.

---

**./test-parts/part-h-api_requests/requests/req-admin_health.js - handleNetwork**
* Rewrote the contents of the "Internal Flag" test into its own function 'testNetworkInternal'
	* Each network object is tested in a loop.
	* If the 'internal' property exists, it must be a boolean.
	* Otherwise, it is skipped without error.

---

**./test-parts/part-h-api_requests/sub-requests/common-storage.js - testDriveTotalObject**
* Removed variables:
	* windowsUsed
	* targetType
* 'preparedSize' is assigned directly by parsing 'driveObj.size' as a float.
* Removed the IF structure.
* Removed 'driveObj.size' type check.
