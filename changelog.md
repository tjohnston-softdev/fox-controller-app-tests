# Changelog

**./test-parts/05-rio_settings/settings/set-main.js**
* Removed:
	* 'checkExports' function.
	* 'commonPaths.testCommon' requirement.
* Outcome:
	* This file now only tests whether RIO Settings was successfully loaded.
	* 'Property Exist' testing is now handled by the other files.

---

**./test-parts/05-rio_settings/settings/set-functions.js**
* Added "Exists" test to functions:
	* checkGetSignalTypeFunction
	* checkParsePrefixFunction
	* checkParseIndexFunction
* Renamed error parameter from 'e' to 'catchErr' in functions:
	* parseIoPrefixInvalidCall
	* parseIoIndexInvalidCall