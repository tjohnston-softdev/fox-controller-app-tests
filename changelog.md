# Changelog

**./test-parts/part-i-api_frontend/front-main.js**
* Uncommented 'cCheckNodeArrayFile' requirement.
* Uncommented 'callCheckNodeArray'
* Commented out 'callGetDeviceStatus'

---

**./test-parts/part-i-api_frontend/parts/d-check_device_list.js**
* Removed module requirements:
	* request
	* sinon
	* commonPaths.commonObjects
	* commonPaths.requestApi
* handleManufacturerProperties
	* Renamed 'mList' variable to 'manufacturersArray'
* handleDeviceCount
	* Renamed 'nCount' variable to 'retrievedCount'
	* 'retrievedCount' is declared as -1
* Replaced `exports` with `module.exports`
