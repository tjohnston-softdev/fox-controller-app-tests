# Changelog

### ./test-parts/part-i-api_frontend/front-main.js

**Changes**
* Uncommented 'cListAvaliableFile' requirement.
* Uncommented 'callListAvaliable'
* Commented out 'callCheckNodeArray'

---

### ./test-parts/part-i-api_frontend/parts/d-check_device_list.js

**Changes**
* Removed module requirements:
	* request
	* sinon
	* commonPaths.commonObjects
* Added requirement for 'commonPaths.httpRequestsFile'
* Fixed main description spelling mistake.
* Replaced `exports` with `module.exports`

\
**listDevicesLoop**
* Renamed variables:
	* 'currentManufacturerIndex' to 'manufacturerIndex'
	* 'currentManufacturerName' to 'currentName'
* 'currentName' is declared as a string.
* Converted `while` loop to `for` loop.

\
**testCurrentManufacturerApi**
* Renamed variables:
	* 'apiRequestUrl' to 'searchURL'
	* 'apiRequestReturn' to 'searchReturn'
	* 'apiRequestRead' to 'searchRead'
* Removed the 'apiRequestError' variable.
* searchReturn
	* Assigned during "Request Made"
	* Assigned using 'httpRequests.defineOutput'
* Replaced 'reqModule' with 'httpRequests.getSuccessful'
* Removed the "Request Successful" test.
* Removed 'callReadApiResponseArray'
	* 'searchRead' is assigned using 'searchReturn.body' directly.
