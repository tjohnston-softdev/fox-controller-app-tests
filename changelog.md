# Changelog

All of these changes refer to **./part-b-external_modules/modules/pkg-validator.js**

---

**Globals**
* Removed module requirements:
	* chai-things
	* sinon
* Renamed 'validatorModule' global to 'validator'

---

**Removed Functions**
* verifyValidatorExists
* verifyIpFunction
	* Merged into 'verifyFunctionsExist'

---

**verifyFunctionsExist**
* New function - Checks whether the 'validator' functions exist.

---

**verifyMacAddressFunction**
* Renamed description to "MAC Address"
* Moved the "Function Exists" test into 'verifyFunctionsExist'
* Removed "Call - " from test names.
* Defined "Empty" test - Uses empty string.

---

**verifyIpAddressVerFour**
* Removed 'ipSpy' variable.
* Declared call result variables:
	* validResult
	* emptyResult
	* invalidResult
* Removed tests:
	* "Spy Established"
	* "Complete"
* Renamed tests:
	* "Call - Valid" to "Valid Format"
	* "Call - Empty" to "Empty"
	* "Call - Invalid Format" to "Invalid Format"
* "Valid Format" test changes:
	* 'validResult' consumes function return.
	* Removed 'commonFunctionsFile.testPresent' call.
	* Uses 'validResult' for `true` expectation.
* "Empty" test changes:
	* 'emptyResult' consumes function return.
	* Removed 'commonFunctionsFile.testPresent' call.
	* Uses 'emptyResult' for `false` expectation.
* "Invalid Format" test changes:
	* 'invalidResult' consumes function return.
	* Removed 'commonFunctionsFile.testPresent' call.
	* Uses 'invalidResult' for `false` expectation.

---

**verifyIpAddressVerSix**
* Removed 'ipSpy' variable.
* Renamed variables:
	* 'sixValid' to 'validString'
	* 'sixLoop' to 'loopbackString'
	* 'sixInvalid' to 'invalidString'
* Declared call result variables:
	* validResult
	* loopbackResult
	* emptyResult
	* invalidResult
* Removed tests:
	* "Spy Established"
	* "Complete"
* Renamed tests:
	* "Call - Valid" to "Valid Format"
	* "Call - Loopback" to "Loopback"
	* "Call - Invalid" to "Invalid Format"
* "Valid Format" test changes:
	* 'validResult' consumes function return.
	* Removed 'commonFunctionsFile.testPresent' call.
	* Uses 'validResult' for `true` expectation.
* "Loopback" test changes:
	* 'loopbackResult' consumes function return.
	* Removed 'commonFunctionsFile.testPresent' call.
	* Uses 'loopbackResult' for `true` expectation.
* "Invalid Format" test changes:
	* 'invalidResult' consumes function return.
	* Removed 'commonFunctionsFile.testPresent' call.
	* Uses 'invalidResult' for `false` expectation.
* Defined "Empty" test:
	* Uses empty string.
	* 'emptyResult' consumes function return.

---

**verifyIpAddressInvalid**
* Removed "Call - " from test names.
* Renamed result variables:
	* 'iRes' to 'invalidTypeRes'
	* 'nRes' to 'nullRes'

---

**ipInvalidCall**
* Removed 'funcRes' variable.
* `validator.isIP` result is not consumed.
