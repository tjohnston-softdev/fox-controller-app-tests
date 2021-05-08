# Changelog

**./test-parts/part-h-api_requests/requests/req-storage.js**
* 'testFile' is assigned and declared on the same line.
* Removed the 'handleUserStorageTestPaths' function.
* Removed the "Paths Disposed" test from 'handleUserStorageDelete'

---

**./test-parts/part-h-api_requests/sub-requests/common-storage.js**
* Changes:
	* Renamed variables:
		* 'fsIndex' to 'loopIndex'
		* 'fsObject' to 'currentObject'
* Functions:
	* testDriveTotalArray
	* testDriveUsedArray
	* testDrivePercentagesArray
