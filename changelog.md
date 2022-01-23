# Changelog

**./tests/fox-test-main.js**
* 'debug' mode now tests internal scripts.

---

**./app/local-valid.js**
* Wrote new sub-functions:
	* testSyntax
	* throwEmptyError
	* throwTypeError
* Changes to 'checkRegEx'
	* Declared 'correctType' variable.
	* 'correctType' checks if 'subjectString' is a string.
	* Re-wrote IF structure to account for different scenarios.
	* Declared 'stringDesc' parameter.
	* 'testSyntax' is called on a valid, non-empty string.
	* 'throwEmptyError' is called on an invalid empty string.
	* 'throwTypeError' is called on non-string values.
* Added a description argument to existing 'checkRegEx' calls.
* Changes to 'validateRioTextString'
	* Declared 'correctType' variable.
	* 'correctType' checks if 'txtString' is a string.
	* Removed the 'validCheck' variable.
	* 'txtLower' and'wordArray' are declared as blank and are assigned during validation.
	* Re-wrote IF structure to account for different scenarios.
	* 'res' is assigned using 'checkRioSplitArray' instead of 'validCheck'
	* 'throwEmptyError' is called on an invalid empty string.
	* 'throwTypeError' is called on non-string values.
* 'checkRioSplitArray' throws an error if validation fails.

---

**./test-parts/03-internal_scripts/main.js**
* Commented out all calls except for 'localGeneralTests' and 'localSpecificTests'

---

**./test-parts/03-internal_scripts/scripts/s-local_valid_general.js**
* Changes to 'callExampleValid'
	* Removed 'eTarget' parameter.
	* Removed IF structure related to 'eTarget'
	* 'exampleRes' is expected to be True.
* Removed target arguments from existing 'callExampleValid' calls.
* "Valid String" and "Valid Empty" tests are left as-is.
* Re-wrote the following tests to use 'callExampleInvalid'
	* "Invalid String"
	* "Invalid Empty"
* Changes to "Null" test:
	* Added "Input must be a valid string." argument.
	* Removed `callExampleInvalid(null, null, null, nullError);` call.
	* Removed `callExampleInvalid(exampleValid, null, false, "Cannot read property 'test' of null");` call.
* Removed 'nullError' variable.
* Replaced 'exampleInvalid' reference in "Invalid Empty" test with...an empty string?
* Re-wrote 'syntaxError' to refer to 'regObj' instead of 'subjectSyntax'
* Renamed 'e' variable in 'callExampleInvalid' to 'errorObject'

---

**./test-parts/03-internal_scripts/scripts/s-local_valid_specific.js**
* Wrote new function 'callInvalid'
	* Calls a given 'localValidFile' function in a try-catch environment.
	* Unlike most, the function is entered as an argument.
	* All of these functions have the same parameter structure.
* Changes to 'handleTimezoneOffsetFunction', 'handleRioPrefixFunction', and 'handleRioTextFunction'
	* Declared 'invalidErrTxt' variable.
	* Re-wrote the "Invalid" tests to use 'callInvalid'
* Re-wrote the "Invalid Format" test to use 'callInvalid' in functions:
	* handleDriveLetterFunction
	* handleDrivePathFunction
	* handleFilenameFunction