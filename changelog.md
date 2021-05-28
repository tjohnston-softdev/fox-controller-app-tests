# Changelog

**./app/common-errors.js**
* writeKeyNotFoundErrorString
	* Renamed 'kText' parameter to 'keyTxt'
* Changed public function names:
	* 'writeKeyNotFoundErrorString' as 'writeKeyNotFound'
	* 'writeRemoteIoPropertyErrorString' as 'writeRemoteIoPropertyGeneral'
	* 'writeUnexpectedTokenErrorString' as 'writeUnexpectedTokenGeneral'
	* 'writeUnexpectedTokenErrorStringNull' as 'writeUnexpectedTokenNull'
	* 'writeUnexpectedTokenErrorStringType' as 'writeUnexpectedTokenType'

---

**./test-parts/part-a-common_data/items/itm-common_errors.js**
* Updated function name references in 'testCommonErrors'

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api.js**
* Updated error string function names.

---

**test-parts/part-h-api_requests/requests/**
* Updated error string function names in these files:
	* req-devices_modify_invalid.js
	* req-devices_crud_invalid.js
