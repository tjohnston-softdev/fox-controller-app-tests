# Changelog

### ./test-parts/part-c-internal_scripts/scripts/s-local_valid.js

**Globals**
* Removed module requirements:
	* chai-things
	* sinon
	* ../sub-scripts/common-local_valid
* Removed 'exampleSpy' global.
* Removed all calls to 'localCommon'

\
**checkLocalValidationFileExists**
* Removed function.

\
**handleExampleFunction**
* Renamed variables:
	* 'nullLengthError' variable to 'nullError'
	* 'subjectSyntaxError' variable to 'syntaxError'
* Changes to "Function Exists" test
	* Removed 'done' callback.
	* Removed 'exampleSpy' assignment.
* Removed stray semicolon from "Call - Invalid Type" test.
* Removed "Complete" test.

\
**handleTimezoneOffsetFunction**
* Removed 'timeSpy' variable.
* Changes to "Function Exists" test
	* Removed 'done' callback.
	* Removed 'timeSpy' assignment.
* Changes to "Call - " tests
	* Added result variable.
	* Checked for desired outcome.
* Removed "Complete" test.

\
**handleDriveLetterFunction**
* Removed 'driveSpy' variable.
* Renamed variables:
	* 'driveValid' to 'driveValidString'
	* 'driveInvalid' to 'driveInvalidString'
* Declared new variables:
	* 'driveValidRes' - Result variable for "Call - Valid Format"
	* 'driveInvalidRes' - Result variable for "Call - Invalid Format"
* Removed "Complete" test.
* Removed 'done' callback from "Function Exists" test.

\
**handleDrivePathFunction**
* Removed 'dPathSpy' variable.
* Renamed variables:
	* 'dPathValid' to 'validPathString'
	* 'dPathInvalid' to 'invalidPathString'
* Declared new variables:
	* 'validPathRes' - Result variable for "Call - Valid Format"
	* 'invalidPathRes' - Result variable for "Call - Invalid Format"
* Removed "Complete" test.
* Removed 'done' callback from "Function Exists" test.

\
**handleFilenameFunction**
* Removed 'fnSpy' variable.
* Renamed variables:
	* 'fnValid' to 'validFileString'
	* 'fnInvalid' to 'invalidFileString'
* Declared new variables
	* 'validFileRes' - Result variable for "Call - Valid Format"
	* 'invalidFileRes' - Result variable for "Call - Invalid Format"
* Removed "Complete" test.
* Removed 'done' callback from "Function Exists" test.

\
**handleRioPrefixFunction**
* Removed 'pxSpy' variable.
* Renamed variables:
	* 'prefixValid' to 'validPrefixString'
	* 'prefixInvalid' to 'invalidPrefixString'
	* 'prefixNegative' to 'negativePrefixString'
* Declared result variables:
	* 'validPrefixRes' - Result variable for "Call - Valid Format"
	* 'invalidPrefixRes' - Result variable for "Call - Invalid Format"
	* 'negativePrefixRes' - Result variable for "Call - Negative Index"
* Removed "Complete" test.
* Removed 'done' callback from "Function Exists" test.

\
**handleRioTextFunction**
* Removed 'rioTextSpy' variable.
* Renamed variables:
	* 'textValid' to 'validString'
	* 'textInvalid' to 'invalidString'
	* 'textNegative' to 'negativeString'
* Declared result variables:
	* 'validRes' - Result variable for "Call - Valid Format"
	* 'invalidRes' - Result variable for "Call - Invalid Format"
	* 'negativeRes' - Result variable for "Call - Negative Number"
* Removed "Complete" test.
* Removed 'done' callback from "Function Exists" test.

\
**callExampleValid**
* Declared 'exampleRes' variable.
	* Consumes result of `localValidFile.validateExampleTest`
* Removed calls to 'localCommonFile'
* Removed 'exception' check.
* Added checks for 'exampleRes' depending on desired value.
* Renamed 'eResult' parameter to 'eTarget'

\
**callExampleInvalid**
* Removed call to 'localCommonFile'
* Renamed 'eError' parameter to 'eErrorText'

---

### ./test-parts/part-c-internal_scripts/sub-scripts/common-local_valid.js
* This file is now empty
	* The 'spy' functions are obsolete
	* 'validateExampleResult' was merged into parent.
