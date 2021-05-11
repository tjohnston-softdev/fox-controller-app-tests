# Changelog

**./app/request-api.js - getRequestOptionsObject**
* Removed function.

---

**./app/request-api.js - getDeleteOptionsObject**
* Removed 'permType' variable.
	* True and False are used directly in the `if` condition.
* Renamed 'dRes' to 'optionsRes'
* 'optionsRes' is now declared as a blank object.
* Added 'json' result property.
	* Set to true.
	* This is a holdover from 'getRequestOptionsObject'
* Removed 'dLink' parameter.
* Renamed 'dPerm' parameter to 'permVal'
* Removed `dRes = null;`
* Changed "Content-Type" property to "content_type"

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api.js**
* Removed the 'checkOptionsObject' function.
* Added "Invalid" test to 'checkDeleteOptionsObject'

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api.js - runOptionError**
* Removed parameters:
	* urlArg
	* methodArg
	* bodyArg
* Added new parameter 'deleteArg'
* 'getDeleteOptions' is called instead of 'getRequestOptions'
* 'oComplete' is correctly set on successful result.

---

**./test-parts/part-c-internal_scripts/sub-scripts/common-request.js**
* Moved the following from 'validateOptionsReturn' to 'validateDeleteOptionsReturn'
	* 'json' property testing.
	* 'resultObj' base testing.
* 'validateOptionsReturn' is now an empty function.
* validateDeleteOptionsReturn
	* Changed "Content-Type" property to "content_type"

---

**./test-parts/part-h-api_requests/requests/req-devices_crud.js**
* handleDeleteFlagTest
	* Renamed 'flagObject' variable to 'flagOpts'
	* Removed 'flagUrl' from 'getDeleteOptions' call.
	* Replaced 'flagObject.headers' with 'flagOpts'
* handleDeleteObjectTest
	* Renamed 'deleteObject' variable to 'deleteOpts'
	* Removed 'deleteUrl' from 'getDeleteOptions' call.
	* Replaced 'deleteObject.headers' with 'deleteOpts'

---

**./test-parts/part-h-api_requests/requests/req-devices_crud_invalid.js**
* sendDeleteRequest
	* Removed 'deleteUrl' from 'getDeleteOptions' call.
	* Replaced 'delOpts.headers' with 'delOpts'

---

**./test-parts/part-h-api_requests/requests/req-devices_modify_invalid.js**
* handleTestDelete
	* Removed 'testObjectLink' from 'getDeleteOptions' call.
	* Replaced 'delOptions.headers' with 'delOptions'

---

**./test/fox-test-main.js**
* The 'debug' test mode now runs "Part C - Internal Scripts"
