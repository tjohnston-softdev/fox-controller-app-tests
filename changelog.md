# Changelog

**./app/validator/**
* New folder - Contains local copies of 'validator' library functions.
	* isIP.js
	* isMACAddress.js
	* util/assert-string.js

---

**./app/paths/files/app-paths.js**
* Declared 'validatorFolder' variable.
* Added properties for:
	* ../../validator/isIP.js
	* ../../validator/isMACAddress.js

---

**./test-parts/part-b-external_modules/modules/pkg-validator.js**
* Removed 'validator' requirement.
* Added new requirements:
	* commonPaths.validatorIP
	* commonPaths.validatorMAC
* Rewrote 'verifyFunctionsExist' tests to use local files, which only export a function.
* Removed `validator.` from:
	* verifyIpAddressVerFour
	* verifyIpAddressVerSix
	* verifyMacAddressFunction
	* handleInvalidCall

---

**./test-parts/part-b-external_modules/external-main.js**
* Commented out calls:
	* operatingSystemTests
	* needleTests

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api-other.js**
* Removed 'validator' requirement.
* Added requirement: 'commonPaths.validatorIP'
* Removed `validator.` from 'checkRandomIp'

---

**./test-parts/part-h-api_requests/sub-requests/common-api.js**
* Removed 'validator' requirement.
* Added requirements:
	* commonPaths.validatorIP
	* commonPaths.validatorMAC
* Removed `validator.` from functions:
	* testArrayIpFourValue
	* testArrayIpSixValue
	* testArrayMacValue

---

**./test/fox-test-main.js**
* The 'debug' test mode now runs "Part B - External Modules"
