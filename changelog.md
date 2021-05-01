# Changelog

**./app/test-common.js - Removed Functions**
* checkEcho
* stringToNumber

---

**./app/test-common.js - Single Parameter Functions**
* Renamed parameters for these functions:
	* 'checkPresent' to 'preVal'
	* 'checkBinary' to 'numVal'
	* 'checkArrayEmpty' to 'arrDef'
	* 'checkString' to 'strDef'

---

**./app/test-common.js - Modifications**
* checkArrayPopulated
	* Renamed parameter to 'arrDef'
	* Split type and length checks.
* checkArrayDynamic
	* Renamed 'aDef' parameter to 'arrDef'
	* Renamed 'sFlag' parameter to 'lengthFlag'
* checkAllElements
	* Renamed 'aDef' parameter to 'arrDef'
	* Converted `while` to `for` loop, removing `!== null` condition.
* checkObjectAllPropertiesType
	* Declared 'currentVal' variable.
	* Testing is performed on 'currentVal' and not the object itself.
	* Changed "to.be.a" to "an"
* checkObjectMatchKV
	* 'currentVal' is assigned at the start of the loop iteration.
	* Testing is performed on 'currentVal' and not the object itself.
* checkObjectMatchKVInsensitive
	* Variables are assigned at the start of the loop iteration.
* checkBothObjectsHaveSamePropertyValue
	* Declared variables 'srcVal' and 'tgtVal'.
	* Used for equality test.
* checkInvalidFunctionResult
	* Declared variable 'successElement' - Whether the function was successful.
	* Declared variable 'messageElement' - The flagged error message.
	* Added checks to 'rArray' - Must be an array with at least 2 elements.
	* Individual element testing is performed on local variables and not the array itself.
	* Removed redundant checks from 'successElement' - Only checks for false.
	* Removed redundant checks from 'messageElement' - Only checks if the messages match.
* getJsonObjectValues
	* Declared 'retValue' variable. - Reads current object property.
* checkPropertyStringRequiredArray
	* Converted `while` to `for` loop, removing `!== null` condition.

---


**./app/test-common.js - Public**
* Replaced `exports` with `module.exports`

---

**./test-parts/part-h-api_requests/sub-requests/common-storage.js**
* Replaced calls to 'convertStringToNumber' with 'parseFloat'
	* The numbers are parsed directly and not via external function.
