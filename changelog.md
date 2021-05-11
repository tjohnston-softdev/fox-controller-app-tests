# Changelog

### ./test-parts/part-h-api_requests/api-main.js

**Changes**
* All test files uncommented.

---

### ./test-parts/part-h-api_requests/requests/req-devices_modify_invalid.js

**General**
* Removed requirements:
	* sinon
	* request
	* ../sub-requests/common-api
* Removed global variables:
	* deviceFolder
	* deviceRio
* Required 'needle' module.
* HTTP requests are now performed using 'needle'
* Removed the 'getUpdateRequestOptions' function.
* Replaced `exports` with `module.exports`

\
**handleCurrentDeviceList**
* Renamed variables:
	* 'currentListError' to 'listErr'
	* 'currentListResult' to 'listResult'
* Added the following to "List Request Successful"
	* 'listResult' object type check.
	* 'callValidateApiResponse' on 'listResult'
* Merged "List Read" into "List Request Successful"
* Removed 'callReadApiResponseArray'
	* 'listResult.body' is used directly.

\
**handleTestAdd**
* Renamed callback parameters:
	* 'cCallbackError' to 'callbackError'
	* 'cCallbackResult' to 'callbackResult'
* Renamed tests:
	* "Add Called" to "Add Request Called"
	* "Add Successful" to "Add Request Successful"
* Added the following to "Add Request Successful"
	* 'addResultReturn' object type check.
	* 'callValidateApiResponse' on 'addResultReturn'
* Moved 'callReadApiResponseObject' to its own test "Results Read"
* Moved the following to separate test "Device Added"
	* callTestFrontendAddSuccessful
	* 'addKey' assignment.
	* 'callTestFrontendAddIdValid' on 'addKey'
* Removed the 'addOptions' variable.

\
**handleTestGet**
* Moved 'getOriginal' assignment to its own test:
	* "Test Object Defined"
* Renamed callback parameters:
	* 'gCallbackError' to 'callbackError'
	* 'gCallbackResult' to 'callbackResult'
* Renamed tests:
	* "Get Called" to "Get Request Called"
	* "Get Successful" to "Get Request Successful"
* Added the following to "Get Request Successful"
	* 'getReturn' object type check.
	* 'callValidateApiResponse' on 'getReturn'
* Moved 'callReadApiResponseObject' to its own test "Results Read"
* Moved 'checkModifyTestObjectGet' in "Get Request Successful"
	* Now has its own test: "Retrieved Object Valid"

\
**handleInvalidArgumentTests**
* New function - Merges these tests:
	* handleNullModifyTest
	* handleInvalidArgumentModifyTest

\
**handleUnchangedModifyTest**
* Removed 'ucUpdateOptions' variable.
* Renamed callback parameters:
	* 'mCallbackError' to 'callbackError'
	* 'mCallbackResult' to 'callbackResult'
* Renamed variables:
	* 'ucUpdateError' to 'updateReqErr'
	* 'ucUpdateReturn' to 'updateReqReturn'
	* 'ucUpdateRead' to 'updateReqRead'
* Added the following to "Modification Passed"
	* 'updateReqReturn' object type check.
	* 'callValidateApiResponse' on 'updateReqReturn'

\
**handleUnknownIdModifyTest**
* Removed 'unknownIdUpdateOptions' variable.
* Renamed callback parameters:
	* 'mCallbackError' to 'callbackError'
	* 'mCallbackResult' to 'callbackResult'
* Renamed variables:
	* 'unknownIdObject' to 'invalidEntry'
	* 'unknownIdUpdateError' to 'updateReqErr'
	* 'unknownIdUpdateReturn' to 'updateReqReturn'

\
**handleUnknownDeviceTypeModifyTest**
* Removed 'unknownTypeUpdateOptions' variable.
* Renamed callback parameters:
	* 'mCallbackError' to 'callbackError'
	* 'mCallbackResult' to 'callbackResult'
* Renamed variables:
	* 'unknownTypeObject' to 'invalidEntry'
	* 'unknownTypeUpdateError' to 'updateReqErr'
	* 'unknownTypeUpdateReturn' to 'updateReqReturn'

\
**handleUnknownManufacturerModifyTest**
* Removed 'unknownManufacturerUpdateOptions' variable.
* Renamed callback parameters:
	* 'mCallbackError' to 'callbackError'
	* 'mCallbackResult' to 'callbackResult'
* Renamed variables:
	* 'unknownManufacturerObject' to 'invalidEntry'
	* 'unknownManufacturerUpdateError' to 'updateReqErr'
	* 'unknownManufacturerUpdateReturn' to 'updateReqReturn'

\
**handleUnknownModelModifyTest**
* Removed 'unknownModelUpdateOptions' variable.
* Renamed callback parameters:
	* 'mCallbackError' to 'callbackError'
	* 'mCallbackResult' to 'callbackResult'
* Renamed variables:
	* 'unknownModelObject' to 'invalidEntry'
	* 'unknownModelUpdateError' to 'updateReqErr'
	* 'unknownModelUpdateReturn' to 'updateReqReturn'

\
**handleBadIpAddressModifyTest**
* Removed 'ipUpdateOptions' variable.
* Renamed callback parameters:
	* 'mCallbackError' to 'callbackError'
	* 'mCallbackResult' to 'callbackResult'

\
**handleTestDelete**
* Renamed callback parameters:
	* 'dCallbackError' to 'callbackError'
	* 'dCallbackResult' to 'callbackResult'

\
**handleAfterDeviceList**
* Renamed callback parameters:
	* 'afterListCallbackError' to 'afterErr'
	* 'afterListCallbackReturn' to 'afterRes'
* Added the following to "List Request Successful"
	* 'afterListReturn' object type check.
	* 'callValidateApiResponse' on 'afterListReturn'
* Merged "List Read" into "List Request Successful"
	* 'afterListReturn.body' is used directly.

\
**catchModificationError**
* Renamed 'modifyFunctionReturn' parameter to 'modifyReturnObject'
* Added check whether 'modifyReturnObject' is an object.
* Removed 'extractedMessage' checks:
	* testPresent
	* testString
