# Changelog

**./test-parts/part-c-internal_scripts/scripts/s-request_api.js**
* Moved functions to 's-request_api-urls.js'
	* checkHostUrlString
	* checkWriteUrl
* Moved functions to 's-request_api-response.js'
	* checkRequestResponseArray
	* checkRequestResponseObject
	* checkRequestResponseError
	* checkRequestResponseValidation
	* checkOnlineResult
	* checkRefuseError
* Moved functions to 's-request_api-other.js'
	* checkRandomIp
	* checkDeleteOptionsObject
* Removed requirements:
	* validator
	* commonPaths.commonErrors
	* commonPaths.requestApi
	* ../sub-scripts/common-request
	* ../sub-scripts/request-invalid
* Removed global variables:
	* readNullError
	* emptyReplyObject
	* validUrl
* Added 'handlePlaceholder' function. Copied from 's-local_valid.js'

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api-urls.js**
* New file - Unit testing for functions related to writing URLs

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api-responses.js**
* New file - Unit testing for functions related to API responses.

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api-other.js**
* New file - Unit testing for misc request functions.
	* Random IP address generation.
	* Create DELETE request options object.

---

**./test-parts/part-c-internal_scripts/scripts/internal-main.js**
* Commented out 'requestApiTests'
* Added requirements:
	* ./scripts/s-request_api-urls
	* ./scripts/s-request_api-responses
	* ./scripts/s-request_api-other
