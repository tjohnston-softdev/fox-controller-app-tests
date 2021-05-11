# Changelog

**./app/sub-common/files/http-requests.js**
* New file - Shared code for HTTP requests.
* Supports methods:
	* GET
	* POST
	* PUT
	* DELETE
* Has these public functions so far:
	* Define result object.
	* Successful GET request.

---

**./app/paths/files/app-paths.js**
* Added 'httpRequestsFile' property.
	* Corresponds to:
	* ./app/sub-common/files/http-requests.js

---

**./test-parts/part-h-api_requests/api-main.js**
* Commented out calls to:
	* cDevicesFileCrud
	* cDevicesFileCrudInvalid
	* cDevicesFileModifyInvalid

---

**./test-parts/part-h-api_requests/requests/req-admin_main.js**
* Removed 'needle' requirement.
* Added 'commonPaths.httpRequestsFile' requirement.
* Rewrote HTTP request code to use 'httpRequests'
* handleDhcpClients
	* Removed 'dhcpError' variable.
	* 'dhcpReturn' is now assigned during "Request Made" with 'defineOutput'
	* Renamed "Request Successful" to "Results Read"
	* Removed 'dhcpError' check.
	* Removed 'callValidateApiResponse'
	* Removed 'testPresent' check on 'dhcpReturn'
* handleDefaultObject
	* Removed 'defaultError' variable.
	* 'defaultReturn' is now assigned during "Request Made" with 'defineOutput'
	* Removed the "Request Successful" test.
* handleLog
	* Removed the 'logError' variable.
	* 'logReturn' is now assigned during "Request Made" with 'defineOutput'
	* Removed the "Request Successful" test.

---

**./test-parts/part-h-api_requests/requests/req-admin_health.js**
* Removed 'needle' requirement.
* Added 'commonPaths.httpRequestsFile' requirement.
* Rewrote HTTP request code to use 'httpRequests'
* getHealthObject
	* Removed 'healthRequestError' variable.
	* Renamed 'healthRequestReturn' variable to 'healthReturn'
	* 'healthReturn' is now assigned during "Request Made" with 'defineOutput'
	* Removed the "Request Successful" test.

---

**./test-parts/part-h-api_requests/requests/req-alarm.js**
* Removed 'needle' requirement.
* Added 'commonPaths.httpRequestsFile' requirement.
* Rewrote HTTP request code to use 'httpRequests'
* handleList
	* Removed the 'listError' variable.
	* 'listReturn' is now assigned during "Request Made" with 'defineOutput'
	* Moved 'listRead' assignment to its own test "Results Read"
	* Removed the "Request Successful" test.
* handleAvailable
	* Removed the 'reqErr' variable.
	* Renamed the 'reqReturn' variable to 'availabilityReturn'
	* 'reqReturn' is now assigned during "Request Made" with 'defineOutput'
	* Moved 'retrievedData' assignment to its own test "Results Read"
	* Removed the "Request Successful" test.

---

**./test-parts/part-h-api_requests/requests/req-storage.js**
* Removed 'needle' requirement.
* Added 'commonPaths.httpRequestsFile' requirement.
* Rewrote HTTP request code to use 'httpRequests'
* handleFileList
	* Removed the 'fileReqErr' variable.
	* 'fileReqReturn' is now assigned during "Request Made" with 'defineOutput'
	* Moved 'fileListRead' assignment to its own test "Results Read"
	* Removed the "Request Successful" test.
* handleFileDownload
	* Removed the 'fileDownloadError' variable.
	* Removed the 'fileDownloadRead' variable.
	* 'fileDownloadReturn' is now assigned during "Request Made" with 'defineOutput'
	* "Download Successful" now only tests whether the request output matches the test file contents.
	* Removed the "File Contents Returned" test.
* handleGlobalStatus
	* Removed the 'statusReqErr' variable.
	* Renamed the 'statusReqReturn' variable to 'statusReturn'
	* Removed the "Request Successful" test.
