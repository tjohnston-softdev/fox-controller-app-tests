# Changelog

### ./app/sub-common/files/http-requests.js

**New Functions**
* 'requestPostSuccessful' - Sends successful POST request.
* 'requestPutSuccessful' - Sends successful PUT request.
* 'requestDeleteSuccessful' - Sends successful DELETE request.

---

### ./part-h-api_requests/api-main.js

**Changes**
* Uncommented 'cDevicesFileCrud' call.

---

### ./part-h-api_requests/requests/req-devices_crud.js

**General**
* Removed 'needle' module requirement.
* Required 'commonPaths.httpRequestsFile'
* Merged HTTP request code.

\
**handleDeviceDefaultValues**
* Removed the 'reqErr' variable.
* reqReturn
	* Now assigned during "Request Made"
	* Assigned using 'httpRequests.defineOutput'
* Removed the "Request Successful" test.

\
**handleBeforeListTest**
* Renamed the 'beforeListUrl' variable to 'beforeUrl'
* Removed the 'beforeErr' variable.
* beforeReturn
	* Now assigned during "Request Made"
	* Assigned using 'httpRequests.defineOutput'
* Moved the 'rioList' assignment to its own test - "Results Read"
* Removed the "Request Successful" test.

\
**handleCreateDeviceTest**
* First successful POST request.
* Removed the 'createErr' variable.
* createReturn
	* Now assigned during "Request Made"
	* Assigned using 'httpRequests.defineOutput'
* Removed the "Request Successful" test.

\
**handleUpdateAddTest**
* Removed the 'addReqErr' variable.
* addReqReturn
	* Now assigned during "Request Made"
	* Assigned using 'httpRequests.defineOutput'
* Moved the 'addUpdateRead' assignment to its own test - "Results Read"
* Removed the "Request Successful" test.

\
**handleReadDeviceTest, handleDeviceStatusTest**
* Removed the 'reqErr' variable.
* reqReturn
	* Now assigned during "Request Made"
	* Assigned using 'httpRequests.defineOutput'
* Removed the "Request Successful" test.

\
**handleUpdateDeviceTest**
* First successful PUT request.
* Removed variables:
	* modifyOptions
	* modifyError
* modifyReturn
	* Now assigned during "Request Made"
	* Assigned using 'httpRequests.defineOutput'
* Removed the "Request Successful" test.

\
**handleUpdateReviewTest**
* Removed the 'reviewError' variable.
* reviewReturn
	* Now assigned during "Request Made"
	* Assigned using 'httpRequests.defineOutput'
* Removed the "Request Successful" test.

\
**handleDeleteFlagTest**
* First successful DELETE request.
* Removed variables:
	* flagOpts
	* flagError
* flagReturn
	* Now assigned during "Request Made"
	* Assigned using 'httpRequests.defineOutput'
* Removed the "Request Successful" test.

\
**handleDeleteObjectTest**
* Removed variables:
	* deleteOpts
	* deleteError
* deleteReturn
	* Now assigned during "Request Made"
	* Assigned using 'httpRequests.defineOutput'
* Removed the "Request Successful" test.

\
**handleUpdateDeleteTest**
* Removed the 'deleteUpdateError' variable.
* deleteUpdateReturn
	* Now assigned during "Request Made"
	* Assigned using 'httpRequests.defineOutput'
* Moved the 'deleteUpdateRead' assignment to its own test - "Results Read"
* Removed the "Request Successful" test.
