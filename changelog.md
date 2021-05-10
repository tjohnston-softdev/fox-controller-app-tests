# Changelog

**./app/request-api.js - validateApiResponse**
* New function - Used to check whether a HTTP request was successful.
* If the status code is 200, the request is successful.
* Otherwise, the error text will be extracted from HTML and thrown.
* Public name: 'callValidateApiResponse'

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api.js**
* Wrote new functions:
	* checkRequestResponseValidation
	* runValidateResponseInvalid
* Added status code argument to existing 'createReplyObject' calls.
	* 'emptyReplyObject' - 200
	* 'checkRequestResponseArray' - 200
	* 'checkRequestResponseObject' - 200
	* 'checkRequestResponseString' - 200
	* 'checkRequestResponseError' - 500

---

**./test-parts/part-c-internal_scripts/sub-scripts/common-request.js**
* createRequestReplyObject
	* Renamed 'bContent' parameter to 'rBody'
	* Added new parameter 'rStatus' - HTTP status code.
	* Renamed result variable to 'replyRes'
	* Added 'statusCode' result property.
	* 'replyRes' is declared as a blank object.
	* 'replyRes' properties are defined individually.

---

**./test-parts/part-h-api_requests/requests/req-admin_main.js - handleDhcpClients**
* Declared variables:
	* dhcpError
	* dhcpReturn
* Split the callback result checking in "Request Made" to new test "Request Successful"

---

**./test-parts/part-h-api_requests/requests/req-admin_main.js - handleDefaultObject**
* Declared variables:
	* defaultError
	* defaultReturn
* Split the callback result checking in "Request Made" to new test "Request Successful"
* Split 'callReadApiResponseObject' to new test "Results Read"

---

**./test-parts/part-h-api_requests/requests/req-admin_main.js - handleDefaultObject**
* Declared variables:
	* logError
	* logReturn
* Split the callback result checking in "Request Made" to new test "Request Successful"
* Split 'callReadApiResponseObject' to new test "Results Read"

---

**./test-parts/part-h-api_requests/requests/req-admin_health.js - getHealthObject**
* Declared variables:
	* healthRequestError
	* healthRequestReturn
* Split the callback result checking in "Request Made" to new test "Request Successful"
* Split 'callReadApiResponseObject' to new test "Results Read"

---

**./test-parts/part-h-api_requests/requests/req-alarm.js - handleList**
* Declared variables:
	* listError
	* listReturn
* Removed commented out 'callReadApiResponseArray'
* Split the callback result checking in "Request Made" to new test "Request Successful"

---

**./test-parts/part-h-api_requests/requests/req-alarm.js - handleAvailable**
* Declared variables:
	* reqErr
	* reqReturn
* Removed commented out 'callReadApiResponseArray'
* Split the callback result checking in "Request Made" to new test "Request Successful"

---

**./test-parts/part-h-api_requests/requests/req-storage.js - handleFileList**
* Declared variables:
	* fileReqErr
	* fileReqReturn
* Split the callback result checking in "Request Made" to new test "Request Successful"

---

**./test-parts/part-h-api_requests/requests/req-storage.js - handleFileDownload**
* Added to "Download Successful" test:
	* 'fileDownloadReturn' object type check.
	* 'callValidateApiResponse' on 'fileDownloadReturn'

---

**./test-parts/part-h-api_requests/requests/req-storage.js - handleGlobalStatus**
* Declared variables:
	* statusReqErr
	* statusReqReturn
* Split the callback result checking in "Request Made" to new test "Request Successful"
* Split 'callReadApiResponseObject' to new test "Results Read"

---

**./test-parts/part-h-api_requests/requests/req-devices_crud.js - handleDeviceDefaultValues**
* Declared variables:
	* reqErr
	* reqReturn
* Split the callback result checking in "Request Made" to new test "Request Successful"
* Split 'callReadApiResponseObject' to new test "Results Read"

---

**./test-parts/part-h-api_requests/requests/req-devices_crud.js - handleBeforeListTest**
* Declared variables:
	* beforeErr
	* beforeReturn
* Split the callback result checking in "Request Made" to new test "Request Successful"

---

**./test-parts/part-h-api_requests/requests/req-devices_crud.js - handleCreateDeviceTest**
* Declared variables:
	* createErr
	* createReturn
* Split the callback result checking in "Request Made" to new test "Request Successful"
* Split 'callReadApiResponseObject' to new test "Results Read"
