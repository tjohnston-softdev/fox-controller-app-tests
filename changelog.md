# Changelog

### ./test-parts/part-h-api_requests/requests/req-devices_crud_invalid.js

**New Functions**
* sendCreateRequest
	* Sends POST request to 'insert' endpoint.
	* Calls 'readInvalidResults' to validate request outcome.
* sendReadRequest
	* Sends GET request to 'individual device' endpoint.
	* Retrieves existing device.
	* Calls 'readInvalidResults' to validate request outcome.
* sendStatusRequest
	* Sends GET request to 'device status' endpoint.
	* Retrieves existing device status.
* sendDeleteRequest
	* Sends DELETE request to 'individual device' endpoint.
	* Deletes existing device.

\
**Merged Functions**
* 'readInvalidStatus' into 'sendStatusRequest'
* 'readInvalidDelete' into 'sendDeleteRequest'

\
**handleCreateInvalid**
* Removed `console.log` for the "Null" test.
* Renamed 'invalidEntry' variables to 'postBody'
* Declared 'postErrMsg' variable for these tests:
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
* Merged HTTP request code into 'sendCreateRequest'

\
**handleReadInvalid**
* Merged HTTP request code into 'sendReadRequest'
* Affected tests:
	* "Unknown ID"
	* "Invalid ID"
	* "Blank ID"

\
**handleStatusInvalid**
* Merged HTTP request code into 'sendStatusRequest'
* Affected tests:
	* "Unknown ID"
	* "Invalid ID"
	* "Blank ID"

\
**handleDeleteInvalid**
* Merged HTTP request code into 'sendStatusRequest'
* Removed '_____Opts' variables.
* Affected tests:
	* "Unknown ID"
	* "Invalid ID"
	* "Blank ID"
