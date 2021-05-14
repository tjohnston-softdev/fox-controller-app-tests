# Changelog

**Test Status**
* "Get Device Properties" tests are not executing at the moment.
* This might be because the cache is accessed when the program begins and not after it has been populated.

---

**./app/sub-common/files/test-device-common.js**
* Removed the 'testFrontendDeleteSuccessful' function.
	* Replaced by 'handleInvalidDelete' in 'http-requests.js'
* Removed 'chai-things' module requirement.

---

**./test-parts/part-i-api_frontend/front-main.js**
* Uncommented 'cDeleteDevicesFile' requirement.
* Uncommented 'callDeleteDevices'
* Commented out 'callClearCache'

---

**./test-parts/part-i-api_frontend/parts/h-delete_added_devices.js**
* Removed module requirements:
	* sinon
	* request
	* commonPaths.commonObjects
* Added requirement for 'commonPaths.httpRequestsFile'
* Renamed variables in 'deleteDevicesLoop'
	* 'addedDeviceCount' to 'deviceCount'
	* 'addedDeviceIndex' to 'deviceIndex'
	* 'currentAddedDevice' to 'currentDevice'
	* 'currentAddedDescription' to 'currentDesc'
* Renamed variables in 'deleteCurrentDevice'
	* 'deviceDeleteUrl' to 'deleteURL'
	* 'deviceDeleteReturn' to 'deleteReturn'
	* 'deviceDeleteRead' to 'deleteOutcome'
* Removed variables from 'deleteCurrentDevice'
	* deviceDeleteOptions
	* deviceDeleteError
* 'deleteReturn' in 'deleteCurrentDevice'
	* Assigned during "Request Made"
	* Assigned with 'httpRequests.defineOutput'
* Replaced HTTP request call:
	* Before: 'reqModule.delete'
	* After: 'httpRequests.deleteSuccessful'
* Removed the "Request Successful" test from 'deleteCurrentDevice'
* Replaced delete result validation.
	* Before: 'deviceCommon.callTestFrontendDeleteSuccessful'
	* After 'httpRequests.checkDeleteResult'
* Replaced `exports` with `module.exports`
