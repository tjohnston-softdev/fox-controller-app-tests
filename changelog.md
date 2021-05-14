# Changelog

**./test-parts/part-d-online_check/checks/chk-online.js**
* Requirements:
	* Removed 'needle'
	* Added 'commonPaths.httpRequestsFile'
* writeCheckDescription
	* Renamed 'desiredStatus' parameter to 'onReq'
* validateOverallResult
	* Renamed 'resultStatus' parameter to 'actualStatus'

---

**./test-parts/part-d-online_check/checks/chk-online.js - coordinateOnlineCheck**
* Removed the 'reqError' variable.
* reqReturn
	* Assigned during "Application Request"
	* Assigned with httpRequests.defineOutput
* Replaced HTTP request code.
	* Before: 'needle.get'
	* After: 'httpRequests.sendPing'
* Renamed the 'checkReturn' variable to 'retrievedStatus'
