# Changelog

**Test Status**
* Online and offline checking is performed correctly without timeout errors.
* Local Request help functions and their testing remain unchanged as a result of the library transition.

---

**./test/fox-test-main.js**
* Uncommented requirements:
	* internalPart
	* onlinePart
	* settingsPart
	* modelsPart
	* controllerPart

---

**./test-parts/part-b-external_modules/external-main.js**
* Uncommented function calls.

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api.js**
* Removed 'request' module requirement.
* runRequestUrlInvalid
	* Renamed 'iRes' variable to 'invalidUrlRes'
	* Renamed 'foArg' parameter to 'folderArg'
	* Renamed 'fiArg' parameter to 'fileArg'
* runReadResponseInvalidArray
	* Renamed 'iArg' parameter to 'invalidArg'
	* Renamed 'iRes' variable to 'invalidArrayRes'
* runReadResponseInvalidObject
	* Renamed 'iArg' parameter to 'invalidArg'
	* Renamed 'iRes' variable to 'invalidObjectRes'
* runReadResponseInvalidString
	* Renamed 'iArg' parameter to 'invalidArg'
	* Renamed 'iRes' variable to 'invalidStringRes'
* runReadResponseInvalidError
	* Renamed 'iArg' parameter to 'invalidArg'
	* Renamed 'iRes' variable to 'invalidRes'
* runRefuseError
	* Renamed 'reArg' parameter to 'refuseArg'
	* Renamed 'rCompleted' variable to 'refComplete'
	* Renamed 'rMessage' variable to 'refMsg'
* runOptionError
	* Renamed 'oeUrl' parameter to 'urlArg'
	* Renamed 'oeMethod' parameter to 'methodArg'
	* Renamed 'oeBody' parameter to 'bodyArg'
	* Renamed 'oeText' parameter to 'eError'

---

**./test-parts/part-d-online_checks/checks/chk-online.js**
* HTTP request is performed using 'needle' instead of 'request'
* Request is set to time out after 1.75 seconds. (vs. 2 second limit)
* writeCheckDescription
	* Renamed parameter from 'oFlag' to 'desiredStatus'
	* Renamed 'cDesc' variable to 'descRes'
* validateOverallResult
	* Renamed 'expectedOnlineFlag' parameter to 'expectStatus'
	* Renamed 'resultingOnlineFlag' parameter to 'resultStatus'
