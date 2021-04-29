# Changelog

**Test Status**
* I did not get the chance to test 'request-api.js' for the previous commit so there were some flagged errors when running the 'local' test mode.
* Refer to "Error Fixes" for the functions that caused the testing errors.
* The fixes were successful and all of the tests pass.

---

**./app/request-api.js - Restructured Functions**
* checkOptionUrlArgument
	* Rewrote IF conditions to use correct precedence.
	* Renamed 'urlValidationIndex' to 'validIndex'
* readOptionMethodArgument
	* 'readResult' is declared as null.
* getUrlValidationIndex
	* 'urlTemplate' is declared as a blank string and assigned during `try`
* Replaced `exports` with `module.exports`

---

**./app/request-api.js - Error Fixes**
* readApiResponseObject
	* Replaced 'rText' with 'responseObject.body'
* getRandomIpNumber
	* Replaced 'randomMultiply' with 'randomBase'
* readApiResponseString
	* 'bodyType' is now declared and assigned on the same line regardless of potential errors.
	* 'correctInput' only checks whether the object is defined and not null.
	* 'correctInput' is assigned inline and not with an IF condition.
	* Revised result IF structure to use variables correctly.

---

**./app/request-api.js - Public**
* Replaced `exports` with `module.exports`
