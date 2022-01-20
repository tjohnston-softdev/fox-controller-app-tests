# Changelog

**./test-parts/part-08-api_requests/requests/req-storage.js**
* Changes to 'handleFileList'
	* Removed calls to 'arrayFunctions.testAllPropExists'
	* Moved 'arrayFunctions.testAllPropType' calls from "Correct Contents" to "Correct Properties"
* Changes to "Correct Contents" in 'handleGlobalStatus'
	* Removed calls to 'objectFunctions.testPropType'
	* 'statusRead.used' is now validated using 'commonFunctions.testNumber'
	* 'statusRead.use' is now validated using 'commonFunctions.testNumber'
* Commented out call to 'storageCommonFile.testPropertiesObject'
* Renamed "Correct Return Structure" test in 'handleGlobalStatus' to "Object Returned"

---

**./test-parts/part-08-api_requests/sub/common-storage.js**
* Removed 'testDrivePropertiesObject' function.
* Re-wrote expectations in 'testDriveUsedObject'
	* Before: `at.least` and `at.most`
	* After: `within`