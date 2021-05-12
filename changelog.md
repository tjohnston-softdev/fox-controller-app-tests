# Changelog

### ./app/sub-common/files/http-requests.js

**New Primary Functions**
* 'requestGetInvalid' - Sends invalid GET request.
* 'requestPostInvalid' - Sends invalid POST request.
* 'requestPutInvalid' - Sends invalid PUT request.
* 'requestDeleteInvalid' - Sends invalid DELETE request.
* 'requestStatusInvalid' - Sends invalid GET request to Status endpoint.

\
**New Secondary Functions**
* 'handleErrorMessage' - Reads and checks HTTP error message.
* 'handleInvalidStatus' - Reads and checks invalid status result object.
* 'handleInvalidDelete' - Reads and checks invalid delete result object.
	* Called publicly as 'checkDeleteResult'

---

### ./app/sub-common/files/remote-io-invalid_tests.js

**Changes**
* This file is now empty.

---

### ./test-parts/part-h-api_requests/api-main.js

**Uncommented calls**
* cDevicesFileCrudInvalid
* cDevicesFileModifyInvalid

---

### ./test-parts/part-h-api_requests/requests/req-devices_crud_invalid.js

**General**
* Removed requirements:
	* needle
	* commonPaths.rioCommonInvalidFile
* Required 'commonPaths.httpRequestsFile'
* Merged HTTP request code based on separate file.
* Renamed 'postBody' variables to 'invalidBody'

\
**Replaced Function Calls**
* 'sendCreateRequest' with 'httpRequests.postInvalid'
* 'sendReadRequest' with 'httpRequests.getInvalid'
* 'sendStatusRequest' with 'httpRequests.statusInvalid'
* 'sendDeleteRequest' with 'httpRequests.deleteInvalid'

\
**Removed Functions**
* sendCreateRequest
* sendReadRequest
* readInvalidResults
* sendStatusRequest
* sendDeleteRequest

---

### ./test-parts/part-h-api_requests/requests/req-devices_modify_invalid.js

**General**
* Removed requirements:
	* needle
	* commonPaths.rioCommonInvalidFile
* Required 'commonPaths.httpRequestsFile'
* Merged HTTP request code.
* Removed functions:
	* catchModificationError
	* checkModifyTestObjectDeleted

\
**handleCurrentDeviceList**
* Successful GET request.
* Removed the 'listErr' variable.
* 'listResult'
	* Now assigned during "List Request Sent"
	* Assigned with 'httpRequests.defineOutput'
* Moved 'currentDeviceList' assignment to its own test - "Results Read"
* Removed the "List Request Successful" test.

\
**handleTestAdd**
* Successful POST request.
* Removed the 'addResultError' variable.
* addResultReturn
	* Assigned during "Add Request Called"
	* Assigned with 'httpRequests.defineOutput'
* Removed the "Add Request Successful" test.

\
**handleTestGet**
* Successful GET request.
* Removed the 'getError' variable.
* getReturn
	* Assigned during "Get Request Called"
	* Assigned with 'httpRequests.defineOutput'
* Removed the "Get Request Successful" test.

\
**handleInvalidArgumentTests**
* Unsuccessful PUT requests.
* Replaced 'needle.put' with 'httpRequests.putInvalid'

\
**handleUnchangedModifyTest**
* Successful PUT request. (In this case)
* Removed the 'updateReqErr' and 'updateReqRead' variables.
* updateReqReturn
	* Assigned during "Modification Called"
	* Assigned with 'httpRequests.defineOutput'
* Removed 'updateReqReturn' checks from "Modification Passed"

\
**handleUnknown_____ModifyTest**
* Unsuccessful PUT request.
* Removed the 'updateReqErr' and 'updateReqReturn' variables.
* Merged "Modification Called" into "Error Flagged"

\
**handleBadIpAddressModifyTest**
* Unsuccessful PUT request.
* Removed the 'ipUpdateError' and 'ipUpdateReturn' variables.
* Merged "Modification Called" into "Error Flagged"

\
**handleTestDelete**
* Successful DELETE request.
* Removed the 'delOptions' and 'delError' variables.
* delReturn
	* Assigned during "Delete Called"
	* Assigned with 'httpRequests.defineOutput'
* Replaced 'checkModifyTestObjectDeleted' call with 'httpRequests.checkDeleteResult'

\
**handleAfterDeviceList**
* Successful GET request.
* Removed the 'afterListError' variable.
* 'afterListReturn'
	* Assigned during "List Request Sent"
	* Assigned with 'httpRequests.defineOutput'
* Moved 'afterListRead' assignment to its own test - "Results Read"
* Removed the "List Request Successful" test.
