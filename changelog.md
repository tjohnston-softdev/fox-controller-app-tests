# Changelog

### ./test-parts/part-h-api_requests/api-main.js

**Changes**
* Uncommented 'cDevicesFileCrudInvalid'

---

### ./test-parts/part-h-api_requests/requests/req-devices_crud_invalid.js

**Globals**
* Removed 'sinon' module requirement.
* Replaced 'request' module with 'needle'
	* handleCreateInvalid
	* handleReadInvalid
	* handleStatusInvalid
	* handleDeleteInvalid
* Removed 'crudNullID'

\
**handleCreateInvalid**
* Modified 'needle.post' calls to use the correct arguments.
* Removed variables:
	* 'nullOptions' from "Object" - "Null"
	* 'typeErrorOptions' from "Object" - "Invalid Object Type"

\
**handleCreateInvalid - Request Options**
* Changes:
	* Removed '____Options' variable.
	* Declared 'invalidEntry' variable for request body.
* Affected:
	* "Invalid Device Type"
		* "Invalid Value"
		* "Invalid Type"
		* "Missing Property"
	* "Invalid Manufacturer"
		* "Unknown Manufacturer"
		* "Invalid Value Type"
		* "Missing Property"
	* "Invalid Model"
		* "Unknown Model"
		* "Invalid Value Type"
		* "Missing Property"
	* "Invalid IP Address"
		* "Invalid IP Format"
		* "Invalid String Value"
		* "Invalid Value Type"
		* "Missing Property"

\
**handleReadInvalid**
* Renamed variables:
	* 'getUnknownDeviceErrorString' to 'unknownErrStr'
	* 'getInvalidIdErrorString' to 'invalidErrStr'
	* 'getNullIdErrorString' to 'nullErrStr'

\
**handleDeleteInvalid**
* Modified 'needle.delete' calls to use the correct arguments.
* Renamed variables:
	* 'unknownDeleteOptions' to 'unknownOpts'
	* 'invalidDeleteOptions' to 'invalidOpts'
	* 'blankDeleteOptions' to 'blankOpts'
* Renamed callback parameters:
	* 'dUnknownError' to 'unknownErr'
	* 'dUnknownResult' to 'unknownRes'
	* 'dInvalidError' to 'invalidErr'
	* 'dInvalidResult' to 'invalidRes'
	* 'dBlankError' to 'blankErr'
	* 'dBlankResult' to 'blankRes'

\
**readInvalidResults**
* Renamed parameters:
	* 'iCallbackError' to 'callbackErr'
	* 'iCallbackObject' to 'callbackObject'
* Added object type check for 'callbackObject'

\
**readInvalidStatus**
* Renamed parameters:
	* 'sCallbackError' to 'callbackErr'
	* 'sCallbackObject' to 'callbackObject'
* Added object type check for 'callbackObject'

\
**readInvalidDelete**
* Renamed parameters:
	* 'dCallbackError' to 'callbackErr'
	* 'dCallbackObject' to 'callbackObject'
* Added object type check for 'callbackObject'

\
**Public**
* Replaced `exports` with `module.exports`
