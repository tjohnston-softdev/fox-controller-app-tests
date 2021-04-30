# Changelog

**./app/test-common.js**
* Removed functions:
	* checkPositive
	* checkNegative

---

**./test-parts/part-h-api_requests/sub-requests/common-health.js**
* testHealthEnvironmentValue
	* Replaced 'testNegative' with direct call to 'expect'

---

**./test-parts/part-h-api_requests/sub-requests/common-api.js**
* Replaced 'testPositive' with direct call to 'expect' where applicable.

---

**./test-parts/part-h-api_requests/sub-requests/common-storage.js**
* testDriveTotalObject
	* Replaced 'testPositive' with direct call to 'expect'

---

**./test-parts/part-i-api_frontend/parts/d-check_device_list.js**
* handleCheckPrepare
	* Replaced 'testPositive' with direct call to 'expect'
