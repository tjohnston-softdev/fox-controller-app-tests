# Changelog

### Test Status

**Request**
* Valid Device CRUD testing is complete.

---

### ./test-parts/part-h-api_requests/requests/req-devices_crud.js

**General**
* Uncommented all test function calls.
* Replaced `exports` with `module.exports`

\
**handleCreateDeviceTest**
* Specified JSON header for request.

\
**handleUpdateAddTest**
* Declared new variables:
	* addReqErr
	* addReqReturn
* Split the callback result checking in "Request Made" to new test "Request Successful"

\
**handleReadDeviceTest, handleDeviceStatusTest**
* Declared new variables:
	* reqErr
	* reqReturn
* Split the callback result checking in "Request Made" to new test "Request Successful"
* Split 'callReadApiResponseObject' to new test "Results Read"

\
**handleUpdateDeviceTest**
* Removed the 'modifyOptions' variable.
* Renamed callback parameters:
	* 'mError' to 'modErr'
	* 'mResult' to 'modRes'
* Added the following to the "Request Successful" test:
	* Object type check to 'modifyReturn'
	* 'callValidateApiResponse' check to 'modifyReturn'
* Removed from "Modifications Stored"
	* 'testPresent' check.
	* Object type check.

\
**handleUpdateReviewTest**
* Added the following to the "Request Successful" test:
	* Object type check to 'reviewReturn'
	* 'callValidateApiResponse' check to 'reviewReturn'

\
**handleDeleteFlagTest**
* Modified 'needle.delete' call to use correct arguments.
* Renamed callback parameters:
	* 'dFlagError' to 'delReqErr'
	* 'dFlagResult' to 'delReqRes'
* Added the following to the "Request Successful" test:
	* Object type check to 'flagReturn'
	* 'callValidateApiResponse' check to 'flagReturn'
* Merged "Correct Return Property" into "Delete Flag Successful"

\
**handleDeleteObjectTest**
* Modified 'needle.delete' call to use correct arguments.
* Renamed callback parameters:
	* 'dError' to 'delReqErr'
	* 'dResult' to 'delReqRes'
* Added the following to the "Request Successful" test:
	* Object type check to 'flagReturn'
	* 'callValidateApiResponse' check to 'flagReturn'
* Merged "Correct Return Property" into "Delete Object Successful"

\
**handleUpdateDeleteTest**
* Added the following to the "Request Successful" test:
	* Object type check to 'deleteUpdateReturn'
	* 'callValidateApiResponse' check to 'deleteUpdateReturn'
* Merged "Results Read" into "Request Successful"
* Removed 'callReadApiResponseArray'
	* 'deleteUpdateReturn.body' is used directly.
