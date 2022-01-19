# Changelog

**./test-parts/02-external_modules/modules/pkg-needle.js**
* Functions are now validated using 'commonFunctions.testFunction'
* Declared 'delFunc' variable for the "Function Exists" test in 'verifyDeleteRequest'
	* This is to avoid keyword confusion.
	* 'delete' is a highlighted keyword in Notepad++
	* The "Request Successful" test is unchanged despite the same problem.
* Changes to 'checkRequestReturn'
	* Removed calls to 'validateCommonProperty'
	* 'replyObject.statusCode' is validated using 'commonFunctions.testNumber'
	* 'replyObject.bytes' is validated using 'commonFunctions.testNumber'
	* 'replyObject.req' is validated using 'commonFunctions.testObject'
	* 'replyObject.body' is validated using an `exist` check.
	* Removed 'objectFunctions.testPropExists' call.
* Removed 'validateCommonProperty' call from 'checkModifyOutcome'
* Removed the 'validateCommonProperty' function.

---

**./test-parts/02-external_modules/modules/pkg-os.js**
* The 'platform' function is now validated using 'commonFunctions.testFunction'
* Removed 'commonPaths.testObject' requirement.

---

**./test-parts/02-external_modules/modules/pkg-validator.js**
* Removed some whitespace.