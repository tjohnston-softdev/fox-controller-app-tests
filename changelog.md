# Changelog

**./test-parts/part-i-api_frontend/front-main.js**
* Uncommented 'cCheckListFile' requirement.
* Uncommented 'callCheckList'
* Commented out 'callListAvaliable'

---

**./test-parts/part-i-api_frontend/parts/d-check_device_list.js**
* Removed module requirements:
	* request
	* sinon
	* commonPaths.commonObjects
	* commonPaths.requestApi
* Renamed variables in 'handleCheckDevicesLoop'
	* 'cacheDeviceIndex' to 'loopIndex'
	* 'cacheDeviceElement' to 'currentElement'
	* 'cacheDeviceDescription' to '
* Replaced `exports` with `module.exports`
