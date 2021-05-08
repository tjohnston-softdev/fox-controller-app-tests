# Changelog

**./test-parts/part-h-api_requests/api-main.js**
* Uncommented 'cAlarmFile'

---

**./test-parts/part-h-api_requests/requests/req-alarm.js**
* Removed 'sinon' module requirement.
* Replaced 'request' module requirement with 'needle'
* Removed 'alarmFolder' global variable.
	* 'apiPaths.alarmApi' is used directly.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-h-api_requests/requests/req-alarm.js - handleList**
* Removed variables:
	* listRequestReturn
	* listRequestError
* Merged tests into "Request Made"
	* "Request Successful"
	* "Results Read"
* Renamed callback parameters:
	* 'aError' to 'alarmErr'
	* 'aResult' to 'alarmRes'
* Removed 'callReadApiResponseArray'
	* 'alarmRes.body' is used directly.

---

**./test-parts/part-h-api_requests/requests/req-alarm.js - handleAvailable**
* Removed variables:
	* avRequestReturn
	* avRequestError
* Renamed variables:
	* 'avUrl' to 'availabilityUrl'
	* 'avRead' to 'retrievedData'
* Merged tests into "Request Made"
	* "Request Successful"
	* "Results Read"
* Renamed callback parameters:
	* 'aError' to 'alarmErr'
	* 'aResult' to 'alarmRes'
* Removed 'callReadApiResponseArray'
	* 'alarmRes.body' is used directly.
