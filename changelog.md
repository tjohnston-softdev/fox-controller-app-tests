# Changelog

**./test-parts/part-h-api_requests/sub-requests/common-api.js - testArrayMacValue**
* Renamed variables:
	* 'elementObject' to 'currentObject'
	* 'elementMAC' to 'currentMac'
	* 'elementMacValid' to 'currentValid'
* For each iteration, 'currentValid' starts as false.
* MAC Address is now validated using 'validator' and not RegExp.

---

**./test-parts/part-h-api_requests/sub-requests/common-api.js - testArrayIpSixValue**
* Renamed variables:
	* 'elementObject' to 'currentObject'
	* 'elementIP' to 'currentIP'
	* 'elementIpValid' to 'currentValid'
* For each iteration, 'currentValid' starts as false.
* IPv6 Address is now validated using 'validator' and not RegExp.
	* Version 6 is specified.

---

**./test-parts/part-h-api_requests/sub-requests/common-api.js - testArrayIpFourValue**
* When calling `validatorModule.isIP`, version 4 is specified.

---

**./app/local-valid.js**
* Removed the following:
	* 'validateMacAddress' function.
	* 'validateIpAddressSixString' function.
	* 'macSyntax' global.
	* 'ipSixSyntax' global.

---

**./test-parts/part-b-external_modules/modules/pkg-validator.js**
* Split from 'verifyIpFunction' to new function  'verifyIpAddressVerFour'
	* "Call - Valid"
	* "Call - Empty"
	* "Call - Invalid Format"
	* 'ipSpy' variable.
* Split from 'verifyIpFunction' to new function  'verifyIpAddressInvalid'
	* "Call - Invalid Type"
	* "Call - Null"
* Wrote new functions:
	* 'verifyIpAddressVerFour' - Validates IPv4 addresses.
	* 'verifyIpAddressVerSix' - Validates IPv6 addresses.
	* 'verifyIpAddressInvalid' - Tests error calls to `validatorModule.isIP`
	* 'verifyMacAddressFunction' - Validates MAC addresses.
* When calling `validatorModule.isIP`, the version number is specified accordingly:
	* This does not apply to 'verifyIpAddressInvalid'

---

**./test-parts/part-c-internal_scripts/scripts/s-local_valid.js**
* Moved the following from 'handleIpSixFunction'
	* Destination:
		* File: ../../part-b-external_modules/modules/pkg-validator.js
		* Function: verifyIpAddressVerSix
	* Contents:
		* sixValid
		* sixLoop
		* sixInvalid
* Moved the following from 'handleMacAddressFunction'
	* Destination:
		* File: ../../part-b-external_modules/modules/pkg-validator.js
		* Function: verifyMacAddressFunction
	* Contents:
		* macValid
		* macInvalid
		* macSpy
* The following functions are now empty:
	* handleIpSixFunction
	* handleMacAddressFunction
