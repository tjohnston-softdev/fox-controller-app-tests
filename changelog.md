# Changelog

**./app/request-api.js**
* Removed  functions:
	* readOptionMethodArgument
	* checkOptionMethodArgument
	* checkOptionUrlArgument
	* readApiResponseString
* apiRequestRefusedError
	* Renamed 'eMsg' parameter to 'vDesc'
	* Renamed 'aMsg' variable to 'flagMsg'
* extractedText
	* Updated 'vObject' property references.

---

**./app/request-api.js - extractErrorText**
* 'res' is declared as a blank object at the start.
* Merged local variables into 'res'
	* extractedText
	* extractValid
	* errorFree
* Renamed 'res' properties:
	* 'eText' to 'extractedText'
	* 'eSuccess' to 'valid'
	* 'eSafe' to 'errorFree'
* 'res' properties are defined line-by-line.

---

**./app/request-api.js - extractErrorText**
* Removed the 'errorBodyText' variable. 
	* 'eObject.body' is used directly.
* Merged variable declarations and assignments:
	* errorBodyExtract
	* rText
* Removed IF block.

---

**./app/request-api.js - validateApiResponse**
* Removed the 'fullHTML' variable.
	* 'respObj.body' is used directly.

---

**./test-parts/part-c-internal_scripts/scripts/s-request_api.js**
* Removed the 'checkRequestResponseString' function.
