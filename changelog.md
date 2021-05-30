# Changelog

**./test-parts/part-c-internal_scripts/sub-scripts/request-invalid.js**
* New file - Contains invalid function calls for the Request API functions.
* Split from '../scripts/s-request_api.js'

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api.js**
* Added requirement for: '../sub-scripts/request-invalid'
* Moved the following functions to 'requestInvalid'
	* runRequestUrlInvalid
	* runReadResponseInvalidArray
	* runReadResponseInvalidObject
	* runReadResponseInvalidString
	* runReadResponseInvalidError
	* runValidateResponseInvalid
	* runRefuseError
	* runOptionError
