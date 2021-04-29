# Changelog

**Test Status**
* The 'request' and 'front' modes are affected by these changes.
* Test results for both modes are unchanged.

---

**./app/sub-common/files/check-model-integrity.js**
* Removed all requirements except for:
	* commonPaths
	* commonFunctionsFile
* verifyDeviceListRefIntegrity
	* Renamed 'currentErrorDesc' variable to 'currentDesc'
	* Now called publicly as 'checkIntegrity'
* Renamed variables in 'matchCurrentDevice'
	* 'cManufacturerLower' to 'deviceManufacturer'
	* 'cModelLower' to 'deviceModel'
	* 'sManufacturerLower' to 'currentManufacturer'
	* 'sModelLower' to 'currentModel'
	* 'matched' to 'matchFound'
* writeCurrentDeviceDescription
	* Renamed parameter to 'vDevice'
	* Rewrote body to use single variable.
* Replaced `exports` with `module.exports`

---

**./test-parts/**
* Replaced model integrity function call.
	* Before: 'modelIntegrityFile.checkRefIntegrity'
	* After: 'modelIntegrityFile.checkIntegrity'
* Affected files:
	* part-h-api_requests/requests/req-devices_crud.js
	* part-i-frontend/parts/c-get_device_list.js
