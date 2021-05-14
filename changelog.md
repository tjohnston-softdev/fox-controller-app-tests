# Changelog

**Test Status**
* All three reset modes pass.
* HTTP request code needs to be merged for factory reset.
* Delay trigger code needs to be merged.

---

**./app/sub-common/files/http-requests.js**
* Added 'statusCode' property to 'defineOutputObject'
* Wrote new function 'sendApplicationPing'
	* Sends GET request to Controller root URL.
	* If there is no response within 1.75 seconds, the Controller is offline.
	* Called publicly as 'sendPing'
* 'outputObject.statusCode' is set for these functions:
	* requestGetSuccessful
	* requestPostSuccessful
	* requestPutSuccessful
	* requestDeleteSuccessful
	* sendApplicationPing

---

**./test/fox-test-main.js**
* Uncommented 'processPart' requirement.

---

**./test-parts/part-j-restart_controller/restart-main.js**
* Removed module requirements:
	* chai
	* chai-things
	* sinon
* File requirements are now global and not function-based.
* Replaced `exports` with `module.exports`

---

**./test-parts/part-j-restart_controller/sub-modes/offline-check-delay.js**
* Only contains `module.exports = 1000;`
	* Exports millisecond value directly.

---

**./test-parts/part-j-restart_controller/sub-modes/test-restart-return.js**
* Removed module requirements:
	* chai-things
	* sinon
* testProcessReturnObject
	* Removed 'testObjectPropertyContent' check on 'success' property.
	* Renamed 'procRetObj' parameter to 'procObj'
* Replaced `exports` with `module.exports`

---

**./test-parts/part-j-restart_controller/modes/mode-restart.js**
* Removed module requirements:
	* sinon
	* request
* Renamed the 'delayFile' global variable to 'delayLength'
* Required 'commonPaths.httpRequestsFile'
* Renamed 'handleProcessRestart' variables:
	* 'processRestartReturn' to 'processReturn'
	* 'processRestartRead' to 'processRead'
* Removed 'processRestartError' variable from 'handleProcessRestart'
* 'processReturn' in 'handleProcessRestart'
	* Assigned during "Restart Request Made"
	* Assigned with 'httpRequests.defineOutput'
* 'handleProcessRestart' HTTP request code:
	* Before: 'reqModule.post'
	* After: 'httpRequests.postSuccessful'
* Removed "Request Successful" test from 'handleProcessRestart'
* handleProcessWait
	* Replaced 'delayFile.delayValue' with 'delayLength'
	* Test descriptions are re-worded as a countdown.
* 'processOfflineReturn' in 'handleProcessOfflineCheck'
	* Renamed to 'pingReturn'
	* Assigned during "Offline Check Sent"
	* Assigned with 'httpRequests.defineOutput'
* 'handleProcessOfflineCheck' HTTP request code.
	* Before: reqModule
	* After: 'httpRequests.sendPing'
* Replaced `exports` with `module.exports`

---

**./test-parts/part-j-restart_controller/modes/mode-reboot.js**
* Removed module requirements:
	* sinon
	* request
* Renamed the 'delayFile' global variable to 'delayLength'
* Required 'commonPaths.httpRequestsFile'
* Removed 'foxRestartError' variable from 'handleFoxRestart'
* 'foxRestartReturn' in 'handleFoxRestart'
	* Assigned during "Restart Request Made"
	* Assigned with 'httpRequests.defineOutput'
* Replaced 'handleFoxRestart' HTTP request code:
	* Before: 'reqModule.post'
	* After: 'httpRequests.postSuccessful'
* Removed the "Request Successful" test from 'handleFoxRestart'
* handleFoxWait
	* Replaced 'delayFile.delayValue' with 'delayLength'
	* Test descriptions are re-worded as a countdown.
* 'foxOfflineReturn' in 'handleFoxOfflineCheck'
	* Assigned during "Offline Check Sent"
	* Assigned with 'httpRequests.defineOutput'
* Replaced 'handleFoxOfflineCheck' HTTP request code:
	* Before: 'reqModule'
	* After: 'httpRequests.sendPing'
* Replaced `exports` with `module.exports`

---

**./test-parts/part-j-restart_controller/modes/mode-factory_reset.js**
* Removed module requirements:
	* sinon
	* request
* Added module requirements:
	* needle
	* commonPaths.httpRequestsFile
* Renamed global variables:
	* 'delayFile' to 'delayLength'
	* 'osModule' to 'os'
	* 'factoryResetRequestReturn' to 'factoryReturn'
	* 'factoryResetRequestError' to 'factoryError'
* handleFactoryReset
	* Replaced 'reqModule.post' with 'needle.post'
* handleFactoryDelay
	* Replaced 'delayFile.delayValue' with 'delayLength'
	* Test descriptions are re-worded as a countdown.
* handleFactoryOfflineCheck
	* Replaced 'reqModule' with 'httpRequests.sendPing'
	* 'factoryOfflineReturn' is assigned with 'httpRequests.defineOutput'
* Replaced `exports` with `module.exports`
