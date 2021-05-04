# Changelog

### ./test-parts/part-e-rio_settings/settings/set-functions.js

**Globals**
* Removed 'prefixIndexObject' global.
* Renamed 'prefixIndexFile' global to 'prefixIndexObject'
* Removed spy variables:
	* gSpy
	* prefixSpy
	* indexSpy

\
**checkPrepare**
* Removed "Files Ready" test.
* Removed "Spy Objects Assigned" test.
* Changes to "Prefix Index Object Retrieved" test:
	* Removed 'prefixIndexObject' assignment.
	* Removed 'done' callback.

\
**checkGetSignalTypeFunction**
* Renamed variables:
	* 'aValid' to 'argValidString'
	* 'aInvalid' to 'argInvalidString'
	* 'aInvalidType' to 'argInvalidType'
* Function spies are handled locally instead of globally.
* Added 'done' callbacks to tests.
* Specific changes to "Call - Valid IO Type" test:
	* Removed 'commonFunctionsFile.testPresent' call.
	* Removed number type check for 'returnValue'
* Specific changes to tests from "Call - Invalid IO Type" onwards:
	* Removed 'commonFunctionsFile.testPresent' calls.
	* `%spyVariable%.calledOnce` must be true.
	* Removed number type check for 'returnValue'
	* Replaced 'lastCall' with 'firstCall'

\
**checkParsePrefixFunction**
* Updated 'prefixIndexObject' property references.
* Function spies are handled locally instead of globally for these tests:
	* "Call - Valid Prefix"
	* "Call - Invalid Prefix"
* Added 'done' callbacks to spy-based tests.
* Specific changes to "Call - Valid Prefix" test:
	* Removed 'commonFunctionsFile.testPresent' call for 'returnValue'
	* Removed string type check for 'returnValue'
	* Added 'commonFunctionsFile.testPresent' call for 'firstCall' object.
* Specific changes to "Call - Invalid Prefix" test:
	* Replaced 'lastCall' with 'firstCall'

\
**checkParseIndexFunction**
* Updated 'prefixIndexObject' property references.
* Function spies are handled locally instead of globally for these tests:
	* "Call - Valid Prefix"
	* "Call - Invalid Prefix"
* Added 'done' callbacks to spy-based tests.
* Specific changes to "Call - Valid Prefix" test:
	* Added 'commonFunctionsFile.testPresent' call for 'firstCall' object.
	* Removed 'commonFunctionsFile.testPresent' call for 'returnValue'
	* Removed number type check for 'returnValue'
* Specific changes to "Call - Invalid Prefix" test:
	* Replaced 'lastCall' with 'firstCall'

\
**parseIoPrefixInvalidCall, parseIoIndexInvalidCall**
* Removed 'parseReturn' variable from the respective functions.

\
**checkDispose**
* Removed function.

---

### ./test-parts/part-e-rio_settings/sub-settings/io-set-object.js

**Changes**
* Rewrote 'getIoSetObject' function
	* Easier readability
	* No 'try-catch' structure.
* Replaced `exports` with `module.exports = getIoSetObject();`
* Renamed result properties:
	* 'valid' to 'validInput'
	* 'invalid' to 'invalidInput'
	* 'code' to 'parsedCode'
	* 'index' to 'parsedIndex'
	* 'eType' to 'typeErrorText'
	* 'eNull' to 'nullErrorText'
