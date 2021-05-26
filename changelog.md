# Changelog

**./test/fox-test-main.js**
* 'deviceApiPart' is called directly.

---

**./test-parts/part-h-api_requests/api-main.js**
* Renamed global variables:
	* 'cAdminFile' to 'adminTests'
	* 'cHealthFile' to 'healthTests'
	* 'cAlarmFile' to 'alarmTests'
	* 'cStorageFile' to 'storageTests'
	* 'cDevicesFileCrud' to 'crudTests'
	* 'cDevicesFileCrudInvalid' to 'crudInvalidTests'
	* 'cDevicesFileModifyInvalid' to 'modifyInvalidTests'
* File requirements are called directly inside 'coordinateApiRequests'
* 'coordinateApiRequests' is exported directly.

---

**./test-parts/part-h-api_requests/requests/**
* These functions are exported directly from their respective files:
	* testStorageAPIs (req-storage.js)
	* testAdminApis (req-admin_main.js)
	* testHealthApi (req-admin_health.js)
	* testAlarmApis (req-alarm.js)
	* testDeviceCrudApis (req-devices_crud.js)
	* testDeviceCrudInvalidApis (req-devices_crud_invalid.js)
	* testDeviceModifyInvalidApis (req-devices_modify_invalid.js)
