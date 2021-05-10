# Changelog

### Test Status

**Request**
* Error handling is different between the 'request' and 'needle' HTTP libraries.
	* This stands out for POST requests.
	* Test scripting does not account for these differences yet.

---

### ./test-parts/part-h-api_requests/api-main.js

**Changes**
* Uncommented 'cDevicesFileCrud'

---

### ./test-parts/part-h-api_requests/requests/req-devices_crud.js

**Globals**
* Removed module requirements:
	* sinon
	* commonPaths.commonErrors
* Replaced 'request' module requirement with 'needle'
	* handleDeviceDefaultValues
	* handleBeforeListTest
	* handleCreateDeviceTest
	* handleUpdateAddTest
	* handleReadDeviceTest
	* handleDeviceStatusTest
	* handleUpdateDeviceTest
	* handleUpdateReviewTest
	* handleDeleteFlagTest
	* handleDeleteObjectTest
	* handleUpdateDeleteTest

\
**Test Calls**
* Commented out except for:
	* handleSupportedModels
	* handleDeviceDefaultValues
	* handleBeforeListTest
	* handleCreateDeviceTest

\
**handleSupportedModels**
* Removed "Retrieve Function Called" test.
* Renamed "Retrieve Successful" test to "Retrieved Successfully"

\
**handleDeviceDefaultValues**
* Removed variables:
	* defaultsError
	* defaultsReturn
* Merged these tests into "Request Made"
	* "Request Successful"
	* "Results Read"
* Renamed callback parameters:
	* 'dError' to 'defaultReqErr'
	* 'dResult' to 'defaultReqRes'
* Specific changes to "Supported Device Types"
	* Moved correct device type array to local variable 'correctTypes'
	* Removed 'testAllElements' check.
* Removed 'testAllElements' check from "Manufacturers" and "Models" tests.

\
**handleBeforeListTest**
* Removed variables:
	* beforeListReturn
	* beforeListError
* Merged these tests into "Request Made"
	* "Request Successful"
	* "Results Read"
* Renamed callback parameters:
	* 'listError' to 'folderListErr'
	* 'listResult' to 'folderListRes'
* Removed 'callReadApiResponseArray'
	* 'folderListRes.body' is used directly.

\
**handleCreateDeviceTest**
* Removed variables:
	* createOptions
	* createError
	* createReturn
* Merged these tests into "Request Made"
	* "Request Successful"
	* "Results Read"
* Has result errors.

\
**handleUpdateAddTest**
* Removed variables:
	* addUpdateError
	* addUpdateReturn
* Merged these tests into "Request Made"
	* "Request Successful"
	* "Results Read"
* Removed 'callReadApiResponseArray'
	* 'addListResult.body' is used directly.

\
**handleReadDeviceTest**
* Removed variables:
	* deviceError
	* deviceReturn
* Merged these tests into "Request Made"
	* "Request Successful"
	* "Results Read"

\
**handleDeviceStatusTest**
* Removed variables:
	* statusError
	* statusReturn
* Merged these tests into "Request Made"
	* "Request Successful"
	* "Results Read"
* Renamed callback parameters:
	* 'sError' to 'statusReqErr'
	* 'sResult' to 'statusReqRes'
